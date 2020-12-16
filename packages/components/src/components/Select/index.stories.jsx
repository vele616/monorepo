import React from "react";
import Select from "./index";
import Card from "../Card";

export default {
  title: "Components/Select",
  component: Select,
  subComponents: [Card],
};

const Template = (args) => {
  return (
    <div>
      <Select {...args}>
        <Select.Option>Banana</Select.Option>
        <Select.Option>erwer</Select.Option>
      </Select>
    </div>
  );
};

export const Story1 = Template.bind({});
Story1.storyName = "Basic";

const Template1 = (args) => {
  return (
    <div>
      <Select pill {...args}>
        <Select.Option>Banana</Select.Option>
        <Select.Option>erwer</Select.Option>
      </Select>
    </div>
  );
};

export const Story2 = Template1.bind({});
Story2.storyName = "Pills";

Story2.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
  pill: { control: { disable: true } },
};
