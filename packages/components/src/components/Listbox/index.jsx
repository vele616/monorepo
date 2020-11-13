import React, { useState, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";

const Keys = Object.freeze({
  ArrowUp: 38,
  ArrowDown: 40,
  Space: 32,
  Enter: 13,
});

const Listbox = ({
  id,
  testId,
  className,
  type,
  children,
  disabled,
  color,
  onClick,
  title,
  style,
  value,
  size,
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const listboxRef = useRef();
  const itemsCount = children.length;

  useEffect(() => {}, []);

  const focusNext = useCallback(() => {
    const nextIndex = activeIndex >= itemsCount - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }, [activeIndex]);

  const focusPrevious = useCallback(() => {
    const nextIndex = activeIndex <= 0 ? itemsCount - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }, [activeIndex]);

  // Jel ovaj handle okej?
  const handleItemClick = useCallback((index) => {
    const currentIndex = selectedIndexes.findIndex((e) => e === index);
    if (currentIndex === -1) {
      setSelectedIndexes((arr) => [...arr, index]);
    } else {
      const newIndexes = [...selectedIndexes];
      newIndexes.splice(currentIndex, 1);
      setSelectedIndexes(newIndexes);
    }
  });

  const handleItemMouseEnter = useCallback((index) => {
    setActiveIndex(index); //
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      switch (event.keyCode) {
        case Keys.ArrowUp:
          focusPrevious();
          break;
        case Keys.ArrowDown:
          focusNext();
          break;
        case Keys.Space:
          handleItemClick(activeIndex);
          break;
        case Keys.Enter:
          handleItemClick(activeIndex);
          break;
      }
    },
    [activeIndex, selectedIndexes]
  );

  const renderChildren = useCallback(() => {
    return React.Children.map(children, (child, index) => {
      const active = index === activeIndex;
      const selected = selectedIndexes.includes(index);
      return React.cloneElement(child, {
        handleItemClick,
        handleItemMouseEnter,
        index,
        active,
        selected,
      });
    });
  }, [activeIndex, selectedIndexes]);

  const handleMouseEnter = useCallback(() => {
    if (listboxRef.current) listboxRef.current.focus();
  }, []);

  return (
    <div
      ref={listboxRef}
      onMouseEnter={handleMouseEnter}
      className={styles.listbox}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {renderChildren()}
    </div>
  );
};

Listbox.Item = ({
  className,
  type,
  children,
  disabled,
  color,
  onClick,
  title,
  style,
  variant,
  handleItemClick,
  index,
  active,
  selected,
  handleItemMouseEnter,
}) => {
  return (
    <div
      className={`${styles.listbox__item}
        ${selected && styles.listbox__item__selected}
        ${active && styles.listbox__item__active}`}
      onClick={() => handleItemClick(index)}
      onMouseEnter={() => handleItemMouseEnter(index)}
    >
      {`${children} - ${index} - ${active} - ${selected}`}
    </div>
  );
};

Listbox.propTypes = {};

export default Listbox;
