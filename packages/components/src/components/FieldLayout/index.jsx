import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";

/**
 * Basic Field component of the CroCoder component library.
 * Used to unify styling of inputs
 */
const Field = ({
  className,
  error,
  errorMessage,
  id,
  label,
  required,
  style,
  children,
  empty,
  labelId,
  labelHtmlFor,
  removeChildrenStyle,
  removeBottomBorder,
  hideLabel,
}) => {
  return (
    <div
      id={id}
      style={style}
      className={classnames(className, styles.wrapper, {
        [styles.error]: error,
        [styles.empty]: empty,
      })}
    >
      <label
        id={labelId}
        aria-hidden={hideLabel}
        htmlFor={labelHtmlFor}
        className={styles.label}
      >
        {label} {required && "*"}
      </label>
      <div
        className={classnames(styles.field, {
          [styles.includeBorder]: !removeBottomBorder,
          [styles.style__child]: !removeChildrenStyle,
        })}
      >
        {children}
      </div>
      {errorMessage && error && (
        <span title={errorMessage} className={styles.message}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

const FieldPropTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  empty: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  labelId: PropTypes.string,
  labelHtmlFor: PropTypes.string,
  removeChildrenStyle: PropTypes.bool,
  removeBottomBorder: PropTypes.bool,
  hideLabel: PropTypes.bool,

  /**
   * If set to true, will add a '*' character
   * to the end of the label to indicate a required Field field.
   *
   */
  required: PropTypes.bool,
  style: PropTypes.shape({}),
};

Field.propTypes = FieldPropTypes;

Field.defaultProps = {
  removeChildrenStyle: false,
  removeBottomBorder: false,
  hideLabel: false,
};

export { FieldPropTypes };
export default Field;
