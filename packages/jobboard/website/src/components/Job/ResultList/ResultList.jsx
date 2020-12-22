/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
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

  const { isMobile, isDesktop } = useDevice({
    tablet: styles.limitTablet,
    desktop: styles.limitDesktop,
  });

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

  return (
    <div className={styles.resultList}>
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
    </div>
  );
};

export default ResultList;
