import React, { useState, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";
import Tab from "./Tab";
import TabList from "./TabList";
import Panel from "./Panel";
import PanelList from "./PanelList";

const Tabs = ({
  className,
  children,
  onTabChange,
  defaultTab,
  orientation = "horizontal",
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
            selectedIndex,
          });
        default:
          return child;
      }
    });
  }, [children, handleOnTabClick, selectedIndex, orientation]);

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
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onTabChange: PropTypes.func,
  defaultTab: PropTypes.number,
};

export default Tabs;
