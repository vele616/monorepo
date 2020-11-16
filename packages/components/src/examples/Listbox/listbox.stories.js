import React, { useCallback, useState } from "react";
import Grid from "../../components/Grid";
import Typography from "../../components/Typography";
import Icon from "../../components/Icon";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Input from "../../components/Input";
import Listbox from "../../components/Listbox";
import styles from "./listbox.module.scss";

export default {
  title: "Examples/Listbox",
  parameters: {
    docs: { page: null },
  },
  component: Grid,
  subcomponents: { Button, Grid, Typography, Input, Listbox },
  parameters: {
    docs: { page: null },
  },
};

const Template = () => {
  const [currentSelection, setCurrentSelection] = useState([]);

  function handleChange(items) {
    setCurrentSelection(items);
  }

  function renderSelection() {
    return currentSelection.map((element) => {
      return <p>{element.value}</p>;
    });
  }

  return (
    <>
      <div className={styles.wrapper}>
        <Listbox enableMultiselect={true} onSelectionChange={handleChange}>
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

        <h4>Current selection</h4>
        {renderSelection()}
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
};

export const Story1 = Template.bind({});
Story1.storyName = "Desktop";
Story1.args = {
  label: "banana",
};
Story1.argTypes = {
  className: { control: { disable: true } },
};

export const Story2 = Template.bind({});
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

export const Story3 = Template.bind({});
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

export const Story4 = Template.bind({});
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
