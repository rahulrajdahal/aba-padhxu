import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Headings from "./Headings";

const meta = {
  title: "Auth/Headings",
  component: Headings,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Headings>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: "Login",
    body: "Enter your email and password to login",
  },
};
