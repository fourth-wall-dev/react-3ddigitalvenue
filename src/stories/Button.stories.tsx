import React from "react";
import { Story, Meta } from "@storybook/react";
import { Button, ButtonProps } from "../Button";
import { BackIcon } from "../icons/BackIcon";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {},
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <BackIcon />,
};
