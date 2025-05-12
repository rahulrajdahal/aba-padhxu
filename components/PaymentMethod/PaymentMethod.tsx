"use client";

import StripeElements from "@/app/order/StripeElements";
import { ChangeEvent } from "react";
import Input from "../Input/Input";

type PaymentMethodProps = {
  paymentMethod: string;
  setPaymentMethod: (paymentMethod: string) => void;
  paid: boolean;
};

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
  paid,
}: PaymentMethodProps) {
  const handlePaymentMethodOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  return (
    !paid && (
      <>
        <strong>Payment Method</strong>
        <span className="flex items-center gap-4">
          <Input
            label="Cash"
            className="!flex-row items-center gap-2"
            inputProps={{
              onChange: handlePaymentMethodOnChange,
              type: "radio",
              name: "paymentMethod",
              value: "CASH",
              defaultChecked: paid,
            }}
          />

          <Input
            label="Online"
            className="!flex-row items-center gap-2"
            inputProps={{
              onChange: handlePaymentMethodOnChange,
              type: "radio",
              name: "paymentMethod",
              value: "ONLINE",
              defaultChecked: !paid,
            }}
          />
        </span>

        {paymentMethod === "ONLINE" && !paid && <StripeElements />}
      </>
    )
  );
}
