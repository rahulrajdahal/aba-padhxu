import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import AvatarUpload from "./AvatarUpload";

const meta = {
  title: "Dashbaord/AvatarUpload",
  component: AvatarUpload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AvatarUpload>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialAvatarUrl: "",
    onAvatarChange: () => {},
  },
};
