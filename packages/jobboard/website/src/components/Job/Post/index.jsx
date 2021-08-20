/* eslint-disable react/prop-types */
import React from 'react';
import { Typography, Grid, Card, Icon } from '@crocoder-dev/components';
import HashtagList from '../../HashtagList';
import CompanyLogo from '../../Company/Logo';
import styles from './index.module.scss';

const JobPost = ({
  jobUrl,
  title,
  companyName,
  companyLogo,
  tags,
  summary,
  gridElement,
  forwardRef,
}) => (
  <Grid
    alignItems="center"
    className={`${gridElement && styles.gridElement} ${styles.wrapper}`}
  >
    {forwardRef && <div ref={forwardRef} />}
    <CompanyLogo alt={companyName} src={companyLogo} className={styles.image} />
    <Card narrow className={styles.card}>
      <Grid className={styles.post__content}>
        <CompanyLogo
          alt={companyName}
          src={companyLogo}
          className={styles.mini}
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
        <HashtagList className={styles.tags} tags={tags} />
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
          <a href={jobUrl} className={styles.link} style={{ whiteSpace: 'nowrap' }}>
            VIEW POST <Icon icon="arrow-right" className={styles.icon} />
          </a>
        </Typography>
      </Grid>
    </Card>
  </Grid>
);

export default JobPost;
