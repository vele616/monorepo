import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";

/**
 *  Basic tag component
 */
const Tag = ({ className, children, title, color, textAlign, ...other }) => {
  let compositeClassName = `${styles.tag} ${className} ${styles[textAlign]}`;
  if (color) {
    compositeClassName += ` ${styles[`color${color}`]}`;
  }
  return (
    <span {...other} title={title} className={compositeClassName}>
      {children}
    </span>
  );
};

Tag.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "primary",
    "primary_light",
    "secondary",
    "secondary_light",
    "contrast",
    "positive",
    "positive_contrast",
    "negative_contrast",
    "negative",
    "background_light",
    "background_dark",
    "background_base",
    "text_1",
    "text_2",
    "text_3",
    "text_4",
    "text_base",
    "blue_1",
    "blue_2",
    "blue_3",
    "blue_4",
    "blue_5",
    "blue_6",
    "gray_1",
    "gray_2",
    "gray_3",
    "gray_4",
    "gray_5",
    "gray_6",
    "gray_7",
    "gray_8",
    "gray_9",
    "gray_10",
    "gray_11",
    "gray_12",
    "green_1",
    "green_2",
    "green_4",
    "green_5",
    "orange_1",
    "orange_2",
    "orange_3",
    "orange_4",
    "red_1",
    "red_2",
    "red_3",
    "red_4",
    "red_5",
    "white",
    "yellow_1",
    "yellow_2",
    "yellow_3",
    "yellow_4",
    "yellow_5",
  ]),
  title: PropTypes.string,
  textAlign: PropTypes.oneOf(["left", "center", "right"]),
};

Tag.defaultProps = {
  children: undefined,
  fontSize: "inherit",
  color: "yellow_4",
};

export default Tag;
