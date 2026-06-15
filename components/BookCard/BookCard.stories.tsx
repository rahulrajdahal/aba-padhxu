import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BookCard from "./BookCard";

const meta = {
  title: "Components/BookCard",
  component: BookCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BookCard>;
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
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98c2941?w=800&h=600&fit=crop",
      description: "Description",
    },
  },
};
