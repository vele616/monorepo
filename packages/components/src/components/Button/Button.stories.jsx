import React from "react";
import Button from "./index";
import Icon from "../Icon";

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
      <Button style={{ margin: "10px" }} {...args}>
        Job Type
      </Button>
      <Button style={{ margin: "10px" }} {...args}>
        Contract Type
      </Button>
      <Button style={{ margin: "10px" }} {...args}>
        Skills
      </Button>
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

export const Select = (args) => {
  return (
    <>
      <Button
        style={{ margin: "10px", display: "flex", alignItems: "center" }}
        {...args}
      >
        Job Type{" "}
        <Icon
          style={{ marginLeft: "10px", fontSize: "1.5em" }}
          icon="chevron-down"
        />
      </Button>
      <Button disabled {...args}>
        Disabled
      </Button>
    </>
  );
};
Select.parameters = {
  docs: {
    description: {
      story: "",
    },
  },
};
Select.args = {
  variant: "select",
};
