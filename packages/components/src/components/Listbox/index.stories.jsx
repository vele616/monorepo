import React from "react";
import Listbox from "./index";

export default {
  title: "Components/Listbox",
  component: Listbox,
};

const TemplateWithEventListeners = (args) => {
  function handleItemSelect(item) {
    console.log("Item is now selected", item);
  }

  function handleItemUnselect(item) {
    console.log("Item is not selected anymore", item);
  }

  function handleChange(items) {
    console.log("Changed", items);
  }

  return (
    <Listbox
      onSelectionChange={handleChange}
      onItemSelect={handleItemSelect}
      onItemUnselect={handleItemUnselect}
      {...args}
    >
      <Listbox.Item>Ananas</Listbox.Item>
      <Listbox.Item>Avocado</Listbox.Item>
      <Listbox.Item>Antilope</Listbox.Item>
      <Listbox.Item>America</Listbox.Item>
      <Listbox.Item>Australia</Listbox.Item>
      <Listbox.Item>Banana</Listbox.Item>
      <Listbox.Item>Bush</Listbox.Item>
      <Listbox.Item>Bloom</Listbox.Item>
      <Listbox.Item>Doom</Listbox.Item>
    </Listbox>
  );
};

export const Story1 = TemplateWithEventListeners.bind({});
Story1.storyName = "Single select";
Story1.args = {};

export const Story2 = TemplateWithEventListeners.bind({});
Story2.storyName = "Multi select";
Story2.args = {
  enableMultiselect: true,
};

export const Story3 = TemplateWithEventListeners.bind({});
Story3.storyName = "Single select follow focus";
Story3.args = {
  enableSelectFocusedItem: true,
};

const TemplateCustomItems = () => {
  function handleItemSelect(item) {
    console.log("Item is now selected", item);
  }

  return (
    <Listbox onItemSelect={handleItemSelect}>
      <Listbox.Item>
        <button>One</button>
        <button>Two</button>
        <button>Three</button>
      </Listbox.Item>
      <Listbox.Item>Banana</Listbox.Item>
      <Listbox.Item>Banana Yellow</Listbox.Item>
      <Listbox.Item>Banana Red</Listbox.Item>
      <Listbox.Item>
        <div>
          I am parent
          <div>I am child 1</div>
          <div>I am child 2</div>
        </div>
      </Listbox.Item>
      <Listbox.Item>
        <button>One</button>
        <button>Two</button>
        <button>Three</button>
      </Listbox.Item>
    </Listbox>
  );
};

export const Story4 = TemplateCustomItems.bind({});
Story4.storyName = "Custom Items";
Story4.args = {};

export const Story5 = () => {
  return (
    <div>
      Two Items
      <div>
        <Listbox>
          <Listbox.Item>Ananas</Listbox.Item>
          <Listbox.Item>Avocado</Listbox.Item>
        </Listbox>
      </div>
      One Item
      <div>
        <Listbox>
          <Listbox.Item>Ananas</Listbox.Item>
        </Listbox>
      </div>
      No Items
      <div>
        <Listbox></Listbox>
      </div>
    </div>
  );
};
