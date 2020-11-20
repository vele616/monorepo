import React, { useMemo, useState } from "react";
import Grid from "../../components/Grid";
import Typography from "../../components/Typography";
import Button from "../../components/Button";
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
};

const Template = () => {
  const [options, setOptions] = useState(["Ananas", "Banana", "Avocado"]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  function push() {
    setOptions((prev) => [
      ...prev,
      `Orange ${Math.random().toString().slice(3, 6)}`,
    ]);
  }

  function pop() {
    const newOptions = [...options];
    newOptions.pop();
    setOptions(newOptions);
  }

  const renderdOptions = useMemo(() => {
    return options.map((e) => <Listbox.Option key={e}>{e}</Listbox.Option>);
  }, [options]);

  function handleChange(opts) {
    setSelectedOptions(
      opts.map((opt) => (
        <Listbox.Option
          key={opt.value}
        >{`${opt.value} ${opt.index}`}</Listbox.Option>
      ))
    );
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.inner_wrapper}>
          <Listbox
            className={styles.listbox}
            enableMultiselect
            onChange={handleChange}
          >
            {renderdOptions}
          </Listbox>
          <button type="button" onClick={push}>
            Push
          </button>
          <button type="button" onClick={pop}>
            Pop
          </button>
          <Listbox className={styles.listbox}>{selectedOptions}</Listbox>
        </div>
      </div>
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
