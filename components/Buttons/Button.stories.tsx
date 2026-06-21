import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ClockCircle } from "@meistericons/react";
import Button, { BUTTON_SIZE, BUTTON_VARIANT } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { isLoading: false },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: Object.values(BUTTON_VARIANT),
    },
    size: {
      control: "inline-radio",
      options: Object.values(BUTTON_SIZE),
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Primary: Story = {
  args: {
    variant: "filled",
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Button",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "Button",
  },
};

export const ExtraSmall: Story = {
  args: {
    children: "Button",
    size: "xs",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Button",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Button",
  },
};

export const Loading: Story = {
  args: {
    variant: "filled",
    children: "Button",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Button",
    disabled: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: "Button",
    leftIcon: <ClockCircle />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: "Button",
    rightIcon: <ClockCircle />,
  },
};
