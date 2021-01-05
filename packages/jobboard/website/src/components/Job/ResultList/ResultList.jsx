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
    if (view === Views.List || isMobile) return '1fr';
    if (isDesktop) return '1fr 1fr';
    return '1fr 1fr 1fr';
  }, [view, isDesktop]);

  const jobPosts = useMemo(() => {
    return jobs.map((job) => (
      <JobPost
        key={job.slug}
        gridElement={view === Views.Grid}
        jobUrl={job.slug}
        tags={job.hashtags}
        {...job}
      />
    ));
  }, [jobs, view]);

  const scrollToTop = useCallback(() => {
    searchRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, []);

  const jobsCountText = useMemo(() => {
    if (jobs.length) {
      return (
        <>
          WE FOUND
          <Typography fontWeight={700}> {jobs.length} </Typography>
          JOB{jobs.length !== 1 ? 'S' : ''} THAT MATCH.
        </>
      );
    }
    return 'WE CANNOT FIND ANY JOBS THAT MATCH THIS QUERY.';
  }, [jobs.length]);

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
          {jobsCountText}
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
      <div className={styles.resultList}>
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
      </div>
    </>
  );
};

export default ResultList;
