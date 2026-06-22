import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import AdminNavbar from "./DashboardNavbar";

const meta = {
  title: "Components/AdminNavbar",
  component: AdminNavbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AdminNavbar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: {
      name: "Super Admin",
      avatar: "https://i.pravatar.cc/48",
      email: "user@example.com",
    },
    notifications: [],
  },
};
