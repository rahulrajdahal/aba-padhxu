import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import AvatarWithName from "./AvatarWithName";

const meta = {
  title: "Components/AvatarWithName",
  component: AvatarWithName,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AvatarWithName>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: "Aba Padhxu", avatar: "https://i.pravatar.cc/48" },
};
