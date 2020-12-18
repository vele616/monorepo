import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";

/**
 * Basic Field component of the CroCoder component library.
 * Used to unify styling of input controls.
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
        [styles.hideLabel]: hideLabel,
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
  /**
   * Any other control (such as <input> or <button>)
   * that should be wrapped into this structure.
   */
  children: PropTypes.node,
  /**
   * ClassName applied to the wrapper element
   * of the FieldLayout component.
   */
  className: PropTypes.string,
  /**
   * If set to true, the element is considered empty
   * or without any input. In such case, the label
   * will be displayed on over the children elements.
   */
  empty: PropTypes.bool,
  /**
   * If set to true, the component applies certain
   * style to indicate issues with field.
   */
  error: PropTypes.bool,
  /**
   * If `error` property is set to true,
   * this string will be displayed underneath the
   * children.
   */
  errorMessage: PropTypes.string,
  /**
   * Id applied to the wrapper element
   */
  id: PropTypes.string,
  /**
   * Content of the label HTML element.
   */
  label: PropTypes.string,
  /**
   * Id applied to the label HTML element.
   */
  labelId: PropTypes.string,
  /**
   * Id of the control to which the label element
   * applies.
   */
  labelHtmlFor: PropTypes.string,
  /**
   * By default, this component applies certain styling
   * to the passed children elements.
   * If you wish to prevent this, pass this property
   * as true. This is useful when you need to overwrite
   * certain styles of the children (without having
   * to use !important).
   */
  removeChildrenStyle: PropTypes.bool,
  /**
   * By default, this component renders
   * a bottom border to indicate different states of the component.
   * If you do not wish to display it, you can set this property
   * to true.
   */
  removeBottomBorder: PropTypes.bool,
  /**
   * If set to true, makes label hidden (sets aria hidden to true
   * and visibility to hidden).
   */
  hideLabel: PropTypes.bool,

  /**
   * If set to true, will add a '*' character
   * to the end of the label to indicate a required Field field.
   *
   */
  required: PropTypes.bool,

  /**
   * Style applied to the wrapper element.
   */
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
