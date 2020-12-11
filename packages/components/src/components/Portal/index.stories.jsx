import React from "react";
import Portal from "./index";
import Card from "../Card";
import Button from "../Button";

export default {
  title: "Components/Portal",
  component: Portal,
  subComponents: [Card],
};

const Template = (args) => {
  return (
    <div style={{ padding: "250px" }}>
      <Portal {...args}>
        <Card> Banana</Card>
      </Portal>
    </div>
  );
};

export const Story1 = Template.bind({});
Story1.storyName = "Basic";
Story1.args = {
  x: "center",
  y: "top",
};

export const Story2 = (args) => (
  <div style={{ padding: "250px" }}>
    <Portal {...args}>
      <Card>
        {" "}
        {args.x} {args.y}
      </Card>
    </Portal>
  </div>
);
Story2.storyName = "Fixed positioning";
Story2.args = {
  x: "center",
  y: "bottom",
};
Story2.parameters = {
  docs: {
    description: {
      story: `By default, the \`Portal\` component renders children in the portal layer (outside of parent's DOM tree)
        and positions them in regards to the *screen* (by using position=fixed on the wrapper element).
        Note how this story behaves in this documentation page. You'll see how these floating cards are layered
        in regards to the ones in the next story.
      `,
    },
  },
};
Story2.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
  parentId: { control: { disable: true } },
  relative: { control: { disable: true } },
  includeHalf: { control: { disable: true } },
  style: { control: { disable: true } },
};

export const Story3 = (args) => (
  <div style={{ padding: "250px" }}>
    <Button style={{ height: "200px", width: "300px" }} id="my-button">
      {" "}
      My Button{" "}
    </Button>
    <Portal {...args} parentId="my-button" x="left" y="top">
      <Card> Left Top</Card>
    </Portal>
    <Portal {...args} parentId="my-button" x="center" y="top">
      <Card> Center Top</Card>
    </Portal>
    <Portal {...args} parentId="my-button" x="right" y="top">
      <Card> Right Top</Card>
    </Portal>
    <Portal {...args} parentId="my-button" x="left" y="center">
      <Card> Left Center</Card>
    </Portal>
    <Portal {...args} parentId="my-button" x="right" y="center">
      <Card> Right Center</Card>
    </Portal>
    <Portal {...args} parentId="my-button" x="left" y="bottom">
      <Card> Left Bottom</Card>
    </Portal>
    <Portal {...args} parentId="my-button" x="center" y="bottom">
      <Card> Center Bottom</Card>
    </Portal>
    <Portal {...args} parentId="my-button" x="right" y="bottom">
      <Card> Right Bottom</Card>
    </Portal>
  </div>
);
Story3.storyName = "Absolute positioning";
Story3.args = {};
Story3.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
  parentId: { control: { disable: true } },
  x: { control: { disable: true } },
  y: { control: { disable: true } },
  relative: { control: { disable: true } },
  style: { control: { disable: true } },
};
Story3.parameters = {
  docs: {
    description: {
      story: `If you pass the **parentId** property to the \`Portal\` component, it's going to position the children
      in regards to the parent. Even though it's going to be rendered visually next to the parent it's implementation is done
      in a way that it's positioned absolutely in regards to body. To make sure we're properly placing them, we need to 
      calculate the position. <br/>
      In case you need to have the position recalculated, you can pass a function as a child to the \`Portal\` component. 
      That function will get, as it's first argument, the function that triggers position calculation.
    `,
    },
  },
};
