/* eslint-disable no-plusplus */
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";

const PanelList = ({
  className,
  children,
  selectedIndex,
  dynamic,
  animation = "enter",
}) => {
  const classAnimation = useMemo(() => {
    return (
      (animation === "enter" && styles.enter) ||
      (animation === "fastEnter" && styles.fastEnter)
    );
  }, [animation]);

  const singlePanel = useMemo(() => {
    return (
      <div
        key={classAnimation ? selectedIndex : null}
        className={classnames(
          styles.tabs__panelList,
          className,
          classAnimation
        )}
      >
        {children[selectedIndex]}
      </div>
    );
  }, [children, classAnimation, className, selectedIndex]);

  const allPanels = useMemo(() => {
    return (
      <div
        className={classnames(
          styles.tabs__panelList,
          className,
          classAnimation
        )}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { hidden: selectedIndex !== index });
        })}
      </div>
    );
  }, [children, classAnimation, className, selectedIndex]);

  return dynamic ? allPanels : singlePanel;
};

PanelList.tabType = "PanelList";

PanelList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  selectedIndex: PropTypes.number,
  dynamic: PropTypes.bool,
  animation: PropTypes.oneOf(["none", "enter", "fastEnter"]),
};

export default PanelList;
