import React, { useCallback, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";

const Tab = ({
  className,
  children,
  onClick,
  index,
  selected,
  onTabSelect,
}) => {
  const buttonRef = useRef();

  const handleTabSelect = useCallback(() => {
    if (onTabSelect && selected) {
      try {
        const {
          left,
          width,
          bottom,
        } = buttonRef.current.getBoundingClientRect();
        onTabSelect({ left, width, bottom });
      } catch (e) {
        onTabSelect({ left: 0, width: 0, bottom: 0 });
      }
    }
  }, [onTabSelect, selected]);

  useEffect(() => {
    window.addEventListener("resize", handleTabSelect);
    return () => window.removeEventListener("resize", handleTabSelect);
  }, [handleTabSelect]);

  const handleOnClick = useCallback(() => {
    if (onClick) onClick(index);
    handleTabSelect();
  }, [onClick, index, handleTabSelect]);

  useEffect(() => {
    if (selected) handleTabSelect();
  }, [selected, handleTabSelect]);

  return (
    <button
      aria-selected={selected}
      ref={buttonRef}
      className={classnames(styles.tabs__tabList__tab, className, {
        [styles.selected]: selected,
      })}
      role="tab"
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};

Tab.tabType = "Tab";
Tab.propTypes = {
  /**
   * Children of Tab component. This is usually string.
   */
  children: PropTypes.node,
  /**
   * Additional classname for Tab component.
   */
  className: PropTypes.string,
  /**
   * Index of this tab.
   */
  index: PropTypes.number,
  /**
   * Function that will trigger when tab is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Function that will trigger when tab is selected.
   */
  onTabSelect: PropTypes.func,
  /**
   * Indicator if this Tab is currently selected. Only one tab can be selected at the time.
   */
  selected: PropTypes.bool,
};

export default Tab;
