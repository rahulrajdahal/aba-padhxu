import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Input from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Input",
    inputProps: { placeholder: "Input", type: "text" },
  },
};
