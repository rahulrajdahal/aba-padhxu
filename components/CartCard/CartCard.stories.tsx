import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CartCard from "./CartCard";

const meta = {
  title: "Components/CartCard",
  component: CartCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CartCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    book: {
      id: "1",
      title: "Book Title",
      author: "Author Name",
      genre: "Genre",
      year: 2022,
      price: 10,
      image: "https://i.pravatar.cc/48",
      description: "Description",
    },
    qty: 1,
  },
};
