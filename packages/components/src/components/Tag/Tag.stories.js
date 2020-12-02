import React from "react";
import Tag from "./index";

export default {
  title: "Components/Tag",
  component: Tag,
};

export const Story1 = (args) => (
  <div style={{ padding: "10px" }}>
    <Tag {...args}> #DevOps </Tag>
    <Tag> #Python </Tag>
    <Tag> #Development </Tag>
  </div>
);
Story1.storyName = "Basic";
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
  <div style={{ padding: "10px", display: "flex", flexWrap: "wrap" }}>
    {[
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
      "green_1",
      "green_2",
      "green_4",
      "green_5",
      "orange_1",
      "orange_2",
      "orange_3",
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
      <Tag {...args} color={color}>
        {color}
      </Tag>
    ))}
  </div>
);
Story2.storyName = "Available colors";
Story2.parameters = {
  a11y: { disable: true },
};
Story2.argTypes = {
  color: { control: { disable: true } },
  className: { control: { disable: true } },
  children: { control: { disable: true } },
};
