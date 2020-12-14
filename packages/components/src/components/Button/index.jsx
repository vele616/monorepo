import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";
/**
 * The Button component represents a graphical control element that gives
 * the user a simple way to trigger an action inside the system.
 * This component generates a single HTML button element as a wrapper
 * around the content passed to it.
 * Use this component whenever you wish to communicate actions that users
 * can trigger inside of your application.
 */
const Button = ({
  className,
  type,
  children,
  disabled,
  onClick,
  title,
  style,
  variant,
  ...other
}) => (
  <button
    {...other}
    style={style}
    title={title}
    disabled={disabled}
    type={type}
    onClick={onClick}
    className={classnames(className, styles.button, styles[variant])}
  >
    {children}
  </button>
);

Button.propTypes = {
  /**
   * Content that will be displayed inside a HTML button element.
   */
  children: PropTypes.node,
  /**
   * ClassName applied to the HTML button element.
   */
  className: PropTypes.string,
  /**
   * Sets the `disabled` attribute. When set to true,
   * will give the HTML button element special styling and
   * will disable it for interaction.
   */
  disabled: PropTypes.bool,
  /**
   * Click handler that gets called whenever the HTML
   * button is clicked. Will not be called if `disabled=true`.
   */
  onClick: PropTypes.func,
  /**
   * Style object that will be passed as `style` attribute to
   * the HTML button element.
   */
  style: PropTypes.shape({}),
  /**
   * Title of the HTML button element. Useful when you wish to
   * use the ellipsis effect but still have full text shown to the
   * user on hover.
   */
  title: PropTypes.string,
  /**
   * Inside of the CroCoder styleguide, we define several styles of our
   * buttons that appear on the site. By specifying the `variant` property,
   * you specify which style you're using.
   */
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "sneaky",
    "pill",
    "select",
  ]),
  /**
   * Available button types - correspond to the HTML button type attribute values.
   */
  type: PropTypes.oneOf(["button", "reset", "submit", "presentation"]),
};

Button.defaultProps = {
  disabled: false,
  variant: "primary",
};

export default Button;
