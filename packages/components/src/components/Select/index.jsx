import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./index.module.scss";
import Portal from "../Portal";
import Listbox from "../Listbox";
import Typography from "../Typography";
import Option from "./Options";

const Select = ({
  className,
  id,
  title,
  placeholder,
  children,
  clear,
  confirmChoice,
  multiselect,
  pill,
}) => {
  const [elementId] = useState(id || new Date().getTime().toString());
  const [open, setOpen] = useState(false);
  const [tempSelection, setTempSelection] = useState();
  const [selection, setSelection] = useState([]); // TODO add initial selection

  useEffect(() => {
    const firstChild = document.querySelector(
      `#listbox-${elementId} [role="option"]`
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
    // TODO Support onChange property as well
  }, [tempSelection]);

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
      }
      // TODO Support onChange property as well
    },
    [confirmChoice]
  );

  return (
    <div className={classnames(className, styles.select)}>
      <Button
        className={classnames({
          [styles.opened]: open,
          [styles.selected]: selection.length !== 0,
          [styles.minimal]: !pill,
        })}
        aria-haspopup="listbox"
        id={`button-${elementId}`}
        onClick={toggleOpen}
        variant={pill ? "pill" : "select"}
      >
        {selection.length === 0 && <span>{placeholder} </span>}
        {selection.length !== 0 && (
          <span>
            {" "}
            {selection[0].value}{" "}
            {/** TODO add render function and pass value to it */}
            {selection.length > 1 && "+"}{" "}
          </span>
        )}
        {!pill && (
          <Icon
            style={{ marginLeft: "10px", fontSize: "1.5em" }}
            icon={open ? "chevron-up" : "chevron-down"}
          />
        )}
      </Button>
      <Portal
        parentId={`button-${elementId}`}
        x="center"
        y="bottom"
        ariaHidden={!open}
        className={classnames(styles.portal, {})}
      >
        <div className={styles.card}>
          {title && (
            <div className={styles.header}>
              <Typography fontSize={20} color="contrast" fontWeight={500}>
                {title}
              </Typography>
            </div>
          )}
          <div className={styles.list}>
            <Listbox
              ariaHidden={!open}
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
                    Clear {multiselect && "all"}
                  </Typography>
                </Button>
              )}
              {confirmChoice && (
                <Button variant="secondary" onClick={confirmTemporarySelection}>
                  Apply {/** TODO add optional text values */}
                </Button>
              )}
            </div>
          )}
        </div>
      </Portal>
    </div>
  );
};

Select.propTypes = {
  // TODO Add docs
  className: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string,
  confirmChoice: PropTypes.bool,
  multiselect: PropTypes.bool,
  title: PropTypes.string,
  clear: PropTypes.bool,
  placeholder: PropTypes.string,
  pill: PropTypes.bool,
  // TODO add option to disable button size change
};

Select.defaultProps = {
  confirmChoice: false,
  multiselect: false,
  clear: false,
  title: null,
  pill: false,
  placeholder: "Select",
};

Select.Option = Option;

export default Select;
