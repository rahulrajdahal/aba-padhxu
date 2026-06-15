import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import NotificationsDropdown from "./NotificationsDropdown";

const meta = {
  title: "Components/NotificationsDropdown",
  component: NotificationsDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NotificationsDropdown>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    notifications: [
      {
        id: "1",
        title: "Notification Title",
        description: "Notification Description",
        createdAt: new Date(),
        updatedAt: new Date(),
        isRead: false,
      },
    ],
  },
};
