import React from 'react';
import Button from './index';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template = (args) => <>
  <Button {...args} />
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

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
  children: 'Outline',
};
