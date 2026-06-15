import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import DeleteModal from "./DeleteModal";

const meta = {
  title: "Components/DeleteModal",
  component: DeleteModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DeleteModal>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: "Are you sure you want to delete this item?",
    handleDelete: () => alert("Deleted"),
  },
};
