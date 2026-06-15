import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import InputError from "./InputError";

const meta = {
  title: "Components/Input/InputError",
  component: InputError,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputError>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Error Message",
  },
};
