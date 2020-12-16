import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";

/**
 * Basic input component of the CroCoder component library
 */
const Input = ({
  className,
  disabled,
  error,
  errorMessage,
  id,
  label,
  onChange,
  required,
  style,
  testId,
  title,
  type,
  value,
}) => {
  const [empty, setEmpty] = useState(!value);

  const handleChange = useCallback(
    (e) => {
      setEmpty(e.target.value.length === 0);
      if (onChange) onChange(e);
    },
    [onChange]
  );

  return (
    <div
      style={style}
      className={classnames(className, styles.input__wrapper, {
        [styles.error]: error,
        [styles.empty]: empty,
      })}
    >
      <label htmlFor={id} className={styles.input__label}>
        {label} {required && "*"}
      </label>
      <input
        id={id}
        testid={testId}
        title={title}
        disabled={disabled}
        onChange={handleChange}
        type={type}
        placeholder={label}
        className={`${className || ""}  ${styles.input} `}
      />
      {errorMessage && error && (
        <span className={styles.message}>{errorMessage}</span>
      )}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  /**
   * A function called on input's change - will receive React's
   * synthetic event as first (and only) argument.
   */
  onChange: PropTypes.func,
  /**
   * If set to true, will add a '*' character
   * to the end of the label to indicate a required input field.
   *
   */
  required: PropTypes.bool,
  style: PropTypes.shape({}),
  testId: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  disabled: false,
};

export default Input;
