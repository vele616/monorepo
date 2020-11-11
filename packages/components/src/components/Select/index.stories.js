import React from 'react';
import Select from './index';

export default {
  title: 'Components/Select',
  component: Select,
};

const Template = (args) => <>
  <Select {...args}>
    <Select.Item>Option 1</Select.Item>
    <Select.Item>Option 2</Select.Item>
    <Select.Item>Option 3</Select.Item>
    <Select.Item>Option 4</Select.Item>
  </Select>
</>;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Country'
};
