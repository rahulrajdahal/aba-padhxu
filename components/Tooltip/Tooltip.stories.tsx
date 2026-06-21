import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Tooltip from "./Tooltip";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "Tooltip Content",
    children: <span>Hover me</span>,
  },
};

export const Top: Story = {
  args: {
    content: "Tooltip Content",
    position: "top",
    children: <span>Hover me</span>,
  },
};

export const Bottom: Story = {
  args: {
    content: "Tooltip Content",
    position: "bottom",
    children: <span>Hover me</span>,
  },
};

export const Left: Story = {
  args: {
    content: "Tooltip Content",
    position: "left",
    children: <span>Hover me</span>,
  },
};

export const Right: Story = {
  args: {
    content: "Tooltip Content",
    position: "right",
    children: <span>Hover me</span>,
  },
};

export const Delay200: Story = {
  args: {
    content: "Tooltip Content",
    delay: 200,
    children: <span>Hover me</span>,
  },
};
