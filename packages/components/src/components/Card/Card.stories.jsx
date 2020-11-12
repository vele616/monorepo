import React from "react";
import Typography from "../Typography";
import Flexbox from "../Flexbox";
import Card from "./index";

export default {
  title: "Components/Card",
  component: Card,
  subcomponents: {
    Title: Card.Title,
    Subtitle: Card.Subtitle,
    Paragraph: Card.Paragraph,
  },
};

const ContentTemplate = () => (
  <Flexbox direction="column">
    <Typography
      style={{ marginBottom: "0.5em" }}
      color="gray_2"
      fontSize={34}
      fontWeight={700}
      fontFamily="rubik"
    >
      James Johanson
    </Typography>
    <Typography
      style={{ marginBottom: "1em" }}
      color="gray_4"
      fontSize={18}
      fontWeight={300}
    >
      Developer
    </Typography>
    <Typography color="gray_6" fontSize={18} fontWeight={400}>
      John likes to code in his spear time. He has worked for himself most of
      his life. John likes to code in his spear time. He has worked for himself
      most of his life. John likes to code in his spear time. He has worked for
      himself most of his life. John likes to code in his spear time. He has
      worked for himself most of his life. John likes to code in his spear time.
      He has worked for himself most of his life.
    </Typography>
  </Flexbox>
);

export const Story1 = (args) => (
  <div style={{ padding: "15px" }}>
    <Card {...args}>
      <ContentTemplate />
    </Card>
  </div>
);
Story1.storyName = "Basic";
Story1.args = {
  backgroundColor: "blue_2",
};
Story1.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
  image: { control: { disable: true } },
  style: { control: { disable: true } },
};

export const Story2 = (args) => (
  <div style={{ padding: "15px" }}>
    <Card
      {...args}
      image={<img alt="Kroki" width="100%" src="/images/crocFriends.png" />}
    >
      <ContentTemplate />
    </Card>
  </div>
);
Story2.storyName = "With image";
Story2.parameters = {
  docs: {
    description: {
      story: `If you wish to display an image inside of the Card component, you may choose
      to do so by passing element to render as the \`image\` property. 
      If you decide to pass the \`imageAspectRatio\` as well, the Card component will place the
      image inside of a div element which will be positioned absolutely and comply to the specified
      aspect ratio.     
      `,
    },
  },
};
Story2.args = {
  backgroundColor: "blue_2",
  imageAspectRatio: "2:1",
};
Story2.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
  image: { control: { disable: true } },
  style: { control: { disable: true } },
};

export const Story3 = (args) => (
  <div style={{ padding: "15px" }}>
    <Card {...args}>
      <Card.Title>You can use the default exports!</Card.Title>
      <Card.Subtitle>We have a title, subtitle and a paragraph</Card.Subtitle>
      <Card.Paragraph>
        These basic components are only using the existing Typography component
        and applying the style values from the design. If you do not need custom
        styling of text, this might be useful for you. We set color, font-size,
        font-weight, font-family as well as margins. Paragraph also has a
        line-height defined.
      </Card.Paragraph>
    </Card>
  </div>
);
Story3.storyName = "Default text styling";

Story3.parameters = {
  docs: {
    description: {
      story: `For most cases, the default text styling will be enough when displaying Cards.
      Because of that, the Card component exposes \`Card.Title\`, \`Card.Subtitle\`  and \`Card.Paragraph\`.
      Every one of those components simply wraps the passed content into a Typography component with some
      predefined properties that set the style.
      `,
    },
  },
};
Story3.args = {
  backgroundColor: "blue_2",
  imageAspectRatio: "2:1",
};
Story3.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
  image: { control: { disable: true } },
  style: { control: { disable: true } },
};
