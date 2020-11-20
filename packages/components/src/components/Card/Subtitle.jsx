import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import Typography from "../Typography";

/**
 * Wraps content into a Typography component and applies the default
 * styling for a Card subtitle.
 */
const Subtitle = ({ children, ...props }) => (
  <Typography
    {...props}
    className={styles.subtitle}
    element="div"
    fontSize={16}
    fontFamily="rubik"
    fontWeight={300}
    color="gray_2"
  >
    {children}
  </Typography>
);

Subtitle.propTypes = {
  children: PropTypes.node,
};

export default Subtitle;
