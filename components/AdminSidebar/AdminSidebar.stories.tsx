import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import AdminSidebar from "./AdminSidebar";

const meta = {
  title: "Components/AdminSidebar",
  component: AdminSidebar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AdminSidebar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
