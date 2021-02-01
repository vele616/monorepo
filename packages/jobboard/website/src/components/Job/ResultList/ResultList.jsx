/* eslint-disable react/prop-types */
import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {
  Typography,
  Grid,
  Icon,
  Button,
  useDevice,
  Section,
  Pagination,
} from '@crocoder-dev/components';
import JobPost from './../Post';
import styles from './index.module.scss';

const Views = Object.freeze({
  List: 'list',
  Grid: 'grid',
});

const ResultList = ({ jobs = [] }) => {
  const [view, setView] = useState(Views.List);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const resultsPerPage = 24;
  const [maxVisiblePages, setMaxVisiblePages] = useState(7);

  const searchRef = useRef();

  const { isMobile, isDesktop } = useDevice({
    tablet: styles.limitTablet,
    desktop: styles.limitDesktop,
  });

  useEffect(() => {
    let lastWindowY = window.scrollY;
    const scrollHandler = () => {
      // Set scroll up only if window is low enough
      setIsScrollingUp(window.scrollY > 500 && window.scrollY < lastWindowY);
      // Ignore small changes
      if (
        lastWindowY < window.scrollY - 100 ||
        lastWindowY > window.scrollY + 100
      ) {
        lastWindowY = window.scrollY;
      }
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  const columns = useMemo(() => {
    if (isMobile) setMaxVisiblePages(4);
    else setMaxVisiblePages(7);

    if (view === Views.List || isMobile) {
      return '1fr';
    }
    if (isDesktop) {
      return '1fr 1fr';
    }
    return '1fr 1fr 1fr';
  }, [view, isDesktop, isMobile]);

  const jobPosts = useMemo(() => {
    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    const sliced = jobs.slice(start, end);
    return sliced.map((job) => (
      <JobPost
        key={job.slug}
        gridElement={view === Views.Grid}
        jobUrl={job.slug}
        tags={job.hashtags}
        {...job}
      />
    ));
  }, [jobs, view, currentPage]);

  const scrollToTop = useCallback(() => {
    searchRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, []);

  const handleOnPageChange = useCallback((page) => {
    setCurrentPage(page);
    searchRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, []);

  const pagination = useMemo(() => {
    const pageCount = Math.ceil(jobs.length / resultsPerPage);
    if (pageCount > 0)
      return (
        <Pagination
          className={styles.pagination}
          pageCount={pageCount}
          visibleCount={maxVisiblePages}
          onChange={handleOnPageChange}
        />
      );
  }, [maxVisiblePages, jobs]);

  return (
    <>
      <div ref={searchRef} />
      <Section className={styles.section}>
        <Typography
          color="gray_2"
          fontWeight={300}
          fontSize={30}
          fontFamily="rubik"
          element="span"
        >
          {jobs.length > 0 ? (
            <>
              WE FOUND
              <Typography fontWeight={700}> {jobs.length} </Typography>
              JOB{jobs.length !== 1 ? 'S' : ''} THAT MATCH.
            </>
          ) : (
            'WE CANNOT FIND ANY JOBS THAT MATCH THIS QUERY.'
          )}
        </Typography>
        {(jobs && jobs.length && (
          <div className={styles.section__viewControls}>
            <Button
              variant="sneaky"
              title="List view"
              className={styles.icon}
              onClick={() => setView(Views.List)}
            >
              <Icon fontSize={26} icon="list1" />
            </Button>
            <Button
              variant="sneaky"
              title="Grid view"
              className={styles.icon}
              onClick={() => setView(Views.Grid)}
            >
              <Icon fontSize={26} icon="apps" />
            </Button>
          </div>
        )) ||
          ''}
      </Section>
      <div key={jobs} className={styles.resultList}>
        <Grid
          className={styles.resultList__grid}
          justifyItems="center"
          rowGap="30px"
          columnGap="40px"
          columns={columns}
        >
          {jobPosts}
        </Grid>
        <Button
          onClick={scrollToTop}
          className={`${styles.floatingButton} ${
            !isScrollingUp && styles.hide
          }`}
        >
          <Icon icon="chevron-up" />
        </Button>
        {pagination}
      </div>
    </>
  );
};

export default ResultList;
