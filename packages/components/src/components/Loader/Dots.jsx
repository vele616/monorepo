import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import { colors } from "../../storybook/Controls/color";

const Dots = ({ size, color }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 75 15"
    fill="none"
    className={styles[color]}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle className={styles.dot__first} cx="67.5" cy="7.5" r="7.5" />
    <circle className={styles.dot__second} cx="37.5" cy="7.5" r="7.5" />
    <circle className={styles.dot__third} cx="7.5" cy="7.5" r="7.5" />
  </svg>
);

Dots.propTypes = {
  color: PropTypes.oneOf(colors),
  size: PropTypes.number,
};

export default Dots;
