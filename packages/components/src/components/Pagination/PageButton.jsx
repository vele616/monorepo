import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./index.module.scss";

const PageButton = ({ onClick, value, icon }) => {
  const handleOnClick = useCallback(() => {
    if (onClick) onClick(value);
  }, [onClick, value]);

  return (
    <Button className={styles.pagination__button} onClick={handleOnClick}>
      {value || <Icon icon={icon} />}
    </Button>
  );
};

PageButton.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.number,
  icon: PropTypes.string,
};

export default PageButton;
