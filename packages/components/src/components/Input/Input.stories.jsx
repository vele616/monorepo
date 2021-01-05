import Input from "./index";
import FieldLayout from "../FieldLayout";

export default {
  title: "Components/Input",
  component: Input,
  subcomponents: {
    FieldLayout,
  },
};

const Template = Input.bind();

export const Story1 = Template.bind();
Story1.storyName = "Basic usage";
Story1.args = {
  label: "banana",
};
Story1.argTypes = {
  className: { control: { disable: true } },
};

export const Story2 = Template.bind();
Story2.storyName = "Error message";
Story2.args = {
  label: "Banana",
  error: true,
  errorMessage:
    "Some really really really really really really really error message.",
};
Story2.argTypes = {
  className: { control: { disable: true } },
};

export const Story3 = Template.bind();
Story3.storyName = "Default value";
Story3.args = {
  label: "banana",
  defaultValue: "Some default value",
};

export const Story5 = Template.bind();
Story5.storyName = "Max length";
Story5.args = {
  label: "Max 10 chars",
  maxLength: 10,
};
