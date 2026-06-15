import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import TextField from "./TextField";

const meta = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Input",
    type: "text",
  },
};
