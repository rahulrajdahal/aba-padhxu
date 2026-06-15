import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import PageLayout from "./PageLayout";

const meta = {
  title: "Components/PageLayout",
  component: PageLayout,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageLayout>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Page Title",
    children: <main className="p-6">Page Content</main>,
  },
};
