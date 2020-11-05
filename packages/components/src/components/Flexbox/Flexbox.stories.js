import React from 'react';
import Flexbox from './index';

export default {
  title: 'Components/Flexbox',
  component: Flexbox,
};

export const Story1 = (args) => 
<Flexbox  {...args}>
  <div style={{ background: '#3D4EDE', color: 'white' }}> A </div>  
  <div style={{ background: '#424C6D', color: 'white' }}> B </div>  
  <div style={{ background: "#3C3843", color: "white"}}> C </div>  
</Flexbox>;
Story1.storyName = 'Basic usage';
Story1.args = {
}
Story1.argTypes = {
  className: { control: { disable: true }},
  children: { control: { disable: true }},
}
