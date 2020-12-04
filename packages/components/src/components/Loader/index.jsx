import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";
import CroCoder from "./CroCoder";
import Dots from "./Dots";
import CircleBorder from "./CircleBorder";
import { colors } from "../__controls/color";

/**
 *
 */
const Loader = ({
  centerParent,
  centerScreen,
  type,
  color,
  size,
  ...other
}) => {
  let Component = CroCoder;

  if (type === "default") {
    Component = CroCoder;
  }
  if (type === "dots") {
    Component = Dots;
  }
  if (type === "circleBorder") {
    Component = CircleBorder;
  }
  return (
    <div
      className={classnames(styles.default, {
        [styles.centerParent]: centerParent,
        [styles.centerScreen]: centerScreen,
      })}
    >
      <Component color={color} size={size} {...other} />
    </div>
  );
};

Loader.propTypes = {
  /**
   * Available Loader types - correspond to the HTML Loader type attribute values.
   */
  type: PropTypes.oneOf(["default", "dots", "circleBorder"]),

  size: PropTypes.number,

  /**
   * If set to true, the element will be positioned centered in regard to it's
   * parent.
   */
  centerParent: PropTypes.bool,

  /**
   * If set to true, the element will be centered in regard to the screen.
   */
  centerScreen: PropTypes.bool,

  color: PropTypes.oneOf(colors),
};

Loader.defaultProps = {
  type: "default",
  color: "primary",
  size: 100,
};

export default Loader;
