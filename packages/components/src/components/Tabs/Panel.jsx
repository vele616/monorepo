import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.module.scss";

const Panel = ({ className, children, hidden }) => {
  return (
    <div
      className={classnames(styles.tabs__panelList__panel, className, {
        [styles.hidden]: hidden,
      })}
      role="tabpanel"
    >
      {children}
    </div>
  );
};

Panel.tabType = "Panel";

Panel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  hidden: PropTypes.bool,
};

export default Panel;
