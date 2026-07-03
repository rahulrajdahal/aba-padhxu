import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import PriceBadge from "./PriceBadge";

const meta = {
  title: "Components/Card/PriceBadge",
  component: PriceBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PriceBadge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: 10,
  },
};
