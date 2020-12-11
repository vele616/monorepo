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
        <Select.Option>Apple</Select.Option>
        <Select.Option>Banana</Select.Option>
        <Select.Option>Apple</Select.Option>
        <Select.Option>Banana</Select.Option>
        <Select.Option>Apple</Select.Option>
        <Select.Option>Banana</Select.Option>
        <Select.Option>Apple</Select.Option>
        <Select.Option>Banana</Select.Option>
        <Select.Option>Apple</Select.Option>
        <Select.Option>Banana</Select.Option>
        <Select.Option>Apple</Select.Option>
        <Select.Option>Banana</Select.Option>
        <Select.Option>Apple</Select.Option>
        <Select.Option>Banana</Select.Option>
        <Select.Option>Apple</Select.Option>
      </Select>
    </div>
  );
};

export const Story1 = Template.bind({});
Story1.storyName = "Basic";
Story1.args = {
  x: "center",
  y: "top",
};
