import React from 'react';
import Listbox from './index';

export default {
  title: 'Components/Listbox',
  component: Listbox,
};

//pazi da ne pregazis onclick handler od .itema
const Template = (args) => <>
  <Listbox {...args}> 
    <Listbox.Item>Option 1</Listbox.Item>
    <Listbox.Item>Option 2</Listbox.Item>
    <Listbox.Item>Option 3</Listbox.Item>
    <Listbox.Item>Option 4</Listbox.Item>
  </Listbox>
</>;

export const Primary = Template.bind({});
Primary.args = {
  
};
