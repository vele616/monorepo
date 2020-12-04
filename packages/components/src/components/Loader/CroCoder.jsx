import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import { colors } from "../../storybook/Controls/color";

const CroCoder = ({ size, color }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 105 83"
    className={styles[color]}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={styles.letterC}
      d="M52.5 15C37.8645 15 26 26.8645 26 41.5C26 56.1355 37.8645 68 52.5 68C61.3481 68 69.1835 63.6636 73.9966 57L86 65.9997C78.4491 76.3069 66.2562 83 52.5 83C29.5802 83 11 64.4198 11 41.5C11 18.5802 29.5802 0 52.5 0C66.9125 0 79.6091 7.34697 87.0488 18.5L73.9966 26C69.1835 19.3364 61.3481 15 52.5 15Z"
    />
    <path d="M0 37L15.3636 24V50L0 37Z" className={styles.triangle__first} />
    <path
      className={styles.triangle__second}
      d="M6.53539 61.773L11.2378 43.9998L24.3086 66.4754L6.53539 61.773Z"
    />
    <path
      className={styles.triangle__third}
      d="M19.7734 81.3455L18.5721 63L38.1189 80.1442L19.7734 81.3455Z"
    />
  </svg>
);

CroCoder.propTypes = {
  color: PropTypes.oneOf(colors),
  size: PropTypes.number,
};

export default CroCoder;
