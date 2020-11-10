import React from 'react';
import Textarea from './index.jsx';

export default {
  title: 'Components/Textarea',
  component: Textarea,
};

const Template = (args) => <Textarea {...args}/>;

export const Story1 = Template.bind();
Story1.storyName = 'Basic usage';
Story1.args = {
  label: 'Banana',
};

export const Story2 = Template.bind();
Story2.storyName = 'Resizable';
Story2.args = {
  label: 'Banana',
  enableResize: true
};

export const Story3 = Template.bind();
Story3.storyName = 'Counter';
Story3.args = {
  label: 'Banana',
  enableCharCount: true,
  maxLength: 50
};

export const Story4 = Template.bind();
Story4.storyName = 'Fluid from 3 to 5 rows';
Story4.args = {
  label: 'Banana',
  minRows: 3,
  maxRows: 5,
  enableCharCount: true,
  enableAutoResize: true
};
