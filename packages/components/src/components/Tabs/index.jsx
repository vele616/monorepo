import React, { useState, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";
import Tab from "./Tab";
import TabList from "./TabList";
import Panel from "./Panel";
import PanelList from "./PanelList";

const Tabs = ({
  animation = "enter",
  className,
  children,
  onTabChange,
  defaultTab,
  orientation = "horizontal",
  preventPanelUnmount,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultTab || 0);

  const handleOnTabClick = useCallback(
    (index) => {
      setSelectedIndex(index);
      if (onTabChange) onTabChange(index);
    },
    [onTabChange]
  );

  useEffect(() => {
    if (defaultTab) handleOnTabClick(defaultTab);
  }, [defaultTab, handleOnTabClick]);

  const elements = useMemo(() => {
    let childs = children;
    if (typeof children === "function") {
      const result = children(handleOnTabClick);
      if (result.props && result.props.children) {
        childs = result.props.children;
      }
    }

    return React.Children.map(childs, (child) => {
      switch (child.type.tabType) {
        case "TabList":
          return React.cloneElement(child, {
            onClick: handleOnTabClick,
            selectedIndex,
            orientation,
          });
        case "PanelList":
          return React.cloneElement(child, {
            preventPanelUnmount,
            selectedIndex,
            animation,
          });
        default:
          return child;
      }
    });
  }, [
    children,
    handleOnTabClick,
    selectedIndex,
    orientation,
    preventPanelUnmount,
    animation,
  ]);

  return (
    <div
      className={classnames(styles.tabs, className, {
        [styles.tabs__vertical]: orientation === "vertical",
      })}
    >
      {elements}
    </div>
  );
};

Tabs.Tab = Tab;
Tabs.TabList = TabList;
Tabs.Panel = Panel;
Tabs.PanelList = PanelList;

Tabs.propTypes = {
  /**
   * Animation that will be triggered each time content changes.
   */
  animation: PropTypes.oneOf(["none", "enter", "fastEnter"]),
  /**
   * Children of Tabs component. Children can also be a function if you want to access
   * onClick handler for each tab. Top children elements should be Tabs.TabList and Tabs.PanelList only.
   * TabList should contain only Tabs.Tab elements and Tab.PanelList should contain only Tabs.Panel elements.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * Additional classname for Tabs component.
   */
  className: PropTypes.string,
  /**
   * Index of default selected tab.
   */
  defaultTab: PropTypes.number,
  /**
   * Function that will trigger each time tab is changed.
   */
  onTabChange: PropTypes.func,
  /**
   * Orientation of tabs. Set horizontal to have tabs in line or vertical to have tabs
   * one below another.
   */
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  /**
   * Indicator if children will be rendered each time or they will be hidden and visible on demand. Defaults to false.
   * If set to true all panels will be rendered at once and will stay like that until tabs component is unmounted.
   * If set to false each panel will unmount when deselected.
   */
  preventPanelUnmount: PropTypes.bool,
};

export default Tabs;
