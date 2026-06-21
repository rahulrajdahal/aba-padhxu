import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import InputHelperText from "./InputHelperText";

const meta = {
  title: "Components/Input/InputHelperText",
  component: InputHelperText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputHelperText>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Helper Text Message",
  },
};
