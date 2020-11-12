import React from "react";
import Grid from "../../components/Grid";
import Typography from "../../components/Typography";
import Icon from "../../components/Icon";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import styles from "./contactform.module.scss";

export default {
  title: "Examples/Contact Form Textarea",
  parameters: {
    docs: { page: null },
  },
  component: Textarea,
  subcomponents: { Button, Grid, Typography, Input, Textarea },
  parameters: {
    docs: { page: null },
  },
};

const Tempate = (args) => (
  <>
    <div className={styles.wrapper}>
      <Grid className={styles.grid}>
        <img className={styles.image} src="/images/crocFriends.png" />
        <Typography
          color="gray_2"
          className={styles.title}
          fontWeight={700}
          fontSize={44}
        >
          Contact{" "}
          <Typography fontWeight={700} color="green_2">
            Cro
          </Typography>
          Coder
        </Typography>
        <Input className={styles.email} required label="E-mail" />
        <Input className={styles.name} required label="Your name" />
        <Textarea
          className={styles.message}
          required
          label="Message"
          {...args}
        />
        <Button className={styles.button}>Submit</Button>
      </Grid>
    </div>
    <Footer
      logo={<img width="100%" src="/images/footer.png" />}
      socialLinks={
        <>
          <Icon style={linkStyle} color="gray_1" icon="facebook2" />
          <Icon style={linkStyle} color="gray_1" icon="twitter1" />
          <Icon style={linkStyle} color="gray_1" icon="youtube" />
        </>
      }
    >
      <a style={{ color: "inherit" }} className="link">
        Home
      </a>
      <a style={{ color: "inherit" }} className="link">
        Terms of use
      </a>
      <a style={{ color: "inherit" }} className="link">
        Privacy policy
      </a>
    </Footer>
  </>
);

export const Story1 = Tempate.bind({});
Story1.storyName = "Desktop";
Story1.args = {
  label: "banana",
};
Story1.argTypes = {
  className: { control: { disable: true } },
};

export const Story2 = Tempate.bind({});
Story2.storyName = "Tablet Landscape";
Story2.args = {
  label: "banana",
};
Story2.parameters = {
  viewport: {
    defaultViewport: "tabletLandscapeMinimum",
  },
};
Story2.argTypes = {
  className: { control: { disable: true } },
};

export const Story3 = Tempate.bind({});
Story3.storyName = "Tablet Portrait";
Story3.args = {
  label: "banana",
};
Story3.parameters = {
  viewport: {
    defaultViewport: "tabletPortraitMinimum",
  },
};
Story3.argTypes = {
  className: { control: { disable: true } },
};

export const Story4 = Tempate.bind({});
Story4.storyName = "Mobile";
Story4.args = {
  label: "banana",
};
Story4.parameters = {
  viewport: {
    defaultViewport: "mobileMinimum",
  },
};
Story4.argTypes = {
  className: { control: { disable: true } },
};

const linkStyle = {
  background: "white",
  height: "40px",
  width: "40px",
  borderRadius: "50%",
  boxSizing: "border-box",
  paddingTop: "12px",
  paddingLeft: "12px",
  marginLeft: "14px",
};
