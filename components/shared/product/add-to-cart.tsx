"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";

type Props = { item: CartItem };

const AddToCart = ({ item }: Props) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const addCart = await addItemToCart(item);

    if (addCart.success) {
      toast(`🛒 ${item.name} added to the cart`, {
        action: {
          label: "Go to Cart",
          onClick: () => router.push("/cart")
        }
      });
    }
  };

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      Add To Cart
    </Button>
  );
};

export default AddToCart;
