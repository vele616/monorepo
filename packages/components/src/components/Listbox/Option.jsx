import React, { useCallback } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";
import Icon from "../Icon";

const Option = ({
  active = false,
  children,
  className,
  disabled = false,
  enableMultiselect = false,
  handleOptionClick,
  handleOptionFocus,
  handleOptionMouseEnter,
  id,
  index,
  selected = false,
  showCheckIcon = true,
  testId,
}) => {
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (handleOptionClick && !disabled) handleOptionClick(index);
    },
    [handleOptionClick, disabled, index]
  );

  const handleMouseEnter = useCallback(
    (e) => {
      e.stopPropagation();
      if (handleOptionMouseEnter && !disabled) handleOptionMouseEnter(index);
    },
    [handleOptionMouseEnter, disabled, index]
  );

  const handleFocus = useCallback(
    (e) => {
      e.stopPropagation();
      if (handleOptionFocus && !disabled) handleOptionFocus(index);
    },
    [handleOptionFocus, disabled, index]
  );

  return (
    <div
      aria-disabled={disabled}
      className={classnames(className, styles.listbox__option, {
        [styles.disabled]: disabled,
        [styles.listbox__option__selected]: selected,
        [styles.listbox__option__active]: active,
        [styles.listbox__option__selectedActive]:
          enableMultiselect && active && selected,
      })}
      id={id}
      data-testid={testId}
      role="option"
      aria-selected={selected}
      onClick={handleClick}
      onKeyPress={() => {}}
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      tabIndex={0}
    >
      {enableMultiselect && showCheckIcon && selected && (
        <Icon className={`${styles.listbox__icon}`} icon="checkbox-checked" />
      )}
      {enableMultiselect && showCheckIcon && !selected && (
        <Icon className={`${styles.listbox__icon}`} icon="checkbox-unchecked" />
      )}
      <span>{children}</span>
    </div>
  );
};

Option.propTypes = {
  /**
   * Indicator if this option is focused or hovered
   */
  active: PropTypes.bool,
  /**
   * Children can be string or components
   */
  children: PropTypes.node,
  /**
   * Additional classnames
   */
  className: PropTypes.string,
  /**
   * Indicator if this option is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If enabled it will show different color when multiple items are selected and hovered or focused
   */
  enableMultiselect: PropTypes.bool,
  /**
   *
   */
  handleOptionClick: PropTypes.func,
  /**
   *
   */
  handleOptionFocus: PropTypes.func,
  /**
   *
   */
  handleOptionMouseEnter: PropTypes.func,
  /**
   *
   */
  id: PropTypes.string,
  /**
   *
   */
  index: PropTypes.number,
  /**
   * Indicator if this option is selected
   */
  selected: PropTypes.bool,
  /**
   * If set to true, option will display check icon when selected.
   */
  showCheckIcon: PropTypes.bool,
  /**
   *
   */
  testId: PropTypes.string,
};

export default Option;
