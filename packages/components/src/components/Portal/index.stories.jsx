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
      <Button id="my-button">Banana</Button>
      <Portal {...args}>
        <Card> Banana</Card>
      </Portal>
    </div>
  );
};

export const Story1 = Template.bind({});
Story1.args = {};
Story1.parameters = {
  docs: {
    description: {
      story: `Only single option can be selected.`,
    },
  },
};
