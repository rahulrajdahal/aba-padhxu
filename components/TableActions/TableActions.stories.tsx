import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import TableActions from "./TableActions";

const meta = {
  title: "Components/TableActions",
  component: TableActions,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TableActions>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "1",
    handleDelete: async () => {},
  },
};
