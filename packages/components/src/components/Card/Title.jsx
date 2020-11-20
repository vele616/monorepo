import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import Typography from "../Typography";

/**
 * Wraps content into a Typography component and applies the default
 * styling for a Card title.
 */
const Title = ({ children, ...props }) => (
  <Typography
    {...props}
    className={styles.title}
    element="h4"
    fontWeight={700}
    color="gray_2"
  >
    {children}
  </Typography>
);

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
