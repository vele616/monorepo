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
      if (!allVisible) {
        setControlsLeftVisible(false);
        setControlsRightVisible(true);
      }
    } else if (current >= pageCount - visibleLeftRignt) {
      setFrom(pageCount - visiblePages + 1);
      if (!allVisible) {
        setControlsLeftVisible(true);
        setControlsRightVisible(false);
      }
    } else {
      setFrom(current - visibleLeftRignt);
      if (!allVisible) {
        setControlsLeftVisible(true);
        setControlsRightVisible(true);
      }
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

  const first = useCallback(() => {
    setCurrent(1);
  }, [setCurrent]);

  const last = useCallback(() => {
    setCurrent(pageCount);
  }, [setCurrent, pageCount]);

  const pageButtons = useMemo(
    () =>
      Array.from({ length: visiblePages }, (_, i) => i + from).map((value) => {
        return (
          <PageButton key={value} value={value} onClick={handleOnChange} />
        );
      }),
    [handleOnChange, from, visiblePages]
  );

  const underline = useMemo(() => {
    return (
      pageCount > 0 &&
      pageCount <= visiblePages && (
        <div
          className={styles.pagination__underline}
          style={{ left: `${underlineLeft}px` }}
        />
      )
    );
  }, [pageCount, visiblePages, underlineLeft]);

  useEffect(() => {
    //3 (first margin) + 5 (offset) + (curr-1) * (width + horizontal margins)
    setUnderlineLeft(8 + (current - 1) * 56);
  }, [underline ? current : null]);

  const nextButton = useMemo(() => {
    return (
      controlsRightVisible && <PageButton icon="chevron-right" onClick={next} />
    );
  }, [controlsRightVisible, next]);

  const previousButton = useMemo(() => {
    return (
      controlsLeftVisible && (
        <PageButton icon="chevron-left" onClick={previous} />
      )
    );
  }, [controlsLeftVisible, previous]);

  const firstButton = useMemo(() => {
    return controlsLeftVisible && <PageButton value="1" onClick={first} />;
  }, [controlsLeftVisible, first]);

  const lastButton = useMemo(() => {
    return (
      controlsRightVisible && <PageButton value={pageCount} onClick={last} />
    );
  }, [controlsRightVisible, last, pageCount]);

  return (
    <div className={classnames(styles.pagination, className)}>
      {underline}
      {firstButton}
      {previousButton}
      {pageButtons}
      {nextButton}
      {lastButton}
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
