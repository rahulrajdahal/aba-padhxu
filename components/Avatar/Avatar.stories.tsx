import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Avatar from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { alt: "Avatar with placeholder", src: "https://i.pravatar.cc/48" },
};
