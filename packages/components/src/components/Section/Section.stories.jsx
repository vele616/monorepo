import React from 'react';
import Section from './index';

export default {
  title: 'Components/Section',
  component: Section,
};

export const Story1 = (args) => <Section {...args}> Bananas </Section>;
Story1.storyName = 'Basic';
Story1.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
  style: { control: { disable: true } },
}