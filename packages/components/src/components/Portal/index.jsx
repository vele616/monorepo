/* eslint-disable react/no-unused-state */
import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import classnames from "classnames";
import styles from "./index.module.scss";
import getScreenPosition from "./getScreenPosition";

/**
 * Basic wrapper to create elevated components outside the
 * DOM hierarchy of the parent component. Useful for creating Modals, Alerts
 * and other components that need to vertically stand out.
 *
 * Uses default browser behavior to determine which element is on top
 * and places everything in the div with the id portal-layer. If such
 * div does not exist prior, it creates it.
 */
class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.element = document.createElement("div");
    this.state = {
      allowRender: false,
      padding: `${props.positionOffset}px`,
    };
    this.setupPortalLayer = this.setupPortalLayer.bind(this);
    this.updateScreenPosition = this.updateScreenPosition.bind(this);
  }

  componentDidMount() {
    const { parentId, x, y, positionOffset, includeHalf } = this.props;
    this.setupPortalLayer();
    const position = getScreenPosition({
      parentId,
      x,
      y,
      positionOffset,
      includeHalf,
    });
    this.setState({ ...position, allowRender: true });
  }

  static getDerivedStateFromProps(props) {
    const { parentId, x, y, positionOffset, includeHalf } = props;
    if (parentId) {
      return getScreenPosition({ parentId, x, y, positionOffset, includeHalf });
    }
    return {
      padding: `${props.positionOffset}px`,
    };
  }

  componentWillUnmount() {
    this.portalLayer.removeChild(this.element);
  }

  setupPortalLayer() {
    let portalLayer = document.getElementById("portal-layer");
    if (!portalLayer) {
      portalLayer = document.createElement("div");
      portalLayer.id = "portal-layer";
      document.body.appendChild(portalLayer);
    }
    portalLayer.appendChild(this.element);
    this.portalLayer = portalLayer;
  }

  /**
   * Exposed to children in case they need to manually update position.
   */
  updateScreenPosition() {
    const { parentId, x, y, positionOffset, includeHalf } = this.props;
    this.setState((prev) => ({
      ...prev,
      ...getScreenPosition({ parentId, x, y, positionOffset, includeHalf }),
    }));
  }

  render() {
    const {
      children,
      relative,
      className,
      includeHalf,
      ariaHidden,
      x,
      y,
      parentId,
    } = this.props;
    return ReactDOM.createPortal(
      <div
        aria-hidden={ariaHidden}
        style={this.state}
        className={classnames(className, {
          [styles.fixed]: !relative,
          [styles.base]: relative,
          [styles.withParent]: !!parentId,
          [styles[`${x}_${y}`]]: true,
          [styles.removeHalf]: !includeHalf,
        })}
      >
        {/** TODO add layer to support outside click handling */}
        {typeof children === "function"
          ? children(this.updateScreenPosition)
          : children || null}
      </div>,
      this.element
    );
  }
}

Portal.propTypes = {
  /**
   * Makes element hidden from assistive technologies.
   */
  ariaHidden: PropTypes.bool,
  /**
   * Classname applied to the wrapper around all children.
   * This wrapper has position-related CSS applied to it.
   * If you pass a function as a child, the Portal component will
   * pass down a function for updating screen position.
   * This will allow you to programatically trigger recalculating of
   * position, however you need to make sure you're not calling
   * it way to often.
   */
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /**
   * You can use the `parentId` property to indicate what
   * element you'd like to be relative to. In case this value
   * is empty, you'll be positioned relatively to te screen.
   * If this value is set, the wrapper element has absolute positioning.
   */
  parentId: PropTypes.string,
  /**
   * Sets the wrapper parent's position to relative (overwrites the default absolute/fixed positioning).
   */
  relative: PropTypes.bool,
  /**
   * Boolean property that influences the left CSS property of the
   * wrapper element. In case it's true, the center calculations
   * will include the parent's width and height.
   */
  includeHalf: PropTypes.bool,
  /**
   * Adds an equal padding to the wrapper element. Useful when you need to
   * create extra space between parent and children.
   */
  positionOffset: PropTypes.number,
  /**
   * In case of fixed positioning, sets the position of the
   * children on the X-axis.
   */
  x: PropTypes.oneOf(["left", "center", "right"]),
  /**
   * In case of fixed positioning, sets the position of the
   * children on the Y-axis.
   */
  y: PropTypes.oneOf(["top", "center", "bottom"]),
};

Portal.defaultProps = {
  className: "",
  positionOffset: null,
  parentId: null,
  relative: false,
  includeHalf: false,
  x: "center",
  y: "center",
  ariaHidden: false,
};

export default Portal;
