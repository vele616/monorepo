import React, { useState, useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./index.module.scss";
import Portal from "../Portal";
import FieldLayout from "../FieldLayout";
import Listbox from "../Listbox";
import Typography from "../Typography";
import Option from "./Options";

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
  multiselect,
  onChange,
  pill,
  label,
  required,
  renderSelection,
  errorMessage,
  error,
  title,
}) => {
  const [elementId] = useState(id || new Date().getTime().toString());
  const [open, setOpen] = useState(false);
  const [tempSelection, setTempSelection] = useState();
  const [selection, setSelection] = useState(defaultSelection);

  const renderButtonContent = useMemo(() => {
    if (renderSelection) {
      return renderSelection;
    }

    /* Checks if the user has selected something. If he has, render's the first value
     * of the selection. */
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
    const firstChild = document.querySelector(
      `#listbox-${elementId} [role="listbox"]`
    );
    if (firstChild && open) {
      firstChild.focus();
    }
  }, [elementId, open]);

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const confirmTemporarySelection = useCallback(() => {
    setSelection(tempSelection);
    setTempSelection([]);
    setOpen((prev) => !prev);
    if (onChange) {
      onChange(tempSelection);
    }
  }, [tempSelection, onChange]);

  const clearSelection = useCallback(() => {
    setTempSelection([]);
    // TODO clear child
  }, []);

  const onListboxChange = useCallback(
    (value) => {
      if (confirmChoice) {
        setTempSelection(value);
      } else {
        setSelection(value);
        setOpen((prev) => !prev);
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
      empty={selection.length === 0}
      className={classnames(className, styles.select, {
        [styles.opened]: open,
        [styles.selected]: selection.length !== 0,
        [styles.pill]: pill,
      })}
    >
      <Button
        className={classnames({
          [styles.selected]: selection.length !== 0,
          [styles.button]: !pill,
          [styles.pill]: pill,
        })}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={
          label
            ? `label-${elementId} button-${elementId}`
            : `button-${elementId}`
        }
        id={`button-${elementId}`}
        onClick={toggleOpen}
        variant={pill ? "pill" : "sneaky"}
      >
        {renderButtonContent && renderButtonContent(selection)}
        {!pill && (
          <Icon
            className={styles.icon}
            icon={open ? "chevron-up" : "chevron-down"}
          />
        )}
      </Button>
      <Portal
        useOutsideLayer
        onOutsideClick={toggleOpen}
        parentId={`button-${elementId}`}
        x="center"
        y="bottom"
        ariaHidden={!open}
        className={classnames(styles.portal, {})}
      >
        <div className={styles.card}>
          {title && (
            <div className={styles.header}>
              <Typography
                id={`title-${elementId}`}
                fontSize={20}
                color="contrast"
                fontWeight={500}
              >
                {title}
              </Typography>
            </div>
          )}
          <div className={styles.list}>
            <Listbox
              ariaHidden={!open}
              aria-labelledby={
                label ? `label-${elementId}` : `title-${elementId}`
              }
              id={`listbox-${elementId}`}
              className={styles.listbox}
              enableMultiselect={multiselect}
              onChange={onListboxChange}
            >
              {children}
            </Listbox>
          </div>
          {(clear || confirmChoice) && (
            <div className={styles.footer}>
              {clear && (
                <Button
                  variant="sneaky"
                  onClick={clearSelection}
                  className={styles.sneaky}
                >
                  <Typography fontSize={16} color="contrast" fontWeight={500}>
                    {!multiselect && clearText}
                    {multiselect && clearAllText}
                  </Typography>
                </Button>
              )}
              {confirmChoice && (
                <Button variant="secondary" onClick={confirmTemporarySelection}>
                  {applyText}
                </Button>
              )}
            </div>
          )}
        </div>
      </Portal>
    </FieldLayout>
  );
};

Select.propTypes = {
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

  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
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
  label: "Banana",
  required: false,
};

Select.Option = Option;

export default Select;
