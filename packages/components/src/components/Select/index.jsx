import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "../Button";
import styles from "./index.module.scss";
import Portal from "../Portal";
import Listbox from "../Listbox";
import Typography from "../Typography";
import Option from "./Options";

const Select = ({
  className,
  id,
  title,
  children,
  clearAll,
  confirmChoice,
  multiselect,
}) => {
  const [buttonId] = useState(id || new Date().toString());
  const [open, setOpen] = useState(true);

  const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <div className={classnames(className, styles.select)}>
      <Button id={buttonId} onClick={toggleOpen}>
        {" "}
        Select{" "}
      </Button>
      {open && (
        <Portal
          parentId={buttonId}
          x="center"
          y="bottom"
          className={styles.portal}
        >
          <div className={styles.card}>
            {title && (
              <div className={styles.header}>
                <Typography fontSize={20} color="gray_11" fontWeight={500}>
                  {title}
                </Typography>
              </div>
            )}
            <div className={styles.list}>
              <Listbox
                className={styles.listbox}
                enableMultiselect={multiselect}
              >
                {children}
              </Listbox>
            </div>
            <div className={styles.footer}>
              {multiselect && clearAll && (
                <Button
                  variant="sneaky"
                  onClick={toggleOpen}
                  className={styles.sneaky}
                >
                  <Typography fontSize={16} color="gray_11" fontWeight={500}>
                    Clear all
                  </Typography>
                </Button>
              )}
              {confirmChoice && (
                <Button variant="secondary" onClick={toggleOpen}>
                  Apply
                </Button>
              )}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string,
  confirmChoice: PropTypes.bool,
  multiselect: PropTypes.bool,
  title: PropTypes.string,
  clearAll: PropTypes.bool,
};

Select.defaultProps = {
  confirmChoice: true,
  multiselect: true,
  clearAll: true,
  title: "Fruit",
};

Select.Option = Option;

export default Select;
