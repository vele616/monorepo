import React from "react";
import Typography from "./index";
import { colors, ColorControl } from "../../storybook/Controls/color";

export default {
  title: "Components/Typography",
  component: Typography,
  argTypes: {
    color: ColorControl,
  },
};

export const Story1 = (args) => (
  <>
    <Typography {...args}> What is lorem ipsum?</Typography>
    <Typography>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry&apos;s standard dummy text ever since
      the 1500s, when an unknown printer took a galley of type and scrambled it
      to make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </Typography>
  </>
);
Story1.storyName = "Basic";
Story1.args = {
  element: "div",
};
Story1.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
  fontWeight: {
    control: {
      type: "range",
      min: 100,
      max: 900,
      step: 100,
    },
  },
};

export const Story2 = (args) => (
  <>
    {colors.map((color) => (
      <Typography {...args} color={color}>
        {color}
      </Typography>
    ))}
  </>
);
Story2.storyName = "Color variation";
Story2.parameters = {
  a11y: { disable: true },
};
Story2.args = {
  element: "div",
};
Story2.argTypes = {
  color: { control: { disable: true } },
  className: { control: { disable: true } },
  children: { control: { disable: true } },
};

export const Story3 = (args) => (
  <>
    <Typography {...args} element="h1">
      h1 element
    </Typography>
    <Typography {...args} element="h2">
      h2 element
    </Typography>
    <Typography {...args} element="h3">
      h3 element
    </Typography>
    <Typography {...args} element="h4">
      h4 element
    </Typography>
    <Typography {...args} element="h5">
      h5 element
    </Typography>
    <Typography {...args} element="h6">
      h6 element
    </Typography>
  </>
);
Story3.storyName = "Element variation";
Story3.args = {
  fontWeight: 700,
  color: "gray_1",
};
Story3.argTypes = {
  element: { control: { disable: true } },
  className: { control: { disable: true } },
  children: { control: { disable: true } },
};
