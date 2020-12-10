import React, { useCallback, useMemo, useState, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";
import Underline from "./Underline";

const Keys = Object.freeze({
  ArrowUp: 38,
  ArrowDown: 40,
  ArrowLeft: 37,
  ArrowRight: 39,
  Space: 32,
  Enter: 13,
  End: 35,
  Home: 36,
  Tab: 9,
});

const TabList = ({
  className,
  children,
  onClick,
  orientation,
  underlineType = "line",
  selectedIndex,
}) => {
  const [underlineLeft, setUnderlineLeft] = useState(0);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [underlineTop, setUnderlineTop] = useState();

  const tabCount = useMemo(
    () =>
      React.Children.map(children, (child) => child.type.tabType === "Tab")
        .length,
    [children]
  );

  const tabListRef = useRef();

  const handleTabSelect = useCallback(
    ({ left, width, bottom }) => {
      const tabListRect = tabListRef.current.getBoundingClientRect();

      if (orientation === "horizontal") {
        setUnderlineLeft(left - tabListRect.left);
        setUnderlineTop(0);
        setUnderlineWidth(width);
      } else if (orientation === "vertical") {
        setUnderlineLeft(left - tabListRect.left);
        setUnderlineTop(bottom - tabListRect.top);
        setUnderlineWidth(width);
      }
    },
    [orientation]
  );

  const selectNext = useCallback(() => {
    onClick((selectedIndex + 1) % tabCount);
  }, [onClick, selectedIndex, tabCount]);

  const selectPrevious = useCallback(() => {
    onClick((selectedIndex - 1 + tabCount) % tabCount);
  }, [onClick, selectedIndex, tabCount]);

  const selectFirst = useCallback(() => {
    onClick(0);
  }, [onClick]);

  const selectLast = useCallback(() => {
    onClick(tabCount - 1);
  }, [onClick, tabCount]);

  const handleKeyDown = useCallback(
    (event) => {
      switch (event.keyCode) {
        case Keys.ArrowLeft:
          selectPrevious();
          break;
        case Keys.ArrowRight:
          selectNext();
          break;
        case Keys.Home:
          selectFirst();
          break;
        case Keys.End:
          selectLast();
          break;
        default:
          break;
      }
    },
    [selectFirst, selectLast, selectNext, selectPrevious]
  );

  const tabs = useMemo(() => {
    return React.Children.map(children, (child, index) => {
      switch (child.type.tabType) {
        case "Tab":
          return React.cloneElement(child, {
            onClick,
            onTabSelect: handleTabSelect,
            index,
            selected: selectedIndex === index,
          });
        default:
          return child;
      }
    });
  }, [selectedIndex, children, handleTabSelect, onClick]);

  return (
    <div
      aria-label="tablist"
      aria-orientation={orientation}
      className={classnames(styles.tabs__tabList, className, {
        [styles.tabs__tabList__vertical]: orientation === "vertical",
      })}
      onKeyDownCapture={handleKeyDown}
      ref={tabListRef}
      role="tablist"
    >
      {tabs}
      <Underline
        type={underlineType}
        width={underlineWidth}
        left={underlineLeft}
        top={underlineTop}
        orientation={orientation}
      />
    </div>
  );
};

TabList.tabType = "TabList";

TabList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  underlineType: PropTypes.oneOf(["line"]),
  selectedIndex: PropTypes.number,
};

export default TabList;
