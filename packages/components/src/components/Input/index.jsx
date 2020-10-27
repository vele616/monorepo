import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';


/**
 * Basic input component of the CroCoder component library
 */
const Input = ({
  className,
  type,
  children,
  disabled,
  color,
  onClick,
  title,
  style,
  required,
  label,
  variant,
  value,
  error,
  errorMessage,
  onChange,
  ...other
}) => {
  const [empty, setEmpty] = useState(!value);

  const handleChange = useCallback((e) => {
    setEmpty(e.target.value.length === 0)
    onChange && onChange(e)
  }, []);

  return (
    <div
      style={style}
      className={`${className || ''}
      ${error && styles.error} 
      ${empty && styles.empty}
      ${styles.input__wrapper} `}>
      <label className={styles.input__label}>{label} {required && '*'}</label>
      <input
        {...other}
        title={title}
        disabled={disabled}
        onChange={handleChange}
        type={type}
        placeholder={label}
        className={`${className || ''}  ${styles.input} `}
      />
      {errorMessage && error &&
        <span className={styles.message}>{errorMessage}</span>}
    </div>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  title: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  /**
   * If set to true, will add a '*' character
   * to the end of the label to indicate a required input field.
   * 
   */
  required: PropTypes.bool,
};

Input.defaultProps = {
  disabled: false,
};

export default Input;
