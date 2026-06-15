import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import StripeCheckoutForm from "./StripeCheckoutForm";

const meta = {
  title: "Components/StripeCheckoutForm",
  component: StripeCheckoutForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StripeCheckoutForm>;
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
    qty: 1,
  },
};
