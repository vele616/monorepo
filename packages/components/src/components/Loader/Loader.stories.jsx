import React from "react";
import Loader from "./index";

export default {
  title: "Components/Loader",
  component: Loader,
};

const Template = (args) => (
  <>
    <Loader {...args} />
  </>
);

export const Primary = Template.bind({});
Primary.args = {};
