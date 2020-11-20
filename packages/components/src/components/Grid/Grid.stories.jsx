import React from "react";
import Grid from "./index";

export default {
  title: "Components/Grid",
  component: Grid,
};

export const Story1 = (args) => (
  <Grid
    {...args}
    columnGap="0px"
    rowGap="0"
    columns="80px 80px 100px"
    rows="40px 80px 50px 40px"
  >
    <div
      style={{
        gridColumn: "1 / span 3",
        background: "#3D4EDE",
        color: "white",
      }}
    >
      {" "}
      Navigation{" "}
    </div>
    <div
      style={{
        gridColumn: "1 / span 1",
        gridRow: "2 / span 2",
        background: "#424C6D",
        color: "white",
      }}
    >
      {" "}
      Side Menu{" "}
    </div>
    <div
      style={{
        gridColumn: "2 / span 2",
        gridRow: "2 / span 2",
        background: "#3C3843",
        color: "white",
      }}
    >
      {" "}
      Content{" "}
    </div>
    <div
      style={{
        gridColumn: "1 / span 3",
        gridRow: "4 / span 1",
        background: "#3D4EDE",
        color: "white",
      }}
    >
      {" "}
      Footer{" "}
    </div>
  </Grid>
);
Story1.storyName = "Basic usage";
Story1.args = {
  element: "div",
};
Story1.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
};

export const Story2 = (args) => (
  <Grid
    style={{ height: "90vh" }}
    {...args}
    columnGap="0px"
    rowGap="0"
    columns="20% 20% 60%"
    rows="40px 1fr 1fr 40px"
  >
    <div
      style={{
        gridColumn: "1 / span 3",
        background: "#3D4EDE",
        color: "white",
      }}
    >
      {" "}
      Navigation{" "}
    </div>
    <div
      style={{
        gridColumn: "1 / span 1",
        gridRow: "2 / span 2",
        background: "#424C6D",
        color: "white",
      }}
    >
      {" "}
      Side Menu{" "}
    </div>
    <div
      style={{
        gridColumn: "2 / span 2",
        gridRow: "2 / span 2",
        background: "#3C3843",
        color: "white",
      }}
    >
      {" "}
      Content{" "}
    </div>
    <div
      style={{
        gridColumn: "1 / span 3",
        gridRow: "4 / span 1",
        background: "#3D4EDE",
        color: "white",
      }}
    >
      {" "}
      Footer{" "}
    </div>
  </Grid>
);
Story2.storyName = "Relative measurements";
Story2.args = {};
Story2.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
};
