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
    book: {
      id: "1",
      name: "Book Title",
      author: {
        name: "Author Name",
      },
      genre: {
        title: "Genre",
      },
      year: 2022,
      price: 10,
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98c2941?w=800&h=600&fit=crop",
      description: "Description",
    },
    href: "#",
  },
};
