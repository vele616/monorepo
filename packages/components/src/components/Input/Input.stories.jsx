import Input from "./index";

export default {
  title: "Components/Input",
  component: Input,
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
