import React from 'react';
import Grid from './index';

export default {
  title: 'Components/Grid',
  component: Grid,
};

export const Story1 = (args) => <Grid {...args}>I am basic grid</Grid>;
Story1.storyName = 'Basic';
Story1.args = {
  element: 'div'
}
Story1.argTypes = {
  className: { control: { disable: true }},
  children: { control: { disable: true }},
}
