import React from 'react';
import Card from '../Card';
import Flexbox from '../Flexbox';
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

const CardTemplate = ({ width }) => (
  <Card
    image={<img width="100%" alt="Demo croc friends" src="/images/crocFriends.png" />}
    imageAspectRatio="2:1"
    backgroundColor="red_3"
    style={{maxWidth: width, minWidth: '265px'}}
    narrow
  >
    <Card.Title textAlign="center">
      You can use the default
    </Card.Title>
    <Card.Subtitle textAlign="center">
      We have a title and other stuff
    </Card.Subtitle>
    <Card.Paragraph textAlign="center">
      These basic components are only using the existing
      Typography component and applying the style values
      from the design. If you do not need custom styling
      of text, this might be useful for you.
      We set color, font-size, font-weight, font-family as well
      as margins. Paragraph also has a line-height defined.
    </Card.Paragraph>
  </Card>
)

export const Story2 = (args) =>
<Section {...args}>
  <CardTemplate />
</Section>;
Story2.storyName = 'With card';
Story2.args = {
  backgroundColor: 'blue_6',
};
Story2.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
  style: { control: { disable: true } },
}


export const Story3 = (args) =>
<Section {...args}>
  <Flexbox flexWrap="wrap">
    <CardTemplate width="35%"/>
    <CardTemplate width="35%"/>
    <CardTemplate width="35%"/>
  </Flexbox>
</Section>;
Story3.storyName = 'With multiple cards';
Story3.args = {
  backgroundColor: 'blue_6',
};
Story3.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
  style: { control: { disable: true } },
}


export const Story4 = (args) =>
<Section {...args} removeMobilePadding>
  <CardTemplate width="100%"/>
</Section>;
Story4.storyName = "Remove mobile padding"
Story4.args = {
  backgroundColor: 'blue_6',
};
Story4.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
  style: { control: { disable: true } },
  removeMobilePadding: { control: { disable: true } },
}
Story4.parameters = {
  docs: {
    description: {
      story: "This story demonstrates the usage of the `removeMobilePadding` property. When set to true, it will remove the section defined padding for mobile screens."
    }
  },
  viewport: {
    defaultViewport: 'mobileMinimum'
  }
}