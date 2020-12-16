import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";

const Panel = ({ classAnimation, className, children, hidden }) => {
  return (
    <div
      className={classnames(
        styles.tabs__panelList__panel,
        className,
        classAnimation,
        {
          [styles.hidden]: hidden,
        }
      )}
      role="tabpanel"
    >
      {children}
    </div>
  );
};

Panel.tabType = "Panel";

Panel.propTypes = {
  /**
   * Children elements of Panel component.
   */
  children: PropTypes.node,
  /**
   * Animation class propagated by the parent (Tabs.PanelList)
   */
  classAnimation: PropTypes.string,
  /**
   * Additional classname for Panel component.
   */
  className: PropTypes.string,
  /**
   * If set to true, hide this element. This property is used on when 'dynamic'
   * property on Tabs is set to true to hide or show elements, not to load them.
   */
  hidden: PropTypes.bool,
};

export default Panel;
