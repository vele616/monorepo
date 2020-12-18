import React from "react";
import Grid from "../../components/Grid";
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import styles from "./header.module.scss";

export default {
  title: "Examples/CroCoder Jobs/Header",
  component: Grid,
  subcomponents: { Button, Grid, Typography },
  parameters: {
    docs: { page: null },
    viewports: {
      defaultViewport: "tabletLarge",
    },
  },
};

const Template = (args) => (
  <Grid
    {...args}
    justifyItems="center"
    alignItems="start"
    rows="auto auto auto auto"
    columns="auto"
    className={styles.grid}
  >
    <img
      alt="job header"
      className={styles.image}
      src="/images/jobsHeader.png"
    />
    <Typography fontSize={18} color="gray_6" className={styles.typography}>
      CroCoder is a small group of enthusiastic developers that wishes to help
      others find <b>fulfillment and merriment at work.</b>
    </Typography>
    <Button className={styles.button} variant="secondary">
      Post a job
    </Button>
  </Grid>
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
