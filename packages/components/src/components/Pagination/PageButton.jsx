import React, { useCallback } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./index.module.scss";

const PageButton = ({ onClick, value, icon, active }) => {
  const handleOnClick = useCallback(() => {
    if (onClick) onClick(value);
  }, [onClick, value]);

  return (
    <Button
      className={classnames(styles.pagination__button, {
        [styles.active]: active,
      })}
      onClick={handleOnClick}
    >
      {value || <Icon icon={icon} />}
    </Button>
  );
};

PageButton.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.number,
  icon: PropTypes.string,
  active: PropTypes.bool,
};

export default PageButton;
