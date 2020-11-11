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
  enableManualResize: true
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
  autoHeight: true
};

const TemplateRows = (args) => <><Textarea {...args}/><Textarea {...args}/></>;
export const Story5 = TemplateRows.bind();
Story5.storyName = 'Multiple textareas in row';
Story5.args = {
  label: 'Banana',
  enableCharCount: true,
  enableManualResize: true
};

const TemplateColumns = (args) => <><Textarea {...args}/> <p/> <Textarea {...args}/></>;
export const Story6 = TemplateColumns.bind();
Story6.storyName = 'Multiple textareas in column';
Story6.args = {
  label: 'Banana',
  enableCharCount: true,
  enableManualResize: true
};
