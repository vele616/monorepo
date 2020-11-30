import React, { useMemo, useState, useCallback, useEffect } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import PageButton from "./PageButton";

const Pagination = ({
  onChange,
  pageCount = 1,
  visibleCount = 7,
  className,
}) => {
  const visiblePages = useMemo(() => Math.min(pageCount, visibleCount), [
    pageCount,
    visibleCount,
  ]);

  const visibleLeftRignt = useMemo(() => Math.floor(visiblePages / 2), [
    visiblePages,
  ]);

  const [from, setFrom] = useState(1);
  const [current, setCurrent] = useState(1);
  const [underlineLeft, setUnderlineLeft] = useState(3);

  const [controlsLeftVisible, setControlsLeftVisible] = useState(false);
  const [controlsRightVisible, setControlsRightVisible] = useState(false);

  const allVisible = useMemo(() => {
    return pageCount <= visiblePages;
  }, [pageCount, visiblePages]);

  useEffect(() => {
    if (current <= 1 + visibleLeftRignt) {
      setFrom(1);
    } else if (current >= pageCount - visibleLeftRignt) {
      setFrom(pageCount - visiblePages + 1);
    } else {
      setFrom(current - visibleLeftRignt);
    }
    if (onChange) onChange(current);
  }, [
    visiblePages,
    visibleLeftRignt,
    pageCount,
    current,
    setFrom,
    onChange,
    allVisible,
  ]);

  useEffect(() => {
    setControlsLeftVisible(current > 1);
    setControlsRightVisible(current < pageCount);
  }, !allVisible && [current, pageCount]);

  const handleOnChange = useCallback(
    (value) => {
      setCurrent(value);
    },
    [setCurrent]
  );

  const next = useCallback(() => {
    if (current < pageCount) setCurrent((prev) => prev + 1);
  }, [setCurrent, pageCount, current]);

  const previous = useCallback(() => {
    if (current > 1) setCurrent((prev) => prev - 1);
  }, [setCurrent, current]);

  const pageButtons = useMemo(
    () =>
      Array.from({ length: visiblePages }, (_, i) => i + from).map((index) => {
        const active = allVisible ? false : current === index;
        return (
          <PageButton
            active={active}
            key={index}
            value={index}
            onClick={handleOnChange}
          />
        );
      }),
    [visiblePages, from, allVisible, current, handleOnChange]
  );

  const underline = useMemo(() => {
    return (
      allVisible && (
        <div
          className={styles.pagination__underline}
          style={{ left: `${underlineLeft}px` }}
        />
      )
    );
  }, [allVisible, underlineLeft]);

  useEffect(() => {
    // 3 (first margin) + 10 (offset) + (curr-1) * (width + horizontal margins)
    setUnderlineLeft(13 + (current - 1) * 56);
  }, [underline ? current : null]);

  return (
    <div className={classnames(styles.pagination, className)}>
      <div
        className={classnames(styles.pagination__controls, {
          [styles.visible]: controlsLeftVisible,
          [styles.hidden]: allVisible,
        })}
      >
        <PageButton icon="chevron-left" onClick={previous} />
      </div>
      {pageButtons}
      <div
        className={classnames(styles.pagination__controls, {
          [styles.visible]: controlsRightVisible,
          [styles.hidden]: allVisible,
        })}
      >
        <PageButton icon="chevron-right" onClick={next} />
      </div>
      {underline}
    </div>
  );
};

Pagination.propTypes = {
  /**
   *
   */
  onChange: PropTypes.func,
  /**
   *
   */
  pageCount: PropTypes.number,
  /**
   *
   */
  visibleCount: PropTypes.number,
  /**
   *
   */
  className: PropTypes.string,
};

export default Pagination;
