import React from 'react';
import Button from '../Button';
import Typography from '../Typography';
import Navigation from './index';

export default {
  title: 'Components/Navigation',
  component: Navigation,
};

export const Story1 = (args) =>
<div style={{ height: '150vh'}}>
  <Navigation {...args} Logo={<img width="100%" src="/images/navigation.png" />}>
    <Button variant="secondary">Post a job</Button>
  </Navigation>
  <div style={{ background: 'red', height: '100px'}}>
    I am another content
  </div>
  <div style={{ background: 'green', height: '100px'}}>
    I am another content
  </div>
  <div style={{ background: 'blue', height: '100px'}}>
    I am another content
  </div>
</div>;
Story1.storyName = 'Basic';
Story1.args = {
  element: 'div'
}
Story1.argTypes = {
  className: { control: { disable: true }},
  children: { control: { disable: true }},
}

export const Story2 = (args) =>
<div style={{ height: '150vh'}}>
  <Navigation {...args} Logo={<img width="100%" src="/images/navigation.png" />}>
    <Typography className="link">
      One link
    </Typography>
    <Typography className="link">
      Two link
    </Typography>
    <Button variant="secondary">Post a job</Button>
  </Navigation>
</div>;
Story2.storyName = 'Multiple links example';
Story2.args = {
  element: 'div'
}
Story2.argTypes = {
  className: { control: { disable: true }},
  children: { control: { disable: true }},
}