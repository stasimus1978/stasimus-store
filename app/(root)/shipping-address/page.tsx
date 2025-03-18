import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import ShippingAddressForm from "./shipping-address-form";
import { auth } from "@/auth";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { ShippingAddress } from "@/types";

export const metadata: Metadata = {
  title: "Shipping Address"
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/cart");

  const headerList = await headers();
  const callbackUrl = headerList.get("next-url");

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect(`/sign-in?callbackUrl=${callbackUrl}`);

  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={user.address as ShippingAddress} />
    </>
  );
};

export default ShippingAddressPage;
