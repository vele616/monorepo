import React from "react";
import Typography from "./index";

export default {
  title: "Components/Typography",
  component: Typography,
};

export const Story1 = (args) => (
  <>
    <Typography {...args}> What is lorem ipsum?</Typography>
    <Typography>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
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
    {[
      "primary",
      "primary_light",
      "secondary",
      "secondary_light",
      "contrast",
      "positive",
      "positive_contrast",
      "negative_contrast",
      "negative",
      "background_light",
      "background_dark",
      "background_base",
      "text_1",
      "text_2",
      "text_3",
      "text_4",
      "text_base",
      "blue_1",
      "blue_2",
      "blue_3",
      "blue_4",
      "blue_5",
      "blue_6",
      "gray_1",
      "gray_2",
      "gray_3",
      "gray_4",
      "gray_5",
      "gray_6",
      "gray_7",
      "gray_8",
      "gray_9",
      "gray_10",
      "gray_11",
      "gray_12",
      "green_1",
      "green_2",
      "green_4",
      "green_5",
      "orange_1",
      "orange_2",
      "orange_3",
      "orange_4",
      "red_1",
      "red_2",
      "red_3",
      "red_4",
      "red_5",
      "white",
      "yellow_1",
      "yellow_2",
      "yellow_3",
      "yellow_4",
      "yellow_5",
    ].map((color) => (
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
