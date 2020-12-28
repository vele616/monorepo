import React, { useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./index.module.scss";

const PageButton = ({ onClick, value, icon, onSelected, selected }) => {
  const buttonWrapperRef = useRef();

  const handleOnClick = useCallback(() => {
    if (onClick) onClick(value);
  }, [onClick, value]);

  useEffect(() => {
    if (onSelected && selected) {
      try {
        const { width } = buttonWrapperRef.current.getBoundingClientRect();
        onSelected(width);
      } catch (e) {
        onSelected(0);
      }
    }
  }, [onSelected, selected]);

  return (
    <div className={styles.pagination__buttonWrapper} ref={buttonWrapperRef}>
      <Button
        variant="sneaky"
        className={classnames(styles.pagination__button, {
          [styles.pagination__button__selected]: selected,
        })}
        onClick={handleOnClick}
      >
        {value || <Icon icon={icon} />}
      </Button>
    </div>
  );
};

PageButton.propTypes = {
  /**
   * Function that triggers each time this page is selected.
   * Function returns width of this element to the parent to it can set
   * green underline properly.
   */
  onSelected: PropTypes.func,
  /**
   * Indicator wheather this page is currently selected.
   * Only one page can be selected at the time.
   */
  selected: PropTypes.bool,
  /**
   * Function that triggers each time this page button is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Page number.
   */
  value: PropTypes.number,
  /**
   * If icon argument is set, this button will show Icon instead of page number.
   * Unset 'value' argument to set Icon.
   */
  icon: PropTypes.string,
};

export default PageButton;
