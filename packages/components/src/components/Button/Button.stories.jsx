import React from "react";
import Button from "./index";

export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => (
  <>
    <Button {...args} />
  </>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  children: "Primary",
};

export const Secondary = Template.bind({});
Secondary.parameters = {
  docs: {
    description: {
      story:
        "This variant should be used for floating action buttons or for selection controls.",
    },
  },
};
Secondary.args = {
  variant: "secondary",
  children: "Secondary",
};

export const Sneaky = Template.bind({});
Sneaky.parameters = {
  docs: {
    description: {
      story:
        "Use whenever you need a semantical button without any visual styles.",
    },
  },
};
Sneaky.args = {
  variant: "sneaky",
  children: "Sneaky",
};

export const Pill = (args) => {
  return (
    <>
      <Button {...args}>Job Type</Button>
      <Button {...args}>Contract Type</Button>
      <Button {...args}>Skills</Button>
      <Button disabled {...args}>
        Disabled
      </Button>
    </>
  );
};
Pill.parameters = {
  docs: {
    description: {
      story: "",
    },
  },
};
Pill.args = {
  variant: "pill",
};
