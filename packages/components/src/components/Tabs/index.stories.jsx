import React, { useState, useEffect } from "react";
import Tabs from "./index";
import Button from "../Button";

const { Tab, TabList, Panel, PanelList } = Tabs;

export default {
  title: "Components/Tabs",
  component: Tabs,
  subcomponents: { Tab, TabList, Panel, PanelList },
};

const text1 =
  "In the definition part of the process, we try and create strict boundaries around the essence of the product. It’s also a part where you, as a client, are maximally involved. We use this part in the process to find out what you want to build and give you an outline on how we see your idea coming to life.";
const text2 =
  "Like we said, we iterate fast and often. We design, implement and test every feature. In this phase, we see the idea coming to life and improving with each deliverable. From this point forward, you have a finished solution that gets better and better. With each iteration, we’re closer to the imagined solution.";
const text3 =
  "Once you are happy with your product - it’s time to showcase it to the world! We help prepare steps to do so and make sure you can continue with new implementations and improvements. We can also organize an educational hand-over to your team if you’d like. One thing we make sure is, you have enough documentation to continue";

export const Story1 = (args) => {
  return (
    <Tabs {...args}>
      <Tabs.TabList>
        <Tabs.Tab>DEFINITION</Tabs.Tab>
        <Tabs.Tab>ITERATION</Tabs.Tab>
        <Tabs.Tab>LAUNCH</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.PanelList>
        <Tabs.Panel>{text1}</Tabs.Panel>
        <Tabs.Panel>{text2}</Tabs.Panel>
        <Tabs.Panel>{text3}</Tabs.Panel>
      </Tabs.PanelList>
    </Tabs>
  );
};

export const Story2 = (args) => {
  return (
    <div>
      <Tabs {...args}>
        {(selectTab) => {
          return (
            <>
              <Tabs.TabList>
                <Tabs.Tab>DEFINITION</Tabs.Tab>
                <Tabs.Tab>ITERATION</Tabs.Tab>
                <Tabs.Tab>LAUNCH</Tabs.Tab>
              </Tabs.TabList>
              <Tabs.PanelList>
                <Tabs.Panel>{text1}</Tabs.Panel>
                <Tabs.Panel>{text2}</Tabs.Panel>
                <Tabs.Panel>{text3}</Tabs.Panel>
              </Tabs.PanelList>
              <div>
                <Button style={{ margin: "10px" }} onClick={() => selectTab(0)}>
                  1
                </Button>
                <Button style={{ margin: "10px" }} onClick={() => selectTab(1)}>
                  2
                </Button>
                <Button style={{ margin: "10px" }} onClick={() => selectTab(2)}>
                  3
                </Button>
              </div>
            </>
          );
        }}
      </Tabs>
    </div>
  );
};

Story2.storyName = "Controlled";
Story2.parameters = {
  docs: {
    description: {
      story: `This story shows Tabs component that can be controlled from outside. In this example, clicking
      on each button will force component to change its tab.`,
    },
  },
};

export const Story3 = (args) => {
  return (
    <Tabs {...args}>
      <Tabs.TabList>
        <Tabs.Tab>DEFINITION</Tabs.Tab>
        <Tabs.Tab>ITERATION</Tabs.Tab>
        <Tabs.Tab>LAUNCH</Tabs.Tab>
      </Tabs.TabList>
      <Tabs.PanelList>
        <Tabs.Panel>{text1}</Tabs.Panel>
        <Tabs.Panel>{text2}</Tabs.Panel>
        <Tabs.Panel>{text3}</Tabs.Panel>
      </Tabs.PanelList>
    </Tabs>
  );
};

Story3.storyName = "Mobile";
Story3.parameters = {
  viewport: {
    defaultViewport: "mobileMinimum",
  },
  docs: {
    description: {
      story: `This story shows Tabs component on small screen`,
    },
  },
};

// eslint-disable-next-line react/prop-types
const Loader = () => {
  const [state, setState] = useState(10);

  useEffect(() => {
    const id = setInterval(() => {
      setState((prev) => {
        if (prev <= 1) clearInterval(id);
        return prev - 1;
      });
    }, 1000);
  }, []);

  return <div>{state}</div>;
};

export const Story5 = (args) => {
  return (
    <div>
      <Tabs {...args}>
        <Tabs.TabList>
          <Tabs.Tab>DEFINITION</Tabs.Tab>
          <Tabs.Tab>ITERATION</Tabs.Tab>
          <Tabs.Tab>LAUNCH</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.PanelList stateless>
          <Tabs.Panel>
            <Loader />
          </Tabs.Panel>
          <Tabs.Panel>
            <Loader />
          </Tabs.Panel>
          <Tabs.Panel>
            <Loader />
          </Tabs.Panel>
        </Tabs.PanelList>
      </Tabs>
      <Tabs {...args}>
        <Tabs.TabList>
          <Tabs.Tab>DEFINITION</Tabs.Tab>
          <Tabs.Tab>ITERATION</Tabs.Tab>
          <Tabs.Tab>LAUNCH</Tabs.Tab>
        </Tabs.TabList>
        <Tabs.PanelList>
          <Tabs.Panel>
            <Loader />
          </Tabs.Panel>
          <Tabs.Panel>
            <Loader />
          </Tabs.Panel>
          <Tabs.Panel>
            <Loader />
          </Tabs.Panel>
        </Tabs.PanelList>
      </Tabs>
    </div>
  );
};
Story5.storyName = "Stateless";
Story5.parameters = {
  docs: {
    description: {
      story: `This story shows Stateless vs. Statefull component. If stateless property is set to true,
      this component will become 'stateless'. This means that each panel will be loaded only once and then 
      toggled via selected tab. If component is Statefull, content will load each time due state change.`,
    },
  },
};
