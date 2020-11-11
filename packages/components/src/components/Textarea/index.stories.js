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
  showCharCount: true,
  maxLength: 50
};

export const Story4 = Template.bind();
Story4.storyName = 'Fluid from 3 to 5 rows';
Story4.args = {
  label: 'Banana',
  showCharCount: true,
  fluidHeight: true,
  fluidHeightOptions: {
    minRows: 3,
    maxRows: 5,
    lineHeight: 16
  }
};

export const Story5 = (args) => {
  return (
    <div>
      <Textarea {...args} /><p/>
      <Textarea {...args} showCharCount/><p/>
      <Textarea {...args} showCharCount maxLength={100000}/><p/>
      <Textarea {...args} error={false} showCharCount/><p/>
    </div>
  );
};
Story5.storyName = 'Error messages';
Story5.args = {
  label: 'Banana',
  error: true,
  errorMessage: 'This is some really long error message that could cause some troubles!'
};

const TemplateRows = (args) => <><Textarea {...args}/><Textarea {...args}/></>;
export const Story6 = TemplateRows.bind();
Story6.storyName = 'Multiple textareas in row';
Story6.args = {
  label: 'Banana',
  showCharCount: true,
  enableManualResize: true
};

const TemplateColumns = (args) => <><Textarea {...args}/> <p/> <Textarea {...args}/></>;
export const Story7 = TemplateColumns.bind();
Story7.storyName = 'Multiple textareas in column';
Story7.args = {
  label: 'Banana',
  showCharCount: true,
  enableManualResize: true
};
