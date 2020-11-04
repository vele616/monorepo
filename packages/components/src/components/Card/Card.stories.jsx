import React from 'react';
import Typography from '../Typography';
import Flexbox from '../Flexbox';
import Card from './index';

export default {
  title: 'Components/Card',
  component: Card,
};

const ContentTemplate = () => (
  <Flexbox direction="column">
    <Typography style={{ marginBottom: '0.5em'}} color="gray_2" fontSize={34} fontWeight={700} fontFamily="rubik">
      James Johanson
    </Typography>
    <Typography style={{ marginBottom: '1em'}}  color="gray_4" fontSize={18} fontWeight={300}>
      Developer
    </Typography>
    <Typography color="gray_6" fontSize={18} fontWeight={400}>
    John likes to code in his spear time. He has worked for himself most of his life.
    John likes to code in his spear time. He has worked for himself most of his life.
    John likes to code in his spear time. He has worked for himself most of his life.
    John likes to code in his spear time. He has worked for himself most of his life.
    John likes to code in his spear time. He has worked for himself most of his life.
    </Typography>
  </Flexbox>
);

export const Story1 = (args) => <div style={{ padding: '15px' }}>
  <Card
    {...args} 
  >
    <ContentTemplate />
  </Card></div>;
Story1.storyName = 'Basic';
Story1.args = {
  backgroundColor: 'blue_2',
}
Story1.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
  image: { control: { disable: true } },
  style: { control: { disable: true } },
}


export const Story2 = (args) => <div style={{ padding: '15px' }}>
  <Card
    {...args} 
    image={<img width="100%" src="/images/crocFriends.png" />}
  >
    <ContentTemplate />
  </Card></div>;
Story2.storyName = 'With image';
Story2.args = {
  backgroundColor: 'blue_2',
  imageAspectRatio: "2:1"
}
Story2.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
  image: { control: { disable: true } },
  style: { control: { disable: true } },
}


export const Story3 = (args) => <div style={{ padding: '15px' }}>
  <Card
    {...args} 
  >
    <Card.Title>
      You can use the default exports! 
    </Card.Title>
    <Card.Subtitle>
      We have a title, subtitle and a paragraph
    </Card.Subtitle>
    <Card.Paragraph>
      These basic components are only using the existing
      Typography component and applying the style values
      from the design. If you do not need custom styling
      of text, this might be useful for you.
      We set color, font-size, font-weight, font-family as well
      as margins. Paragraph also has a line-height defined.
    </Card.Paragraph>
  </Card></div>;
Story3.storyName = 'Default text styling';
Story3.args = {
  backgroundColor: 'blue_2',
  imageAspectRatio: "2:1"
}
Story3.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
  image: { control: { disable: true } },
  style: { control: { disable: true } },
}