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
      setIsScrollingUp(window.scrollY > 500 && window.scrollY < lastWindowY);
      lastWindowY = window.scrollY;
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
      <JobPost gridElement={view === Views.Grid} {...job} />
    ));
  }, [jobs, view]);

  const scrollToTop = useCallback(() => {
    searchRef.current.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <div className={styles.resultList} ref={searchRef}>
      <div className={styles.header}>
        <Typography
          color="gray_2"
          fontWeight={300}
          fontSize={30}
          fontFamily="rubik"
          element="span"
        >
          WE FOUND<Typography fontWeight={700}> {jobs.length || 0} </Typography>
          JOBS THAT MATCH.
        </Typography>
        <div className={styles.header__viewControls}>
          <Button
            variant="sneaky"
            className={styles.icon}
            onClick={() => setView(Views.List)}
          >
            <Icon fontSize={26} icon="list1" />
          </Button>
          <Button
            variant="sneaky"
            className={styles.icon}
            onClick={() => setView(Views.Grid)}
          >
            <Icon fontSize={26} icon="apps" />
          </Button>
        </div>
      </div>
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
        className={`${styles.floatingButton} ${!isScrollingUp && styles.hide}`}
      >
        <Icon icon="chevron-up" />
      </Button>
    </div>
  );
};

export default ResultList;
