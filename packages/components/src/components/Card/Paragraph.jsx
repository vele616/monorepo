import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import Typography from "../Typography";

/**
 * Wraps content into a Typography component and applies the default
 * styling for a Card paragraph.
 */
const Paragraph = ({ children, ...props }) => (
  <Typography
    {...props}
    className={styles.paragraph}
    element="div"
    fontSize={18}
    fontWeight={500}
    color="gray_11"
  >
    {children}
  </Typography>
);

Paragraph.propTypes = {
  children: PropTypes.node,
};

export default Paragraph;
