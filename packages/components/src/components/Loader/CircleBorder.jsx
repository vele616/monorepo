import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import { colors } from "../__controls/color";

const CircleBorder = ({ size, color, thickness }) => {
  return (
    <svg
      width={size}
      height={size}
      className={styles[color]}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        strokeWidth={thickness}
        cx="50"
        cy="50"
        r="40"
        className={styles.border}
      />
      <circle
        strokeWidth={thickness}
        cx="50"
        cy="50"
        r="40"
        className={styles.border__contrast}
      />
    </svg>
  );
};

CircleBorder.propTypes = {
  color: PropTypes.oneOf(colors),
  size: PropTypes.number,
  thickness: PropTypes.number,
};

CircleBorder.defaultProps = {
  thickness: 10,
};

export default CircleBorder;
