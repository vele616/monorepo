import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import Icon from "../../components/Icon";

const Keys = Object.freeze({
  ArrowUp: 38,
  ArrowDown: 40,
  Space: 32,
  Enter: 13,
  End: 35,
  Home: 36,
});

const Listbox = ({
  id,
  testId,
  className,
  type,
  children,
  enableTypeAhead = true,
  enableMultiselect,
  enableSelectFocusedItem,
  disabled,
  color,
  title,
  style,
  value,
  onItemSelect,
  onItemUnselect,
  onSelectionChange,
  showCheckIcon = true,
}) => {
  const getTextValue = useCallback((item) => {
    const childrenOfItem = item?.props?.children;
    if (
      childrenOfItem === undefined ||
      childrenOfItem === null ||
      childrenOfItem === ""
    )
      return "";
    if (typeof childrenOfItem === "string") {
      return childrenOfItem;
    }
    if (React.isValidElement(childrenOfItem)) {
      return getTextValue(childrenOfItem);
    }
  }, []);

  const childrenArray = useCallback(
    (children) => {
      return (
        (Array.isArray(children) && children) || (children && [children]) || []
      );
    },
    [children]
  );

  const [selectedItems, setSelectedItems] = useState(() => {
    return childrenArray(children).map(() => false);
  });

  const [itemTextValues] = useState(() => {
    return childrenArray(children).map((child) => getTextValue(child));
  });

  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [typeAheadValue, setTypeAheadValue] = useState();

  const typingFast = useRef(false);
  const typingFastTimeoutId = useRef(0);
  const typingFastTimeoutValue = 200;

  const listboxRef = useRef();

  const focusNext = useCallback(() => {
    const nextIndex =
      focusedIndex >= itemTextValues.length - 1 ? 0 : focusedIndex + 1;
    manualFocus(nextIndex);
  }, [focusedIndex]);

  const focusPrevious = useCallback(() => {
    const nextIndex =
      focusedIndex <= 0 ? itemTextValues.length - 1 : focusedIndex - 1;
    manualFocus(nextIndex);
  }, [focusedIndex]);

  const focusFirst = useCallback(() => {
    manualFocus(0);
  }, [focusedIndex]);

  const focusLast = useCallback(() => {
    manualFocus(itemTextValues.length - 1);
  }, [focusedIndex]);

  const handleItemClick = useCallback(
    (index) => {
      selectItem(index);
      setFocusedIndex(index);
      setTypeAheadValue(undefined);
    },
    [selectedItems]
  );

  const handleItemMouseEnter = useCallback(
    (index) => {
      if (!enableSelectFocusedItem) manualFocus(index);
    },
    [enableSelectFocusedItem]
  );

  const fireOnSelectedEvents = useCallback(
    (index, newItems) => {
      if (!newItems || newItems[index] === undefined) return;

      if (onSelectionChange) {
        const selection = newItems.reduce((array, selected, index) => {
          if (selected)
            return [...array, { index, value: itemTextValues[index] }];
          return array;
        }, []);
        onSelectionChange(selection);
      }

      newItems[index]
        ? onItemSelect &&
          onItemSelect({
            index,
            value: itemTextValues[index],
          })
        : onItemUnselect &&
          onItemUnselect({
            index,
            value: itemTextValues[index],
          });
    },
    [onItemSelect, onItemUnselect, onSelectionChange, selectedItems]
  );

  const selectItem = useCallback(
    (index) => {
      if (selectedItems[index] === undefined) return;

      const newItems = enableMultiselect
        ? [...selectedItems]
        : selectedItems.map(() => false);

      newItems[index] = !newItems[index];

      setSelectedItems(newItems);
      fireOnSelectedEvents(index, newItems);
    },
    [selectedItems, enableMultiselect]
  );

  const manualFocus = useCallback(
    (index) => {
      setFocusedIndex(index);
      setTypeAheadValue(undefined);

      if (enableSelectFocusedItem) {
        selectItem(index);
      }
    },
    [enableSelectFocusedItem]
  );

  const typeAheadGenerator = useMemo(() => {
    let elements = [];
    let current = 0;

    function next() {
      return elements[current++ % elements.length];
    }

    function first() {
      current = 0;
      return elements[current++];
    }

    function filterIndexes(char) {
      elements = itemTextValues.reduce((previousValue, currentValue, index) => {
        if (currentValue && currentValue.toLowerCase().startsWith(char)) {
          return [...previousValue, index];
        }
        return previousValue;
      }, []);
      return first();
    }

    return {
      next,
      first,
      filterIndexes,
    };
  }, [itemTextValues]);

  const typeAhead = useCallback(
    (key) => {
      clearTimeout(typingFastTimeoutId.current);

      if (typingFast.current && key !== typeAheadValue) {
        key = typeAheadValue + key;
      }

      const index =
        key === typeAheadValue
          ? typeAheadGenerator.next()
          : typeAheadGenerator.filterIndexes(key);

      if (index >= 0) {
        setFocusedIndex(index);
        if (enableSelectFocusedItem) {
          selectItem(index);
        }
      }

      setTypeAheadValue(key.toLowerCase());

      typingFast.current = true;

      typingFastTimeoutId.current = setTimeout(() => {
        typingFast.current = false;
      }, typingFastTimeoutValue);
    },
    [typeAheadValue, enableSelectFocusedItem, itemTextValues]
  );

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
          handleItemClick(focusedIndex);
          break;
        case Keys.Enter:
          handleItemClick(focusedIndex);
          break;
        case Keys.Home:
          focusFirst();
          break;
        case Keys.End:
          focusLast();
          break;
        default: {
          if (enableTypeAhead) typeAhead(event.key);
          break;
        }
      }
    },
    [focusedIndex, typeAheadValue, typeAheadGenerator, enableTypeAhead]
  );

  const renderChildren = useCallback(() => {
    return React.Children.map(children, (child, index) => {
      const active = index === focusedIndex;
      const selected = selectedItems[index];

      return React.cloneElement(child, {
        handleItemClick,
        handleItemMouseEnter,
        index,
        active,
        selected,
        showCheckIcon,
      });
    });
  }, [focusedIndex, selectedItems]);

  const handleMouseEnter = useCallback(() => {
    if (listboxRef.current) listboxRef.current.focus();
  }, []);

  const handleMouseLeave = useCallback(() => {
    manualFocus(-1);
  }, []);

  return (
    <div
      ref={listboxRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
  showCheckIcon,
}) => {
  return (
    <div
      className={`${className} ${styles.listbox__item}
        ${selected && styles.listbox__item__selected}
        ${active && styles.listbox__item__active}
        ${styles.listbox__item__unselectableText}`}
      onClick={() => handleItemClick(index)}
      onMouseEnter={() => handleItemMouseEnter(index)}
    >
      {showCheckIcon && selected && (
        <Icon className={`${styles.listbox__icon}`} icon="check" />
      )}
      <span>{children}</span>
    </div>
  );
};

Listbox.propTypes = {
  enableMultiselect: PropTypes.bool,
  enableSelectFocusedItem: PropTypes.bool,
  enableTypeAhead: PropTypes.bool,
  showCheckIcon: PropTypes.bool,
};

export default Listbox;
