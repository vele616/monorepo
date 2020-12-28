import React from "react";
import Select from "../../components/Select";
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import styles from "./index.module.scss";

export default {
  title: "Examples/CroCoder Jobs/Search Text",
  component: Select,
  subcomponents: { Button, Select, Typography },
  parameters: {
    docs: { page: null },
    viewports: {
      defaultViewport: "tabletLarge",
    },
  },
};

const Template = () => (
  <>
    <Typography
      color="gray_2"
      className={styles.text}
      fontWeight={500}
      element="h2"
    >
      Are you looking for a{" "}
      <Select
        className={styles.parttime}
        hideLabel
        defaultSelection={[{ id: "full-time", value: "full time" }]}
      >
        <Select.Option id="full-time">
          <Typography fontSize={24}>full time</Typography>
        </Select.Option>
        <Select.Option id="part-time">
          <Typography fontSize={24}>part time</Typography>
        </Select.Option>
      </Select>{" "}
      <Select
        className={styles.frontend}
        hideLabel
        defaultSelection={[{ id: "frontend", value: "frontend developer" }]}
      >
        <Select.Option id="frontend">
          <Typography fontSize={24}>frontend developer</Typography>
        </Select.Option>
        <Select.Option id="backend">
          <Typography fontSize={24}>backend developer</Typography>
        </Select.Option>
      </Select>{" "}
      job?
    </Typography>
  </>
);

const TemplateArgTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
  rows: { control: { disable: true } },
  columns: { control: { disable: true } },
  justifyItems: { control: { disable: true } },
  alignItems: { control: { disable: true } },
  justifyContent: { control: { disable: true } },
  alignContent: { control: { disable: true } },
};

export const Story2 = Template.bind({});
Story2.storyName = "Desktop";
Story2.parameters = {
  viewport: {
    defaultViewport: "desktop",
  },
};
Story2.argTypes = TemplateArgTypes;

export const Story3 = Template.bind({});
Story3.storyName = "Tablet Landscape";
Story3.parameters = {
  viewport: {
    defaultViewport: "tabletLandscapeMinimum",
  },
};
Story3.argTypes = TemplateArgTypes;

export const Story4 = Template.bind({});
Story4.storyName = "Tablet Portrait";
Story4.parameters = {
  viewport: {
    defaultViewport: "tabletPortraitMinimum",
  },
};
Story4.argTypes = TemplateArgTypes;

export const Story5 = Template.bind({});
Story5.storyName = "Mobile";
Story5.parameters = {
  viewport: {
    defaultViewport: "mobileMinimum",
  },
};
Story5.argTypes = TemplateArgTypes;
