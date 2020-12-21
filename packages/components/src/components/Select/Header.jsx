import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import Typography from "../Typography";

const Header = ({ elementId, title }) => (
  <div className={styles.header}>
    <Typography
      id={`title-${elementId}`}
      fontSize={20}
      color="contrast"
      fontWeight={500}
    >
      {title}
    </Typography>
  </div>
);

Header.propTypes = {
  elementId: PropTypes.string,
  title: PropTypes.string,
};

Header.displayName = "Select.Header";
export default Header;
