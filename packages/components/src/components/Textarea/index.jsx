import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import styles from './index.module.scss';
import { useRef } from 'react';

/**
 * Basic textarea component of the CroCoder component library.
 */
const Textarea = ({
  children,
  className,
  color,
  disabled,
  enableCharCount = false,
  enableManualResize,
  error,
  errorMessage,
  fluidHeight,
  fluidHeightOptions = {
    minRows: 3,
    maxRows: Infinity,
    lineHeight: 16
  },
  label,
  maxLength,
  onChange,
  onClick,
  required,
  style,
  title,
  type,
  value,
  ...other
}) => {
  const [empty, setEmpty] = useState(!value);
  const [charCount, setCharCount] = useState(0);

  const textAreaInitialHeight = fluidHeight && fluidHeightOptions.minRows * fluidHeightOptions.lineHeight;
  let textAreaPreviousHeight = textAreaInitialHeight;

  const textAreaRef = useRef();

  const resize = useCallback(() => {
    textAreaRef.current.style.height = `${textAreaInitialHeight}px`;
    const rows = Math.floor((textAreaRef.current.scrollHeight) / fluidHeightOptions.lineHeight);
    textAreaRef.current.style.height = `${((rows > fluidHeightOptions.maxRows ? fluidHeightOptions.maxRows : rows) * fluidHeightOptions.lineHeight)}px`;
  }, []);

  const handleChange = useCallback((e) => {
    setEmpty(e.target.value.length === 0);
    setCharCount(e.target.value.length);

    if (fluidHeight && textAreaPreviousHeight !== textAreaRef.current.scrollHeight) {
      resize();
    }

    textAreaPreviousHeight = textAreaRef.current.scrollHeight;
    onChange && onChange(e);
  }, [onChange]);

  if (enableCharCount && !maxLength) {
    maxLength = 500;
  }

  const heightStyle = fluidHeight ? 
    { height: textAreaInitialHeight, lineHeight: `${fluidHeightOptions.lineHeight}px` } : {};

  return (
    <div
      style={style}
      className={`${className || ''}
      ${error && styles.error || ''}
      ${empty && styles.empty || ''}
      ${styles.textarea__wrapper}`}>
      <label className={styles.textarea__label}>{label} {required && '*'}</label>
      <textarea
          ref={textAreaRef}
          title={title}
          disabled={disabled}
          onChange={handleChange}
          type={type}
          aria-label={label}
          placeholder={label}
          maxLength={maxLength}
          className={`${styles.textarea}
            ${enableManualResize ? '' : styles.textarea__disableResize}`}
          style={heightStyle}
          {...other}
        />
        {errorMessage && error &&
          <span className={styles.message}>{errorMessage}</span>}
        {enableCharCount &&
          <span className={styles.textarea__charCounter}>{`${charCount}/${maxLength}`}</span>}
    </div>
  );
}

Textarea.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.shape({}),
  title: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  /**
   * Indicator if value in textarea is not applicable.
   */
  error: PropTypes.bool,
  /**
   * Adds resize handle at the bottom right corner that enables
   * user to resize textarea manually. 
   */
  enableManualResize: PropTypes.bool,
  /**
   * Enables character counter at the bottom right corner, just
   * below textarea. If 'maxLength' property is not set, it will
   * default to maximum of 500 characters.
   */
  enableCharCount: PropTypes.bool,
  /**
   * Sets maximum allowed character count in textarea. To display it,
   * set 'enableCharCount' property to 'true'. 
   */
  maxLength: PropTypes.number,
  /**
   * Sets minimum number of displayed rows that textarea can have.
   * This property will be omitted if 'fluidHeight' property is set to 'false'.
   */
  minRows: PropTypes.number,
  /**
   * Sets maximum number of displayed rows that textarea can have.
   * This property will be omitted if 'fluidHeight' property is set to 'false'.
   */
  maxRows: PropTypes.number,
  /**
   * Enables automatic height resizing of textarea. Textarea will grow in
   * height if it needs to on every new line. Set 'minRows' property to enable
   * minimum number of displayed rows. Set 'maxRows' property to enable maximum number of
   * displayed rows. <strong>Notice:</strong> does not shinks,
   */
  fluidHeight: PropTypes.bool,
  /**
   * Defines height between lines in textarea. <strong>Notice: </strong>
   * due different font families, height of textarea can be greater than it should.
   * Be sure that lineHeight is always greater than actual font size. 
   * Enabled only if 'fluidHeight' property is set to 'true'. 
   */
  lineHeight: PropTypes.number,
  /**
   * Error message indicating not applicable value.
   */
  errorMessage: PropTypes.string,
  /**
   * If set to true, will add a '*' character
   * to the end of the label to indicate a required textarea field.
   */
  required: PropTypes.bool,
};

Textarea.defaultProps = {
  disabled: false,
};

export default Textarea;