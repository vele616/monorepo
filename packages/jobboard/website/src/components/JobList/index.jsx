import React from 'react';
import {
  Typography,
  Flexbox,
  Grid,
  Card,
  Tag,
  Icon,
} from '@crocoder-dev/components';
import styles from './index.module.scss';

const JobPost = ({
  jobUrl,
  title,
  companyName,
  companyLogo,
  tags,
  summary,
}) => (
  <Grid alignItems="center" className={styles.wrapper}>
    <img
      className={
        !!companyLogo ? styles.image : `${styles.image} ${styles.filter}`
      }
      src={companyLogo || '/images/logo.png'}
    />
    <Card narrow className={styles.card}>
      <Grid alignItems="baseline" className={styles.post__content}>
        <img
          className={
            !!companyLogo ? styles.mini : `${styles.mini} ${styles.filter}`
          }
          src={companyLogo || '/images/logo.png'}
        />
        <Typography
          className={styles.company_name}
          fontSize={20}
          fontWeight={700}
          color="gray_11"
        >
          <a href={jobUrl} className={styles.link}>
            {companyName}
          </a>
        </Typography>
        <Typography
          color="gray_2"
          className={styles.job_position}
          fontWeight={700}
          fontSize={26}
        >
          <a href={jobUrl} className={styles.link}>
            {title}
          </a>
        </Typography>
        <Flexbox className={styles.tags}>
          {tags &&
            tags
              .split(' ')
              .filter((t) => t !== '')
              .slice(0, 3)
              .map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </Flexbox>
        <Typography color="gray_2" fontSize={16} className={styles.lorem}>
          {summary}
        </Typography>
        <Typography
          textAlign="right"
          className={styles.post_link}
          fontWeight={700}
          fontSize={18}
          color="green_4"
        >
          <a href={jobUrl} className={styles.link}>
            VIEW POST <Icon icon="arrow-right" className={styles.icon} />
          </a>
        </Typography>
      </Grid>
    </Card>
  </Grid>
);

export const JobList = ({ jobs }) => {
  return jobs.map((job) => <JobPost key={job.jobUrl} {...job} />);
};
