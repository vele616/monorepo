import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";
import Portal from "../Portal";
import FieldLayout from "../FieldLayout";
import Listbox from "../Listbox";
import Option from "./Options";
import Header from "./Header";
import Footer from "./Footer";
import Button from "./Button";

/**
 * Basic component for displaying a list of options to the user.
 * It supports multiselect and choice confirmation.
 */
const Select = ({
  applyText,
  children,
  className,
  clear,
  clearAllText,
  clearText,
  confirmChoice,
  defaultSelection,
  id,
  disabled,
  multiselect,
  onChange,
  pill,
  label,
  required,
  renderSelection,
  errorMessage,
  hideLabel,
  error,
  title,
  x,
  y,
}) => {
  const [elementId] = useState(id || new Date().getTime().toString());
  const [open, setOpen] = useState(
    () => defaultSelection && defaultSelection.length > 0
  );
  const listboxRef = useRef();
  const [selection, setSelection] = useState([]);
  const [defaultsLoaded, setDefaultsLoaded] = useState(false);

  useEffect(() => {
    if (defaultSelection && defaultSelection.length > 0 && listboxRef.current) {
      const defaults = listboxRef.current.getSelectedOptions() || [];
      if (onChange) onChange(defaults);
      setSelection(defaults);
    }
    setDefaultsLoaded(true);
    setOpen(false);
  }, [defaultSelection, onChange]);

  const selectedIds = useMemo(() => {
    if (selection && selection.length > 0) {
      return selection.map((item) => item.id);
    }
    return null;
  }, [selection]);

  /**
   * We wish to allow flexibility in rendering
   * content out of the selected values.
   * If the client does not pass anything, we need to display
   * the value of the selected element or the label as placeholder.
   * If there are multiple values, we will display a + next to the first
   * value.
   */
  const renderButtonContent = useMemo(() => {
    if (renderSelection) {
      return renderSelection;
    }

    // eslint-disable-next-line func-names
    return function (sel) {
      if (!pill)
        return (
          <>
            {sel.length !== 0 && (
              <span>
                {sel[0].value}
                {sel.length > 1 && "+"}
              </span>
            )}
          </>
        );
      return (
        <>
          {(!sel || sel.length === 0) && <span>{label}</span>}
          {sel.length !== 0 && (
            <span>
              {sel[0].value}
              {sel.length > 1 && "+"}
            </span>
          )}
        </>
      );
    };
  }, [renderSelection, pill, label]);

  useEffect(() => {
    const listbox = document.getElementById(`listbox-${elementId}`);
    if (listbox && open) {
      listbox.focus();
    }
  }, [elementId, open]);

  const toggleOpen = useCallback(() => {
    const button = document.getElementById(`button-${elementId}`);
    // We're going to close, return focus on button
    if (button && open) {
      button.focus();
    }

    setOpen(!open);
  }, [elementId, open]);

  const confirmTemporarySelection = useCallback(() => {
    const currentSelection = listboxRef.current.getSelectedOptions();
    setSelection(currentSelection);
    setOpen((prev) => !prev);
    const button = document.getElementById(`button-${elementId}`);
    if (button) {
      button.focus();
    }
    if (onChange) {
      onChange(currentSelection);
    }
  }, [onChange, elementId]);

  const clearSelection = useCallback(() => {
    listboxRef.current.clear();
  }, []);

  const onListboxChange = useCallback(
    (value) => {
      // Don't need to confirm choice,
      // Go ahead and select it
      if (!confirmChoice) {
        setOpen((prev) => !prev);
        setSelection(value);
        if (onChange) {
          onChange(value);
        }
      }
    },
    [confirmChoice, onChange]
  );

  return (
    <FieldLayout
      id={elementId}
      label={label}
      required={required}
      labelHtmlFor={`button-${elementId}`}
      labelId={`label-${elementId}`}
      error={error}
      errorMessage={errorMessage}
      removeChildrenStyle={pill}
      removeBottomBorder={pill}
      hideLabel={pill || hideLabel}
      empty={selection && selection.length === 0 && !open}
      className={classnames(className, styles.select, {
        [styles["select--opened"]]: open,
        [styles.pill]: pill,
        [styles.pillActive]: pill && selection,
      })}
    >
      <Button
        elementId={elementId}
        label={label}
        open={open}
        pill={pill}
        renderButtonContent={renderButtonContent}
        selection={selection}
        toggleOpen={toggleOpen}
        disabled={disabled}
      />
      {open && (
        <Portal
          useOutsideLayer
          onOutsideClick={toggleOpen}
          parentId={`button-${elementId}`}
          x={x}
          y={y}
          className={styles.portal}
        >
          <div className={styles.card}>
            {title && <Header elementId={elementId} title={title} />}
            <div className={styles.listbox__wrapper}>
              <Listbox
                ariaHidden={!open}
                forwardRef={listboxRef}
                aria-labelledby={
                  label ? `label-${elementId}` : `title-${elementId}`
                }
                id={`listbox-${elementId}`}
                className={styles.listbox}
                enableMultiselect={multiselect}
                defaultSelected={
                  defaultsLoaded ? selectedIds : defaultSelection
                }
                onChange={!confirmChoice ? onListboxChange : undefined}
              >
                {children}
              </Listbox>
            </div>
            {(clear || confirmChoice) && (
              <Footer
                clear={clear}
                clearSelection={clearSelection}
                multiselect={multiselect}
                clearText={clearText}
                clearAllText={clearAllText}
                confirmChoice={confirmChoice}
                confirmTemporarySelection={confirmTemporarySelection}
                applyText={applyText}
              />
            )}
          </div>
        </Portal>
      )}
    </FieldLayout>
  );
};

Select.propTypes = {
  /**
   * If set to true, will hide label
   */
  hideLabel: PropTypes.bool,
  /**
   * Classname applied to the wrapper element of the Select component.
   * Direct parent of the button that collapses the listbox element.
   */
  className: PropTypes.string,
  /**
   * An array of Select.Option komponents that represent available choices for the user.
   */
  children: PropTypes.node,
  /**
   * Id of the wrapper element. If passed, the component will use to generate ID's for
   * it's button and listbox as well. If not passed, it's automatically generated by the component.
   */
  id: PropTypes.string,
  /**
   * If set to true, the user will have to confirm the listbox selection by clicking
   * on a generated button. In such case, the `Select` component's `onChange` function
   * will not be called until the selected options are confirmed.
   */
  confirmChoice: PropTypes.bool,
  /**
   * If set to true, the user can select multiple options.
   * This will result in showing checkboxes next to each option.
   */
  multiselect: PropTypes.bool,
  /**
   * Title of the listbox - displayed on the top of the scrollable list of options.
   */
  title: PropTypes.string,
  /**
   * If set to true, will remove all selected options (in other words, reset to the empty state).
   * If used with `confirmChoice`, will not apply if it's not confirmed.
   */
  clear: PropTypes.bool,

  /**
   * If set to true, the `Select` component will have a custom pill-like styling
   * for the toggable button. Useful when creating filters.
   */
  pill: PropTypes.bool,
  /**
   * Callback function that triggers each time the selected value changes.
   * If `confirmChoice` property is used, it will be called only after the
   * user's choice has been confirmed.
   * The `Select` component will pass the array of elected options
   * as the first argument of this function.
   */
  onChange: PropTypes.func,

  /**
   * Function responsible for rendering the textual content
   * of the Select button. Use it to apply additional formating or
   * styling. As argument it receives the selection array.
   * It should return the node to render. The default implementation
   * checks if the user has selected something. If he has, render's the first value
   * of the selection.
   * In case there are multiple elements selected, the + sign is added at the end of the first selection.
   */
  renderSelection: PropTypes.func,
  /**
   * Text of the apply button (shown when `confirmChoice` property is set to true).
   */
  applyText: PropTypes.string,
  /**
   * When `clear` property set to true and `multiselect` set to false, shown
   * for the clear option.
   */
  clearText: PropTypes.string,
  /**
   * When `clear` property set to true and `multiselect` set to true, shown
   * for the clear option.
   */
  clearAllText: PropTypes.string,

  /**
   * An array filled with id's of options that are initially selected.
   * These id's must be applied to the `Select.Option` components in order
   * to be applied.
   */
  defaultSelection: PropTypes.arrayOf(PropTypes.string),

  /**
   * If set to true, disables the control.
   */
  disabled: PropTypes.bool,

  /**
   * Label that is placed on top and as placeholder
   * for the Select control.
   */
  label: PropTypes.string,
  /**
   * If set to true, the control will be rendered
   * with a * character that indicates the input is
   * required.
   */
  required: PropTypes.bool,

  /**
   * If set to true, will apply specific styling
   * to the component to indicate to the user
   * there is something wrong with the input.
   */
  error: PropTypes.bool,

  /**
   * If `error` is set to true, the component
   * will display the passed message underneath the Select
   * control.
   */
  errorMessage: PropTypes.string,
  /**
   * In case of fixed positioning, sets the position of the
   * children (selection listbox) on the X-axis.
   */
  x: PropTypes.oneOf(["left", "center", "right"]),
  /**
   * In case of fixed positioning, sets the position of the
   * children (selection listbox) on the Y-axis.
   */
  y: PropTypes.oneOf(["top", "center", "bottom"]),
};

Select.defaultProps = {
  defaultSelection: [],
  clearAllText: "Clear all",
  clearText: "Clear",
  applyText: "Apply",
  confirmChoice: false,
  multiselect: false,
  clear: false,
  title: null,
  pill: false,
  label: null,
  required: false,
  x: "center",
  y: "bottom",
};

Select.Option = Option;

export default Select;
