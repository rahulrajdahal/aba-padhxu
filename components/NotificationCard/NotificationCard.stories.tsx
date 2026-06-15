import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import NotificationCard from "./NotificationCard";

const meta = {
  title: "Components/NotificationCard",
  component: NotificationCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NotificationCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    notification: {
      id: "1",
      title: "Notification Title",
      description: "Notification Description",
      createdAt: new Date(),
      updatedAt: new Date(),
      isRead: false,
    },
  },
};
