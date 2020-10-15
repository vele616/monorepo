import React from 'react';
import Typography from './index';

export default {
  title: 'Components/Typography',
  component: Typography,
};

export const Story1 = (args) => <Typography {...args}>I am basic typography</Typography>;
Story1.storyName = 'Basic';
Story1.args = {
  element: 'div'
}
Story1.argTypes = {
  className: { control: { disable: true }},
  children: { control: { disable: true }},
}

export const Story2 = (args) => (
  <>
    {
      [
        'black', 'blue_1', 'blue_2', 'blue_3', 'blue_4', 'blue_5', 'blue_6', 'gray_1',
        'gray_2', 'gray_3', 'gray_4', 'gray_5', 'gray_6', 'green_1', 'green_2', 'green_3',
        'green_4', 'green_5', 'orange_1', 'orange_2', 'orange_3', 'red_1', 'red_2', 'red_3',
        'red_4', 'red_5', 'white', 'yellow_1', 'yellow_2', 'yellow_3', 'yellow_4', 'yellow_5',
      ].map(color => (<Typography {...args} color={color} >{color}</Typography>))
    }
  </>
);
Story2.storyName = 'Color variation';
Story2.parameters = {
  a11y: { disable: true },
};
Story2.args = {
  element: 'div'
}
Story2.argTypes = {
  color: { control: { disable: true }},
  className: { control: { disable: true }},
  children: { control: { disable: true }},
}

export const Story3 = (args) => (
  <>
    <Typography {...args} element="h1">h1 element</Typography>
    <Typography {...args} element="h2">h2 element</Typography>
    <Typography {...args} element="h3">h3 element</Typography>
    <Typography {...args} element="h4">h4 element</Typography>
    <Typography {...args} element="h5">h5 element</Typography>
    <Typography {...args} element="h6">h6 element</Typography>
  </>)
Story3.storyName = "Element variation";
Story3.args = {
  fontSize: '13',
  fontWeight: 700,
  color: 'gray_1',
}
Story3.argTypes = {
  element: { control: { disable: true }},
  className: { control: { disable: true }},
  children: { control: { disable: true }},
}

