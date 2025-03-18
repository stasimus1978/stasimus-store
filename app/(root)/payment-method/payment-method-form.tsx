"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { ArrowRight, Loader } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateUserPaymentMethod } from "@/lib/actions/user.actions";
import { PAYMENT_METHODS } from "@/lib/constants";
import { paymentMethodSchema } from "@/lib/validator";
import { PaymentMethod } from "@/types";

type Props = {
  paymentMethodType: string | null;
};

const PaymentMethodForm = ({ paymentMethodType }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<PaymentMethod>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: paymentMethodType || ""
    }
  });
  const [isPending, startTransition] = useTransition();

  const OnSubmit = async (data: PaymentMethod) => {
    try {
      startTransition(async () => {
        const res = await updateUserPaymentMethod(data);
        if (!res.success) {
          toast.error(`${res.message}`);
          return;
        }
        router.push("/place-order");
      });
    } catch (error) {
      if (isRedirectError(error)) {
        router.refresh();
      }
    }
  };
  return (
    <>
      <div className="mx-auto max-w-md space-y-4">
        <h1 className="h2-bold mt-4">Payment Method</h1>
        <p className="text-muted-foreground text-sm">Please select a Payment method</p>
        <form onSubmit={handleSubmit(OnSubmit)} className="space-y-4">
          <div>
            <RadioGroup
              className="flex flex-col space-y-2"
              onValueChange={value => {
                setValue("type", value);
                clearErrors("type");
              }}
              defaultValue={paymentMethodType || ""}
            >
              {PAYMENT_METHODS.map(paymentMethod => (
                <div key={paymentMethod} className="flex items-center space-x-2">
                  <RadioGroupItem value={paymentMethod} {...register("type")} />
                  <Label className="font-normal">{paymentMethod}</Label>
                </div>
              ))}
            </RadioGroup>
            {errors.type && <p className="mt-1 text-red-500">{errors.type.message}</p>}
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}{" "}
              Continue
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentMethodForm;
