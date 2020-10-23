import React from 'react';
import Input from './index';

export default {
  title: 'Components/Input',
  component: Input,
};

export const Story1 = (args) => <Input {...args} />;
Story1.storyName = 'Basic usage';
Story1.args = {
  label: "banana",
}
Story1.argTypes = {
  className: { control: { disable: true } },
}

