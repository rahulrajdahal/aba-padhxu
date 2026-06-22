import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import DashboardCard from "./DashboardCard";

const meta = {
  title: "Components/DashboardCard",
  component: DashboardCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DashboardCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stat: 10,
    title: "Users",
    icon: "U",
  },
};
