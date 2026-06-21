import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Lock, User } from "@meistericons/react";
import Textarea from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Input",
    placeholder: "Input",
  },
};

export const WithIconLeft: Story = {
  args: {
    label: "Icon Left Input",
    placeholder: "Icon Left Input",
    iconLeft: <User />,
  },
};

export const WithIconRight: Story = {
  args: {
    label: "Icon Right Input",
    placeholder: "Icon Right Input",
    iconRight: <Lock />,
  },
};

export const Required: Story = {
  args: {
    label: "Required Field",
    placeholder: "Required Field",
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Error Input",
    placeholder: "Error Input",
    errors: ["Error Message"],
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Helper Text Input",
    placeholder: "Helper Text Input",
    helperText: "Helper Text Message",
  },
};
