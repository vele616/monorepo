import React, { useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";
import Icon from "../Icon";

const Option = ({
  active = false,
  children,
  className,
  disabled = false,
  enableMultiselect,
  handleOptionClick,
  handleOptionMouseMove,
  id,
  index,
  selected = false,
  showCheckIcon = true,
  testId,
}) => {
  const optionRef = useRef();

  useEffect(() => {
    if (active && optionRef.current) {
      optionRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [active]);

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (handleOptionClick && !disabled) handleOptionClick(index);
    },
    [handleOptionClick, disabled, index]
  );

  const handleMouseMove = useCallback(
    (e) => {
      e.stopPropagation();
      if (handleOptionMouseMove && !disabled) handleOptionMouseMove(index);
    },
    [handleOptionMouseMove, disabled, index]
  );

  return (
    <div
      aria-disabled={disabled}
      className={classnames(className, styles.listbox__option, {
        [styles.disabled]: disabled,
        [styles.listbox__option__selected]: selected,
        [styles.listbox__option__active]: active,
        [styles.listbox__option__selectedActive]: active && selected,
      })}
      id={id || `lb-option-${index}`}
      ref={optionRef}
      data-testid={testId}
      role="option"
      aria-selected={selected}
      onClick={handleClick}
      onKeyPress={() => {}}
      onMouseMove={handleMouseMove}
      tabIndex={-1}
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
   *
   */
  handleOptionClick: PropTypes.func,
  /**
   *
   */
  handleOptionMouseMove: PropTypes.func,
  /**
   *
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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

  enableMultiselect: PropTypes.bool,
};

export default Option;
