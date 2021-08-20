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
  Flexbox,
} from '@crocoder-dev/components';
import JobPost from './../Post';
import styles from './index.module.scss';

const Views = Object.freeze({
  List: 'list',
  Grid: 'grid',
});

const ResultList = ({ jobs = [], onPageChange, defaultPage, scrollToJobWithIndex }) => {
  const resultsPerPage = 24;

  const paginationRef = useRef();
  const paginationTopRef = useRef();
  const jobRef = useRef();

  const [maxVisiblePages, setMaxVisiblePages] = useState(7);
  const [view, setView] = useState(Views.Grid);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(() => {
    const pageCount = Math.ceil(jobs.length / resultsPerPage);
    const numericDefaultPage = Math.min(Number(defaultPage) || 1, pageCount);
    return numericDefaultPage > 0 ? numericDefaultPage : 1;
  });

  const searchRef = useRef();

  const { isMobile, isDesktop } = useDevice({
    tablet: styles.limitTablet,
    desktop: styles.limitDesktop,
  }); 

  useEffect(() => {
    if (jobRef.current && scrollToJobWithIndex >= 0) {
      jobRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const scrollHandler = () => {
      // Set scroll up only if window is low enough
      setIsScrollingUp(window.scrollY > 300);
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
    return sliced.map((job, index) => (
      <JobPost
        key={job.slug}
        gridElement={view === Views.Grid}
        jobUrl={job.slug}
        tags={job.hashtags}
        {...job}
        forwardRef={scrollToJobWithIndex === index && jobRef}
      />
    ));
  }, [jobs, view, currentPage]);

  const scrollToTop = useCallback(() => {
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }, []);

  const handleOnPageChange = useCallback(
    (page) => {
      if (page == currentPage) {
        return;
      }

      setCurrentPage(page);
      if (searchRef.current) {
        searchRef.current.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }
      if (onPageChange) {
        onPageChange(page);
      }
    },
    [onPageChange, currentPage]
  );

  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  // On new search jump to page 1 (after first page load)
  useEffect(() => {
    if (pageLoaded) {
      handleOnPageChange(1);
      if (paginationRef.current) {
        paginationRef.current.changePage(1);
        paginationTopRef.current.changePage(1);
      }
      if (searchRef.current) {
        searchRef.current.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }
    }
  }, [jobs]);

  const paginationTop = useMemo(() => {
    const pageCount = Math.ceil(jobs.length / resultsPerPage);
    if (pageCount > 0)
      return (
        <Pagination
          forwardRef={paginationTopRef}
          defaultPage={Number(defaultPage)}
          className={styles.pagination}
          pageCount={pageCount}
          visibleCount={maxVisiblePages}
          onChange={handleOnPageChange}
        />
      );
  }, [maxVisiblePages, jobs.length, defaultPage, handleOnPageChange]);

  const pagination = useMemo(() => {
    const pageCount = Math.ceil(jobs.length / resultsPerPage);
    if (pageCount > 0)
      return (
        <Pagination
          forwardRef={paginationRef}
          defaultPage={Number(defaultPage)}
          className={styles.pagination}
          pageCount={pageCount}
          visibleCount={maxVisiblePages}
          onChange={handleOnPageChange}
        />
      );
  }, [maxVisiblePages, jobs.length, defaultPage, handleOnPageChange]);

  useEffect(() => {
    if (paginationRef.current && paginationTopRef.current) {
      paginationRef.current.changePage(currentPage);
      paginationTopRef.current.changePage(currentPage);
    }
  }, [currentPage]);

  return (
    <>
      <Section className={styles.section}>
        <div className={styles.searchRef} ref={searchRef} />
        <Flexbox
          className={styles.section__foundText}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            color="gray_2"
            fontWeight={300}
            fontSize={26}
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
        </Flexbox>
        <Typography
          color="gray_11"
          fontWeight={300}
          fontSize={18}
          fontFamily="rubik"
          element="span"
        >
          {jobs.length <= 0 && 'SHOWING PAGE ... HMM. NO PAGES HERE.'}
        </Typography>
        <div className={styles.topPagination}>{paginationTop}</div>
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
        {pagination}
        <Button
          onClick={scrollToTop}
          className={`${styles.floatingButton} ${
            !isScrollingUp && styles.hide
          }`}
        >
          <Icon icon="chevron-up" />
        </Button>
      </div>
    </>
  );
};

export default ResultList;
