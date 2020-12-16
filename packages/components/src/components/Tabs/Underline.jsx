import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";

const Underline = ({ width, left, top, className, orientation }) => {
  return (
    <div
      className={classnames(styles.underline, className, {
        [styles.vertical]: orientation === "vertical",
      })}
    >
      <div
        className={styles.underline__selected}
        style={{
          left: `${left}px`,
          width: `${width}px`,
          top: `${top}px`,
        }}
      />
    </div>
  );
};

Underline.propTypes = {
  width: PropTypes.number,
  left: PropTypes.number,
  top: PropTypes.number,
  className: PropTypes.string,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
};

export default Underline;
