import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import AdminPageLayout from "./AdminPageLayout";

const meta = {
  title: "Components/AdminPageLayout",
  component: AdminPageLayout,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AdminPageLayout>;
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
    children: (
      <main className="grid gap-6">
        <h2 className="text-2xl font-semibold">Welcome to Admin Panel</h2>
      </main>
    ),
  },
};
