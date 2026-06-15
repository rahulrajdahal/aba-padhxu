import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Lock, User } from "@meistericons/react";
import Input from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Input",
    placeholder: "Input",
    type: "text",
  },
};

export const WithIconLeft: Story = {
  args: {
    label: "Icon Left Input",
    placeholder: "Icon Left Input",
    type: "text",
    iconLeft: <User />,
  },
};

export const WithIconRight: Story = {
  args: {
    label: "Icon Right Input",
    placeholder: "Icon Right Input",
    type: "password",
    iconRight: <Lock />,
  },
};

export const WithError: Story = {
  args: {
    label: "Error Input",
    placeholder: "Error Input",
    type: "text",
    errors: ["Error Message"],
  },
};
