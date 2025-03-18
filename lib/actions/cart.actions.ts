"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { convertToPlainObject, formatError, round2 } from "../utils";
import { cartItemSchema, insertCartSchema } from "../validator";

import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { CartItem } from "@/types";

export async function addItemToCart(data: CartItem) {
  try {
    // check cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");

    // get session and userID
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // get existing cart from the database
    const cart = await getMyCart();

    // parse and validate the item
    const item = cartItemSchema.parse(data);

    // find product in the database
    const product = await prisma.product.findUnique({
      where: { id: item.productId }
    });
    if (!product) throw new Error("Product not found");

    if (!cart) {
      // create a new cart object
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calculatePrice([item])
      });

      // insert the cart into the database
      await prisma.cart.create({
        data: {
          ...newCart,
          ...(userId ? { userId } : {})
        }
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} added to the cart`
      };
    } else {
      // check if the item already exists in the cart
      const existItem = cart.items.find(x => x.productId === item.productId);

      if (existItem) {
        // check if the item is in stock
        if (product.stock < existItem.qty + 1) {
          throw new Error("Not enough stock");
        }
        // increase qty
        cart.items.find(x => x.productId === item.productId)!.qty = existItem.qty + 1;
      } else {
        // check stock
        if (product.stock < 1) throw new Error("Not enough stock");

        cart.items.push(item);
      }

      // update cart to data
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items,
          ...calculatePrice(cart.items)
        }
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} ${existItem ? "updated in" : "add to"} cart`
      };
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error)
    };
  }
}

export async function removeItemFromCart(productId: string) {
  try {
    // check cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found.");

    // find product in the database
    const product = await prisma.product.findFirst({
      where: { id: productId }
    });
    if (!product) throw new Error("Product not found");

    // get the existing cart from database
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    //check for item exist in the cart
    const exist = cart.items.find(x => x.productId === productId);
    if (!exist) throw new Error("Item not found");

    if (exist.qty === 1) {
      // remove item from cart
      cart.items = cart.items.filter(x => x.productId !== exist.productId);
    } else {
      // decrease qty
      cart.items.find(x => x.productId === productId)!.qty = exist.qty - 1;
    }

    // update cart to database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items,
        ...calculatePrice(cart.items)
      }
    });
    // revalidate product page
    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} removed from cart`
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error)
    };
  }
}

export async function getMyCart() {
  // check cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Cart session not found");

  // get session and userID
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  // get existing cart from the database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId }
  });

  if (!cart) return undefined;

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString()
  });
}

const calculatePrice = (items: CartItem[]) => {
  const itemsPrice = round2(items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 0.01),
    taxPrice = round2(itemsPrice * 0.1),
    totalPrice = round2(itemsPrice + taxPrice + shippingPrice);
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2)
  };
};
