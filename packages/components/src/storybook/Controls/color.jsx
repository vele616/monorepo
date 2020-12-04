import mainStyle from "../../styles/main.module.scss";

const colors = Object.keys(mainStyle).filter((key) =>
  mainStyle[key].startsWith("#")
);

const ColorControl = {
  control: {
    type: "select",
    options: colors,
  },
};

export { ColorControl, colors };
