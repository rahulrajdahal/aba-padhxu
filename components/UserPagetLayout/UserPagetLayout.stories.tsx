import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import UserPageLayout from "./UserPageLayout";

const meta = {
  title: "Components/UserPageLayout",
  component: UserPageLayout,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UserPageLayout>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navbarProps: {
      count: 1,
      role: "USER",
      isLoggedIn: true,
    },
    children: <main className="p-6">Page Content</main>,
  },
};
