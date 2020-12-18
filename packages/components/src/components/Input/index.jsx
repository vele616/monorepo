import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import FieldLayout from "../FieldLayout";
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
    <FieldLayout
      style={style}
      error={error}
      errorMessage={errorMessage}
      labelHtmlFor={id}
      empty={empty}
      label={label}
      required={required}
      className={className}
    >
      <input
        id={id}
        testid={testId}
        title={title}
        disabled={disabled}
        onChange={handleChange}
        type={type}
        placeholder={label}
        className={styles.input}
      />
    </FieldLayout>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  /**
   * A function called on input's change - will receive React's
   * synthetic event as first (and only) argument.
   */
  onChange: PropTypes.func,
  style: PropTypes.shape({}),
  testId: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
};

Input.defaultProps = {
  disabled: false,
};

export default Input;
