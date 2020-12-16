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
}) => {
  // TODO label visibility property
  // TODO disable child style changing via props
  // TODO select label when opened goes down on focus removal - additional styling required
  return (
    <div
      id={id}
      style={style}
      className={classnames(className, styles.wrapper, {
        [styles.error]: error,
        [styles.empty]: empty,
      })}
    >
      <label id={labelId} htmlFor={labelHtmlFor} className={styles.label}>
        {label} {required && "*"}
      </label>
      <div className={styles.field}>{children}</div>
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

  /**
   * If set to true, will add a '*' character
   * to the end of the label to indicate a required Field field.
   *
   */
  required: PropTypes.bool,
  style: PropTypes.shape({}),
};

Field.propTypes = FieldPropTypes;

Field.defaultProps = {};

export { FieldPropTypes };
export default Field;
