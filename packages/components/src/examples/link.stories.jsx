/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default {
  title: "Examples/Links",
  parameters: {
    docs: { page: null },
  },
};

const Template = () => (
  <div>
    You can add links style by adding the link class to your component. This is
    purposely a global class. For example: <a className="link">Banana</a>
  </div>
);

export const Story2 = Template.bind({});
Story2.storyName = "Basic";
