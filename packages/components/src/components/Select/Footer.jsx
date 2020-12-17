import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import Typography from "../Typography";
import Button from "../Button";

const Footer = ({
  clear,
  clearSelection,
  multiselect,
  clearText,
  clearAllText,
  confirmChoice,
  confirmTemporarySelection,
  applyText,
}) => (
  <div className={styles.footer}>
    {clear && (
      <Button
        variant="sneaky"
        onClick={clearSelection}
        className={styles.footer__clear}
      >
        <Typography fontSize={16} color="contrast" fontWeight={500}>
          {!multiselect && clearText}
          {multiselect && clearAllText}
        </Typography>
      </Button>
    )}
    {confirmChoice && (
      <Button variant="secondary" onClick={confirmTemporarySelection}>
        {applyText}
      </Button>
    )}
  </div>
);

Footer.propTypes = {
  applyText: PropTypes.string,
  clearText: PropTypes.string,
  clearAllText: PropTypes.string,
  confirmChoice: PropTypes.bool,
  clear: PropTypes.bool,
  multiselect: PropTypes.bool,
  clearSelection: PropTypes.func,
  confirmTemporarySelection: PropTypes.func,
};

Footer.displayName = "Select.Footer";
export default Footer;
