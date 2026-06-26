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
    listing: {
      id: "1",
      book: {
        id: "1",
        title: "Book Title",
        author: "Author Name",
        genre: "Genre",
        image:
          "https://images.unsplash.com/photo-1544947950-fa07a98c2941?w=800&h=600&fit=crop",
        createdAt: new Date(),
        updatedAt: new Date(),
        isbn13: "1234567890",
        slug: "book-title",
        publisher: "Publisher",
        publishedDate: new Date(),
        description: "Description",
      },
      priceCents: 10,
    },
  },
};
