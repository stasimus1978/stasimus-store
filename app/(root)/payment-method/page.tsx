import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import PaymentMethodForm from "./payment-method-form";
import { auth } from "@/auth";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { getUserById } from "@/lib/actions/user.actions";

export const metadata: Metadata = {
  title: "Payment Method"
};

const PaymentMethodPage = async () => {
  const headersList = await headers();
  const callbackUrl = headersList.get("next-url");

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect(`/sign-in?callbackUrl=${callbackUrl}`);
  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={2} />
      <PaymentMethodForm paymentMethodType={user.paymentMethod} />
    </>
  );
};

export default PaymentMethodPage;
