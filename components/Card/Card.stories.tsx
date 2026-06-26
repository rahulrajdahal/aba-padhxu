import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Card from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    listing: {
      book: {
        title: "Book Title",
        author: "Author Name",
        genre: "Genre",
        image: "https://placehold.co/300x400/orange/white?text=Book+Cover",
      },
      priceCents: 10,
    },
    href: "#",
  },
};
