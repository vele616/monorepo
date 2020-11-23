import React from "react";
import Listbox from "./index";

export default {
  title: "Components/Listbox",
  component: Listbox,
};

const Template = (args) => {
  return (
    <Listbox
      disabled={args.disabled}
      enableMultiselect={args.enableMultiselect}
      enableSelectFocusedOption={args.enableSelectFocusedOption}
      enableTypeAhead={args.enableTypeAhead}
      onOptionSelect={args.onOptionSelect}
      onOptionUnselect={args.onOptionUnselect}
      onChange={args.onChange}
      orientation={args.orientation}
      showCheckIcon={args.showCheckIcon}
    >
      <Listbox.Option>Ananas</Listbox.Option>
      <Listbox.Option>Avocado</Listbox.Option>
      <Listbox.Option>Arm</Listbox.Option>
      <Listbox.Option>Banana</Listbox.Option>
      <Listbox.Option>Bush</Listbox.Option>
      <Listbox.Option>Boolean</Listbox.Option>
      <Listbox.Option>Balcony</Listbox.Option>
      <Listbox.Option>Boom</Listbox.Option>
      <Listbox.Option>Boomerang</Listbox.Option>
      <Listbox.Option>Bloom</Listbox.Option>
      <Listbox.Option>Doom</Listbox.Option>
    </Listbox>
  );
};

export const Story1 = Template.bind({});
Story1.storyName = "Single Select";
Story1.args = {};
Story1.parameters = {
  docs: {
    description: {
      story: `Only single option can be selected.`,
    },
  },
};

export const Story2 = Template.bind({});
Story2.storyName = "Multi select";
Story2.args = {
  enableMultiselect: true,
};
Story2.parameters = {
  docs: {
    description: {
      story: `Multiple options can be selected.`,
    },
  },
};

export const Story3 = Template.bind({});
Story3.storyName = "Keyboard interaction";
Story3.args = {
  enableMultiselect: true,
};
Story3.parameters = {
  docs: {
    description: {
      story: `
      Press Arrow Down to focus next option.
      Press Arrow Up to focus previous option.
      Press Enter or Space to select option.
      Press Home to select first option.
      Press End to select last option.
      Press any other key to focus option that starts with that key.
      `,
    },
  },
};

export const Story4 = () => {
  return (
    <div>
      <p>Press Tab to change focus</p>
      <Listbox>
        <Listbox.Option>Ananas</Listbox.Option>
        <Listbox.Option>Avocado</Listbox.Option>
        <Listbox.Option>Banana</Listbox.Option>
        <Listbox.Option>Bush</Listbox.Option>
        <Listbox.Option>Bloom</Listbox.Option>
        <Listbox.Option>Doom</Listbox.Option>
      </Listbox>
      <Listbox>
        <Listbox.Option>Ananas</Listbox.Option>
        <Listbox.Option>Avocado</Listbox.Option>
        <Listbox.Option>Banana</Listbox.Option>
        <Listbox.Option>Bush</Listbox.Option>
        <Listbox.Option>Bloom</Listbox.Option>
        <Listbox.Option>Doom</Listbox.Option>
      </Listbox>
      <Listbox>
        <Listbox.Option>Ananas</Listbox.Option>
        <Listbox.Option>Avocado</Listbox.Option>
        <Listbox.Option>Banana</Listbox.Option>
        <Listbox.Option>Bush</Listbox.Option>
        <Listbox.Option>Bloom</Listbox.Option>
        <Listbox.Option>Doom</Listbox.Option>
      </Listbox>
    </div>
  );
};
Story4.storyName = "Multiple listboxes";
Story4.parameters = {
  docs: {
    description: {
      story: `This story shows multiple listboxes. Try to change focus with Tab key to select next option.`,
    },
  },
};

export const Story5 = () => {
  return (
    <Listbox>
      <Listbox.Option>Ananas</Listbox.Option>
      <Listbox.Option disabled>Avocado</Listbox.Option>
      <Listbox.Option>Banana</Listbox.Option>
      <Listbox.Option>Bush</Listbox.Option>
      <Listbox.Option disabled>Bloom</Listbox.Option>
      <Listbox.Option>Doom</Listbox.Option>
    </Listbox>
  );
};
Story5.storyName = "Disabled options";
Story5.parameters = {
  docs: {
    description: {
      story: `Some options can be disabled.`,
    },
  },
};
