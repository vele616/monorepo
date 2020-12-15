import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";
import Option from "./Option";
import useTypeAhead from "../../hooks/useTypeAhead";

const Keys = Object.freeze({
  ArrowUp: 38,
  ArrowDown: 40,
  Space: 32,
  Enter: 13,
  End: 35,
  Home: 36,
  Tab: 9,
});

const Listbox = ({
  ariaLabel = "listbox",
  ariaLabelledby,
  children,
  className,
  disabled = false,
  defaultSelected = [],
  enableMultiselect = false,
  enableTypeAhead = true,
  id,
  onChange,
  onOptionSelect,
  onOptionUnselect,
  orientation = "vertical",
  forwardRef,
  showCheckIcon = true,
  testId,
}) => {
  const validChildren = useMemo(() => {
    return React.Children.map(children || [], (child) => {
      if (React.isValidElement(child)) {
        if (!child.props.disabled) {
          return child;
        }
      } else {
        console.warn(
          `Trying to render invalid element.
        Listbox options should be of type Listbox.Option.
        You rendered:`,
          child
        );
      }
      return undefined;
    });
  }, [children]);

  const optionIds = useMemo(() => {
    return validChildren.map((child, index) => {
      if (child.props.id !== null && child.props.id !== undefined) {
        return child.props.id;
      }
      return `lb-option-${index}`;
    });
  }, [validChildren]);

  const [selectedOptions, setSelectedOptions] = useState(() => {
    return optionIds.map((optionId) => {
      if (!optionIds.includes(optionId)) {
        console.warn(
          `Option with ID ${optionId} does not exists in options list.`
        );
      }
      if (enableMultiselect) {
        return defaultSelected.includes(optionId);
      }
      if (typeof defaultSelected === "string") {
        return defaultSelected === optionId;
      }
      return defaultSelected[0] === optionId;
    });
  });

  const getTextValue = useCallback((option) => {
    if (option && option.props && option.props.value) {
      return option.props.value;
    }

    const childrenOfOption = option.props.children;
    if (
      childrenOfOption === undefined ||
      childrenOfOption === null ||
      childrenOfOption === ""
    )
      return "";
    if (typeof childrenOfOption === "string") {
      return childrenOfOption;
    }
    if (React.isValidElement(childrenOfOption)) {
      return getTextValue(childrenOfOption);
    }
    return "";
  }, []);

  const optionValues = useMemo(() => {
    return validChildren.map((child) => getTextValue(child));
  }, [getTextValue, validChildren]);

  const [focusedIndex, setFocusedIndex] = useState(-1);
  const listboxRef = useRef();
  const typeAhead = useTypeAhead(optionValues);

  useEffect(() => {
    if (!enableMultiselect) {
      setSelectedOptions((prev) => {
        const newSelectedOptions = prev.map(() => false);
        const selectedIndex = prev.findIndex((option) => option === true);
        if (selectedIndex >= 0) {
          newSelectedOptions[selectedIndex] = true;
        }
        return newSelectedOptions;
      });
    }
  }, [enableMultiselect]);

  const fireOnSelectedEvents = useCallback(
    (newOptionIndex, newOptions) => {
      if (!newOptions || newOptions[newOptionIndex] === undefined) return;

      if (onChange) {
        const selection = newOptions.reduce((array, selected, index) => {
          if (selected)
            return [
              ...array,
              { index, value: optionValues[index], id: optionIds[index] },
            ];
          return array;
        }, []);
        onChange(selection);
      }

      const newOption = {
        index: newOptionIndex,
        value: optionValues[newOptionIndex],
        id: optionIds[newOptionIndex],
      };

      if (newOptions[newOptionIndex]) {
        if (onOptionSelect) {
          onOptionSelect(newOption);
        }
      } else if (onOptionUnselect) {
        onOptionUnselect(newOption);
      }
    },
    [onChange, onOptionSelect, onOptionUnselect, optionIds, optionValues]
  );

  const selectOption = useCallback(
    (index) => {
      if (selectedOptions[index] === undefined) return;

      const newOptions = enableMultiselect
        ? [...selectedOptions]
        : selectedOptions.map(() => false);

      newOptions[index] = !newOptions[index];

      setSelectedOptions(newOptions);
      fireOnSelectedEvents(index, newOptions);
    },
    [selectedOptions, enableMultiselect, fireOnSelectedEvents]
  );

  const manualFocus = useCallback(
    (index) => {
      setFocusedIndex(index);
      typeAhead.clear();
    },
    [typeAhead]
  );

  const focusNext = useCallback(() => {
    const nextIndex =
      focusedIndex >= optionValues.length - 1 ? 0 : focusedIndex + 1;
    manualFocus(nextIndex);
  }, [focusedIndex, optionValues.length, manualFocus]);

  const focusPrevious = useCallback(() => {
    const nextIndex =
      focusedIndex <= 0 ? optionValues.length - 1 : focusedIndex - 1;
    manualFocus(nextIndex);
  }, [focusedIndex, optionValues.length, manualFocus]);

  const focusFirst = useCallback(() => {
    manualFocus(0);
  }, [manualFocus]);

  const focusLast = useCallback(() => {
    manualFocus(optionValues.length - 1);
  }, [optionValues.length, manualFocus]);

  const handleOptionClick = useCallback(
    (index) => {
      selectOption(index);
      setFocusedIndex(index);
    },
    [selectOption]
  );

  const handleOptionMouseMove = useCallback(
    (index) => {
      manualFocus(index);
    },
    [manualFocus]
  );

  const setNextTypeAheadIndex = useCallback(
    (key) => {
      const index = typeAhead.next(key);
      if (index !== undefined && index !== -1) setFocusedIndex(index);
    },
    [typeAhead]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.keyCode === Keys.ArrowDown || event.keyCode === Keys.ArrowUp) {
        event.preventDefault();
      }

      switch (event.keyCode) {
        case Keys.ArrowUp:
          focusPrevious();
          break;
        case Keys.ArrowDown:
          focusNext();
          break;
        case Keys.Enter:
          handleOptionClick(focusedIndex);
          break;
        case Keys.Home:
          focusFirst();
          break;
        case Keys.End:
          focusLast();
          break;
        default: {
          if (enableTypeAhead) setNextTypeAheadIndex(event.key);
          break;
        }
      }
    },
    [
      enableTypeAhead,
      focusFirst,
      focusLast,
      focusNext,
      focusPrevious,
      focusedIndex,
      handleOptionClick,
      setNextTypeAheadIndex,
    ]
  );

  const handleMouseEnter = useCallback(() => {
    if (listboxRef.current) listboxRef.current.focus();
  }, []);

  const handleOnFocus = useCallback(() => {
    const index = selectedOptions.findIndex((e) => e === true);

    if (focusedIndex < -1 || index < 0) {
      setFocusedIndex(0);
    } else {
      setFocusedIndex(index);
    }
  }, [selectedOptions, focusedIndex]);

  const handleOnBlur = useCallback(() => {
    setFocusedIndex(-1);
  }, []);

  const options = useMemo(() => {
    let index = -1;

    return React.Children.map(children || [], (child) => {
      if (child.props.disabled || disabled) return React.cloneElement(child);

      index += 1;
      const active = index === focusedIndex;
      const selected = selectedOptions[index];

      return React.cloneElement(child, {
        handleOptionClick,
        handleOptionMouseMove,
        index,
        active,
        selected,
        showCheckIcon,
        enableMultiselect,
      });
    });
  }, [
    children,
    disabled,
    focusedIndex,
    selectedOptions,
    handleOptionClick,
    handleOptionMouseMove,
    showCheckIcon,
    enableMultiselect,
  ]);

  useImperativeHandle(
    forwardRef,
    () => ({
      clear: () => {
        setSelectedOptions(selectedOptions.map(() => false));
      },
      getSelectedOptions: () => {
        return selectedOptions.reduce((array, selected, index) => {
          if (selected)
            return [
              ...array,
              { index, value: optionValues[index], id: optionIds[index] },
            ];
          return array;
        }, []);
      },
    }),
    [selectedOptions, optionValues, optionIds]
  );

  return (
    <div
      aria-activedescendant={focusedIndex < 0 ? null : optionIds[focusedIndex]}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-multiselectable={enableMultiselect}
      aria-orientation={orientation}
      className={classnames(styles.listbox, className, {
        [styles.disabled]: disabled,
        [styles.listbox__horizontal]: orientation === "horizontal",
      })}
      id={id}
      onFocusCapture={handleOnFocus}
      onBlurCapture={handleOnBlur}
      onKeyDownCapture={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      ref={listboxRef}
      role="listbox"
      tabIndex={0}
      data-testid={testId}
    >
      {options}
    </div>
  );
};

Listbox.Option = Option;

Listbox.propTypes = {
  /**
   *
   */
  ariaLabel: PropTypes.string,
  /**
   * Refers to the element containing the listbox label.
   */
  ariaLabelledby: PropTypes.string,
  /**
   * Listbox options. Every option should be Listbox.Option component.
   */
  children: PropTypes.node,
  /**
   * Additional classnames
   */
  className: PropTypes.string,
  /**
   * Indicator if whole listbox is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Array of IDs of defaultly selected options. You need to define ID of every option to enable default selection.
   */
  defaultSelected: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  /**
   * If set to true enables selection of multiple options
   */
  enableMultiselect: PropTypes.bool,
  /**
   * Type a character: focus moves to the next option with a name that starts with the typed character.
   * Type multiple characters in rapid succession: focus moves to the next option with a name that starts with the string of characters typed.
   */
  enableTypeAhead: PropTypes.bool,
  /**
   *
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Callback function that triggers each time option is selected.
   * Returns single element as object with value and index.
   */
  onOptionSelect: PropTypes.func,
  /**
   * Callback function that triggers each time option is unselected.
   * Returns single element as object with value and index.
   */
  onOptionUnselect: PropTypes.func,
  /**
   * Callback function that triggers each time option is selected.
   * Returns all selected elements as array.
   */
  onChange: PropTypes.func,
  /**
   * Horizontal or vertical display of listbox.
   */
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  /**
   * Reference to listbox component. When set, this ref will expose 'clear' function.
   * Clear function can be used to clear listbox selection.
   */
  forwardRef: PropTypes.objectOf(PropTypes.object),
  /**
   * If set to true, option will display check icon when selected.
   */
  showCheckIcon: PropTypes.bool,
  /**
   *
   */
  testId: PropTypes.string,
};

export default Listbox;
