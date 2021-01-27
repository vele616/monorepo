import React from "react";
import renderer from "react-test-renderer";
import Tabs from "../index";

describe("Tabs Component", () => {
  test("renders without issue", () => {
    renderer.create(
      <Tabs>
        <Tabs.TabList>
          <Tabs.Tab>1</Tabs.Tab>
          <Tabs.Tab>2</Tabs.Tab>
          <Tabs.Tab>3</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.PanelList>
          <Tabs.Panel>Content 1</Tabs.Panel>
          <Tabs.Panel>Content 2</Tabs.Panel>
          <Tabs.Panel>Content 3</Tabs.Panel>
        </Tabs.PanelList>
      </Tabs>
    );
  });
});
