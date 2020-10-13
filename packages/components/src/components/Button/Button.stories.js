import React from 'react';
import Button from './index';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template = (args) => <>
  <Button styleType="basic" {...args} />
</>;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Secondary',
};

export const Unset = Template.bind({});
Unset.args = {
  variant: 'outline',
  children: 'Outline',
};
