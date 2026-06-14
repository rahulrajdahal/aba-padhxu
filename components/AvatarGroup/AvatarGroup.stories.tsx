import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import AvatarGroup from "./AvatarGroup";

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AvatarGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatars: [
      "https://i.pravatar.cc/48",
      "https://i.pravatar.cc/49",
      "https://i.pravatar.cc/50",
      "https://i.pravatar.cc/51",
    ],
  },
};
