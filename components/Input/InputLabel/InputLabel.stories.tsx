import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import InputLabel from "./InputLabel";

const meta = {
  title: "Components/InputLabel",
  component: InputLabel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputLabel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Input Label",
  },
};
