import React from "react";
import Listbox from "./index";

export default {
  title: "Components/Listbox",
  component: Listbox,
};

const Template = () => (
  <>
    <Listbox>
      <Listbox.Item>Option 1</Listbox.Item>
      <Listbox.Item>Option 2</Listbox.Item>
      <Listbox.Item>Option 3</Listbox.Item>
      <Listbox.Item>Option 4</Listbox.Item>
      <Listbox.Item>Option 5</Listbox.Item>
      <Listbox.Item>Option 6</Listbox.Item>
    </Listbox>
  </>
);

export const Primary = Template.bind({});
Primary.args = {};
