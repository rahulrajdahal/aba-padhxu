import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import DashboardSidebar from "./DashboardSidebar";

const meta = {
  title: "Components/DashboardSidebar",
  component: DashboardSidebar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DashboardSidebar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
