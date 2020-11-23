import React from "react";
import Select from "./index";

export default {
  title: "Components/Select",
  component: Select,
};

const Template = (args) => (
  <>
    <Select {...args}></Select>
  </>
);

export const Primary = Template.bind({});
Primary.args = {
  label: "Country",
};
