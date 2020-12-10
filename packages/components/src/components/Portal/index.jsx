/* eslint-disable react/no-unused-state */
import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import classnames from "classnames";
import styles from "./index.module.scss";

const getScreenPosition = ({ parentId, x, y, positionOffset, includeHalf }) => {
  if (!parentId) return {};
  const parent = document.getElementById(parentId);
  if (!parent) return {};
  try {
    const boundingRect = parent.getBoundingClientRect();
    let left;
    let top;
    switch (x) {
      case "left": {
        left = boundingRect.x;
        break;
      }
      case "center": {
        left = includeHalf
          ? boundingRect.x + Math.round(boundingRect.width / 2)
          : boundingRect.x;
        break;
      }
      default: {
        left = boundingRect.x + boundingRect.width;
        break;
      }
    }
    switch (y) {
      case "top": {
        top = boundingRect.y;
        break;
      }
      case "center": {
        top = includeHalf
          ? boundingRect.y + Math.round(boundingRect.height / 2)
          : boundingRect.y;
        break;
      }
      default: {
        top = boundingRect.y + boundingRect.height;
        break;
      }
    }

    return {
      top,
      left,
      padding: `${positionOffset}px`,
    };
  } catch (ex) {
    return { top: 0, left: 0, transform: undefined };
  }
};

/**
 * Basic wrapper to create floating components outside the
 * DOM hierarchy of the parent component.
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

  render() {
    const {
      children,
      relative,
      className,
      includeHalf,
      x,
      y,
      parentId,
    } = this.props;
    return ReactDOM.createPortal(
      <div
        style={this.state}
        className={classnames(className, {
          [styles.relative]: relative,
          [styles.base]: !relative,
          [styles.withParent]: !!parentId,
          [styles[`${x}_${y}`]]: true,
          [styles.removeHalf]: !includeHalf,
        })}
      >
        {children}
      </div>,
      this.element
    );
  }
}

Portal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  parentId: PropTypes.string,
  /**
   * Sets the wrapper parent's position to fixed.
   * If the parentId is supplied, the Portal will render
   * it's children and their wrapper relative to that element.
   */
  relative: PropTypes.bool,
  includeHalf: PropTypes.bool,
  positionOffset: PropTypes.number,
  x: PropTypes.oneOf(["left", "right", "center"]),
  y: PropTypes.oneOf(["top", "bottom", "center"]),
};

Portal.defaultProps = {
  className: "",
  positionOffset: 0,
  parentId: "my-button",
  relative: true,
  includeHalf: false,
  x: "center",
  y: "center",
};

export default Portal;
