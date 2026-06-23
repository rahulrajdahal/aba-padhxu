import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SettingsSidebar from "./SettingsSidebar";

const meta = {
  title: "Dashbaord/SettingsSidebar",
  component: SettingsSidebar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SettingsSidebar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
