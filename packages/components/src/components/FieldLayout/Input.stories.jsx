import React from "react";
import Button from "../Button";
import FieldLayout from "./index";
import Select from "../Select";
import Input from "../Input";

export default {
  title: "Components/FieldLayout",
  component: FieldLayout,
};

const Template = (args) => (
  <>
    <FieldLayout {...args}>
      <Button variant="sneaky">{args.label}</Button>
    </FieldLayout>
    <Input {...args} />
    <Select {...args}>
      <Select.Option>Banana</Select.Option>
    </Select>
  </>
);

export const Story1 = Template.bind();
Story1.storyName = "Basic usage";
Story1.args = {
  label: "Banana",
};
Story1.argTypes = {
  className: { control: { disable: true } },
};

export const Story2 = Template.bind();
Story2.storyName = "Error message";
Story2.args = {
  label: "Banana",
  error: true,
  errorMessage:
    "Some really really really really really really really error message.",
};
Story2.argTypes = {
  className: { control: { disable: true } },
};
