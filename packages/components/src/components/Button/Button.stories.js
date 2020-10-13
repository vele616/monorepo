import React from 'react';
import Button from './index';

export default {
  title: 'Example/Button',
  component: Button,
};

const Template = (args) => <>
  <Button styleType="basic" {...args} />
</>;

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  children: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  children: 'Secondary',
};

export const Unset = Template.bind({});
Unset.args = {
  color: 'unset',
  children: 'Unset',
};
