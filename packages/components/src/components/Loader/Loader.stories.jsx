import React from "react";
import Loader from "./index";
import { ColorControl } from "../__controls/color";

export default {
  title: "Components/Loader",
  component: Loader,
  argTypes: {
    color: ColorControl,
  },
};

const Template = (args) => {
  return (
    <div style={{ position: "relative", height: "300px", minWidth: "300px" }}>
      <Loader {...args} />
    </div>
  );
};

export const Basic = Template.bind({});

export const CroCoderLoader = Template.bind({});
CroCoderLoader.args = {
  type: "default",
};
CroCoderLoader.argTypes = {
  type: { control: { disable: true } },
};

export const DotLoader = Template.bind({});
DotLoader.args = {
  type: "dots",
};
DotLoader.argTypes = {
  type: { control: { disable: true } },
};

DotLoader.parameters = {
  docs: {
    description: {
      story: ``,
    },
  },
};

export const CircleBorderLoader = Template.bind({});
CircleBorderLoader.args = {
  type: "circleBorder",
};
CircleBorderLoader.argTypes = {
  type: { control: { disable: true } },
  // thickness: { control: 'number'}
};

CircleBorderLoader.parameters = {
  docs: {
    description: {
      story: ``,
    },
  },
};
