"use client";

import { Loader, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { formatCurrency } from "@/lib/utils";
import { Cart, CartItem } from "@/types";

type Props = {
  cart?: Cart;
};

const CartTable = ({ cart }: Props) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async (item: CartItem) => {
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

  const handleRemoveFromCart = async (productId: string) => {
    startTransition(async () => {
      const removeCart = await removeItemFromCart(productId);

      if (removeCart.success) {
        toast.success(`🛒 ${removeCart.message}`);
        return;
      }
    });
  };

  return (
    <>
      <h1 className="h2-bold py-4">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div className="">
          Cart is empty!
          <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {cart.items.map(item => (
                  <TableRow key={item.slug}>
                    <TableCell className="flex items-center">
                      <Link href={`/product/${item.slug}`} className="flex items-center">
                        <Image src={item.image} alt={item.name} width={50} height={50} />
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </TableCell>

                    <TableCell className="gap-2 text-center">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isPending}
                        onClick={() => handleRemoveFromCart(item.productId)}
                      >
                        {isPending ? (
                          <Loader className="size-4 animate-spin" />
                        ) : (
                          <Minus className="size-4" />
                        )}
                      </Button>

                      <span className="items-center px-2">{item.qty}</span>

                      <Button
                        type="button"
                        variant="outline"
                        disabled={isPending}
                        onClick={() => handleAddToCart(item)}
                      >
                        {isPending ? (
                          <Loader className="size-4 animate-spin" />
                        ) : (
                          <Plus className="size-4" />
                        )}
                      </Button>
                    </TableCell>

                    <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Card>
            <CardContent className="gap-4 p-4">
              <div className="pb-3 text-xl">
                Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}):
                <span className="font-bold"> {formatCurrency(cart.itemsPrice)}</span>
              </div>

              <Button
                className="w-full"
                type="button"
                disabled={isPending}
                onClick={() => startTransition(() => router.push("/shipping-address"))}
              >
                {isPending ? (
                  <Loader className="size-4 animate-spin" />
                ) : (
                  <Plus className="size-4" />
                )}
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CartTable;
