"use client";

import { Loader, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";

type Props = {
  cart?: Cart;
  item: CartItem;
};

const AddToCart = ({ cart, item }: Props) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const addCart = await addItemToCart(item);

      if (addCart.success) {
        toast.success(`🛒 ${addCart.message}`, {
          action: {
            label: "Go to Cart",
            onClick: () => router.push("/cart")
          }
        });
      }
    });
  };

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const removeCart = await removeItemFromCart(item.productId);

      if (removeCart.success) {
        toast.success(`🛒 ${removeCart.message}`);
      }
    });
  };

  const existItem = cart && cart.items.find(x => x.productId === item.productId);

  return existItem ? (
    <div className="">
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        {isPending ? <Loader className="size-4 animate-spin" /> : <Minus className="size-4" />}
      </Button>

      <span className="items-center px-2">{existItem.qty}</span>

      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {isPending ? <Loader className="size-4 animate-spin" /> : <Plus className="size-4" />}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? <Loader className="size-4 animate-spin" /> : <Plus className="size-4" />} Add To
      Cart
    </Button>
  );
};

export default AddToCart;
