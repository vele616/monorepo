import React from "react";
import Select from "./index";

export default {
  title: "Components/Select",
  component: Select,
};

const Template = (args) => {
  return (
    <div>
      <Select {...args}>
        <Select.Option>Banana</Select.Option>
        <Select.Option>Avocado</Select.Option>
      </Select>
    </div>
  );
};

export const Story1 = Template.bind({});
Story1.storyName = "Basic";

const Template1 = (args) => {
  return (
    <div>
      <Select {...args}>
        <Select.Option>Banana</Select.Option>
        <Select.Option>Avocado</Select.Option>
      </Select>
      <Select {...args}>
        <Select.Option>Banana</Select.Option>
        <Select.Option>Avocado</Select.Option>
      </Select>
      <Select {...args}>
        <Select.Option>Banana</Select.Option>
        <Select.Option>Avocado</Select.Option>
      </Select>
    </div>
  );
};

export const Story2 = Template1.bind({});
Story2.storyName = "Pills";
Story2.args = {
  pill: true,
  multiselect: true,
  confirmChoice: true,
  clear: true,
  title: "Fruit",
  label: "Fruit",
};

Story2.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
  pill: { control: { disable: true } },
};

export const Story4 = (args) => {
  return (
    <div>
      <Select {...args}>
        <Select.Option id="ban">Banana</Select.Option>
        <Select.Option id="ana">Avocado</Select.Option>
      </Select>
    </div>
  );
};
Story4.storyName = "Defaults";
Story4.args = {
  pill: true,
  multiselect: true,
  confirmChoice: true,
  clear: true,
  defaultSelection: ["ban", "ana"],
  title: "Fruit",
  label: "Fruit",
};
