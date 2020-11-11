import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useState, useCallback } from "react";
import styles from "./index.module.scss";
import { useRef } from "react";
import { useEffect } from "react";

/**
 * Basic textarea component of the CroCoder component library.
 */
const Textarea = ({
  className,
  disabled = false,
  showCharCount = false,
  enableManualResize = false,
  error = false,
  errorMessage,
  fluidHeight = false,
  fluidHeightOptions = {
    minRows: 3,
    maxRows: Infinity,
    lineHeight: 16,
  },
  label,
  maxLength,
  onChange,
  onClick,
  required = false,
  style,
  textAreaStyle,
  value,
  ...other
}) => {
  const [empty, setEmpty] = useState(!value);
  const [charCount, setCharCount] = useState(0);
  const [textAreaPreviousHeight, setTextAreaPreviousHeight] = useState(0);
  const [heightStyle, setHeightStyle] = useState(() => {
    return fluidHeight
      ? {
          height: `${
            fluidHeightOptions.minRows * fluidHeightOptions.lineHeight
          }px`,
          lineHeight: `${fluidHeightOptions.lineHeight}px`,
        }
      : {};
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    function getMissingProperties(object, properties) {
      const keys = Object.keys(object);
      return properties.filter((prop) => !keys.includes(prop));
    }

    function isObject(object) {
      return typeof object === "object" && object !== null;
    }

    if (fluidHeight) {
      if (!isObject(fluidHeightOptions)) {
        console.warn(
          "fluidHeight is set to true but fluidHeightOptions attribute should be a object"
        );
      } else {
        const missingProperties = getMissingProperties(fluidHeightOptions, [
          "minRows",
          "maxRows",
          "lineHeight",
        ]);
        if (missingProperties.length > 0) {
          console.warn(
            "fluidHeight is set to true but fluidHeightOptions is missing some properties",
            missingProperties
          );
        }
      }
    }
  }, []);

  const textAreaRef = useRef();

  const resize = useCallback(() => {
    const rows = Math.floor(
      textAreaRef.current.scrollHeight / fluidHeightOptions.lineHeight
    );
    const height = `${
      (rows > fluidHeightOptions.maxRows ? fluidHeightOptions.maxRows : rows) *
      fluidHeightOptions.lineHeight
    }px`;
    setHeightStyle((prev) => {
      return { ...prev, height };
    });
  }, [textAreaPreviousHeight, fluidHeight, fluidHeightOptions]);

  const handleChange = useCallback(
    (e) => {
      setEmpty(e.target.value.length === 0);
      setCharCount(e.target.value.length);

      if (fluidHeight) {
        if (textAreaPreviousHeight !== textAreaRef.current.scrollHeight) {
          resize();
        }
        setTextAreaPreviousHeight(textAreaRef.current.scrollHeight);
      }

      onChange && onChange(e);
    },
    [onChange, fluidHeight, textAreaPreviousHeight]
  );

  if (showCharCount && !maxLength) {
    maxLength = 500;
  }

  return (
    <div
      style={style}
      className={classnames(className, styles.textarea__wrapper, {
        [styles.error]: error,
        [styles.empty]: empty,
      })}
    >
      <label className={styles.textarea__label}>
        {label} {required && "*"}
      </label>
      <textarea
        ref={textAreaRef}
        disabled={disabled}
        onChange={handleChange}
        aria-label={label}
        placeholder={label}
        maxLength={maxLength}
        className={classnames(styles.textarea, {
          [styles.textarea__enableManualResize]: enableManualResize,
        })}
        style={{ ...heightStyle, ...textAreaStyle }}
        {...other}
      />
      <div className={styles.textarea__messages}>
        {errorMessage && error && (
          <span title={errorMessage} className={styles.message}>
            {errorMessage}
          </span>
        )}
        {showCharCount && (
          <span
            className={styles.textarea__charCounter}
          >{`${charCount}/${maxLength}`}</span>
        )}
      </div>
    </div>
  );
};

Textarea.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * Custom CSS style for textarea wrapper element.
   */
  style: PropTypes.shape({}),
  /**
   * Custom CSS style for textarea element.
   */
  textAreaStyle: PropTypes.object,
  label: PropTypes.string,
  value: PropTypes.string,
  /**
   * Indicator if value in textarea is not applicable.
   * Set errorMessage to add error text.
   */
  error: PropTypes.bool,
  /**
   * Error message indicating not applicable value.
   */
  errorMessage: PropTypes.string,
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
  showCharCount: PropTypes.bool,
  /**
   * Sets maximum allowed character count in textarea. To display it,
   * set 'showCharCount' property to 'true'.
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
   * Defines height between lines in textarea. <strong>Notice: </strong>
   * due different font families, height of textarea can be greater than it should.
   * Be sure that lineHeight is always greater than actual font size.
   * Enabled only if 'fluidHeight' property is set to 'true'.
   */
  lineHeight: PropTypes.number,
  /**
   * Enables automatic height resizing of textarea. Textarea will grow in
   * height if it needs to on every new line. Set 'fluidHeightOptions' property to enable
   * minimum and maximum number of displayed rows as well as height between lines.
   */
  fluidHeight: PropTypes.bool,
  /**
   * Options for fluidHeight property.
   * See object parameters below.
   */
  fluidHeightOptions: PropTypes.object,
  /**
   * Sets minimum number of displayed rows that textarea can have.
   */
  ["fluidHeightOptions.minRows"]: PropTypes.number,
  /**
   * Sets maximum number of displayed rows that textarea can have.
   */
  ["fluidHeightOptions.maxRows"]: PropTypes.number,
  /**
   * Defines height between lines in textarea. <strong>Notice: </strong>
   * due different font families, height of textarea can be greater than it should.
   * Be sure that lineHeight is always greater than actual font size.
   */
  ["fluidHeightOptions.lineHeight"]: PropTypes.number,
  /**
   * If set to true, will add a '*' character
   * to the end of the label to indicate a required textarea field.
   */
  required: PropTypes.bool,
  /**
   * This object will expand itself on to textarea component, overriding default props.
   */
  other: PropTypes.object,
};

export default Textarea;
