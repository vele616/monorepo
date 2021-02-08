import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import PageButton from "./PageButton";

const Pagination = ({
  defaultPage = 1,
  onChange,
  pageCount = 1,
  visibleCount = 7,
  className,
  forwardRef,
}) => {
  const paginationRef = useRef();

  const visiblePages = useMemo(() => Math.min(pageCount, visibleCount), [
    pageCount,
    visibleCount,
  ]);

  const visibleLeftRignt = useMemo(() => Math.floor(visiblePages / 2), [
    visiblePages,
  ]);

  const [startingIndex, setStartingIndex] = useState(1);

  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [underlineLeft, setUnderlineLeft] = useState(3);

  const [controlsLeftVisible, setControlsLeftVisible] = useState(false);
  const [controlsRightVisible, setControlsRightVisible] = useState(false);

  const allVisible = useMemo(() => {
    return pageCount <= visiblePages;
  }, [pageCount, visiblePages]);

  const updateStartingIndex = useCallback(
    (value) => {
      if (value <= 1 + visibleLeftRignt) {
        setStartingIndex(1);
      } else if (value >= pageCount - visibleLeftRignt) {
        setStartingIndex(pageCount - visiblePages + 1);
      } else {
        setStartingIndex(value - visibleLeftRignt);
      }
      if (onChange) onChange(value);
    },
    [onChange, pageCount, visibleLeftRignt, visiblePages]
  );

  const [current, setCurrent] = useState(() => {
    let page = defaultPage;

    if (defaultPage <= 0) {
      page = 1;
    } else if (defaultPage >= pageCount) {
      page = pageCount;
    }

    updateStartingIndex(page);
    return page;
  });

  useEffect(() => {
    if (!allVisible) {
      setControlsLeftVisible(current > 1);
      setControlsRightVisible(current < pageCount);
    }
  }, [allVisible, current, pageCount]);

  const handleOnChange = useCallback(
    (value) => {
      if (value > 0 && value <= pageCount) {
        setCurrent(value);
        updateStartingIndex(value);
      }
    },
    [pageCount, updateStartingIndex]
  );

  const next = useCallback(() => {
    if (current < pageCount) {
      const value = current + 1;
      setCurrent(value);
      updateStartingIndex(value);
    }
  }, [current, pageCount, updateStartingIndex]);

  const previous = useCallback(() => {
    if (current > 1) {
      const value = current - 1;
      setCurrent(value);
      updateStartingIndex(value);
    }
  }, [current, updateStartingIndex]);

  const handleOnSelected = useCallback((width) => {
    setUnderlineWidth(width);
  }, []);

  useEffect(() => {
    const offset = allVisible ? 0 : 1;
    setUnderlineLeft(
      8 + (((current - startingIndex) % visiblePages) + offset) * underlineWidth
    );
  }, [allVisible, current, startingIndex, underlineWidth, visiblePages]);

  useImperativeHandle(forwardRef, () => {
    return {
      changePage: handleOnChange,
    };
  });

  return (
    <div
      ref={paginationRef}
      className={classnames(styles.pagination, className)}
    >
      <div
        className={classnames(styles.pagination__controls, {
          [styles.visible]: controlsLeftVisible,
          [styles.hidden]: allVisible,
        })}
      >
        <PageButton icon="chevron-left" onClick={previous} />
      </div>
      {Array.from({ length: visiblePages }, (_, i) => i + startingIndex).map(
        (index) => (
          <PageButton
            key={index}
            value={index}
            onClick={handleOnChange}
            selected={index === current}
            onSelected={handleOnSelected}
          />
        )
      )}
      <div
        className={classnames(styles.pagination__controls, {
          [styles.visible]: controlsRightVisible,
          [styles.hidden]: allVisible,
        })}
      >
        <PageButton icon="chevron-right" onClick={next} />
      </div>
      <div
        className={styles.pagination__underline}
        style={{ left: `${underlineLeft}px` }}
      />
    </div>
  );
};

Pagination.propTypes = {
  /**
   * This page is selected when Pagination is created. If default page is larger than page count, last page will be selected.
    If default page number is smaller than 1, first page will be selected.
   */
  defaultPage: PropTypes.number,
  /**
   * onChange function will fire on every page selection change.
   */
  onChange: PropTypes.func,
  /**
   * Reference that can be passed to Pagination. This reference will expose
   * changePage function so it can be used by other components.
   */
  forwardRef: PropTypes.objectOf(PropTypes.object),
  /**
   * Total number of pages.
   */
  pageCount: PropTypes.number,
  /**
   * Indicates how many pages can be seen at once.
   * If visible count is 3 pagination component will show:
   * < 1 2 3 >
   * If visible count is 5 pagination component will show:
   * < 1 2 3 4 5 >
   */
  visibleCount: PropTypes.number,
  /**
   * Additional classname for div wrapper around buttons.
   */
  className: PropTypes.string,
};

export default Pagination;
