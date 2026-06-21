import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Logo from "./Logo";

const meta = {
  title: "Components/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
