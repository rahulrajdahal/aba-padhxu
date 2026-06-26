import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BookCardImage from "./BookCardImage";

const meta = {
  title: "Components/BookCard/BookCardImage",
  component: BookCardImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BookCardImage>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "/uploads/books/book-1.jpg",
    alt: "Book Title",
  },
};
