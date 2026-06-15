import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import PaymentMethod from "./PaymentMethod";

const meta = {
  title: "Components/PaymentMethod",
  component: PaymentMethod,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PaymentMethod>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    paymentMethod: "COD",
    setPaymentMethod: () => {},
    paid: false,
  },
};
