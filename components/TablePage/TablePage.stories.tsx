import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import TablePage from "./TablePage";

const meta = {
  title: "Components/TablePage",
  component: TablePage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TablePage>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Table Title",
    data: [{ name: "Aba Padhxu", avatar: "https://i.pravatar.cc/48" }],
    columns: [
      {
        accessorKey: "name",
        header: "Name",
      },
    ],
  },
};
