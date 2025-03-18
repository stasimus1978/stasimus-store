import { cn } from "@/lib/utils";

const checkoutSteps = ["User Login", "Shipping Address", "Payment Method", "Place Order"];

type Props = {
  current: number;
};

const CheckoutSteps = ({ current = 0 }: Props) => {
  return (
    <div className="mx-auto mt-4 mb-10 flex w-[70%] flex-col items-center justify-center text-center md:flex-row">
      {checkoutSteps.map((step, index) => (
        <div key={step} className="mb-2 flex w-full items-center">
          <div
            className={cn(
              "w-56 rounded-full bg-gray-200 p-2 text-center text-sm",
              index === current && "bg-gray-600 text-white"
            )}
          >
            {step}
          </div>
          {index < checkoutSteps.length - 1 && (
            <div className="hidden w-full flex-1 justify-center md:flex">
              <hr className="w-full border-t-2 border-gray-300" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
