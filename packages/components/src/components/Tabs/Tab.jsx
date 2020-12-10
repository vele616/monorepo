import React, { useCallback, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";
import Typography from "../Typography";

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
    if (onTabSelect) {
      const {
        x,
        y,
        width,
        height,
        top,
        bottom,
        left,
      } = buttonRef.current.getBoundingClientRect();
      onTabSelect({ x, y, width, height, top, bottom, left });
    }
  }, [onTabSelect]);

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
      <Typography
        element="div"
        fontSize={18}
        fontFamily="rubik"
        className={styles.tabText}
      >
        {children}
      </Typography>
    </button>
  );
};

Tab.tabType = "Tab";
Tab.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onTabSelect: PropTypes.func,
};

export default Tab;
