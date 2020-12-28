import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "../Button";
import Icon from "../Icon";
import styles from "./index.module.scss";

const SelectButton = ({
  elementId,
  label,
  open,
  pill,
  renderButtonContent,
  selection,
  toggleOpen,
  disabled,
}) => {
  return (
    <Button
      disabled={disabled}
      className={classnames({
        [styles["button--selected"]]: selection.length !== 0,
        [styles.button]: !pill,
        [styles["button--pill"]]: pill,
      })}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-labelledby={
        label ? `label-${elementId} button-${elementId}` : `button-${elementId}`
      }
      id={`button-${elementId}`}
      onClick={!disabled ? toggleOpen : undefined}
      variant={pill ? "pill" : "sneaky"}
    >
      {renderButtonContent && renderButtonContent(selection)}
      {!pill && (
        <Icon
          className={styles.button__icon}
          icon={open ? "chevron-up" : "chevron-down"}
        />
      )}
    </Button>
  );
};

SelectButton.propTypes = {
  elementId: PropTypes.string,
  selection: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  renderButtonContent: PropTypes.func,
  toggleOpen: PropTypes.func,
  label: PropTypes.string,
  open: PropTypes.bool,
  pill: PropTypes.bool,
  disabled: PropTypes.bool,
};

SelectButton.displayName = "Select.Button";
export default SelectButton;
