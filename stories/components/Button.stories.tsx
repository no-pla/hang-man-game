import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button",
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => <Button text="Button" primary />,
};

export const Secondary: Story = {
  render: () => <Button text="Button" secondary />,
};
