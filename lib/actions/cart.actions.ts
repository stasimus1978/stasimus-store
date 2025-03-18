"use server";

import { cookies } from "next/headers";

import { convertToPlainObject, formatError } from "../utils";
import { cartItemSchema } from "../validator";

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

    const item = cartItemSchema.parse(data);

    const product = await prisma.product.findUnique({
      where: { id: item.productId }
    });

    console.log({
      "Session Cart ID >>> ": sessionCartId,
      "User ID >>> ": userId,
      "Item >>> ": item,
      "Product>>> ": product
    });

    return {
      success: true,
      message: "Item added to the cart"
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
