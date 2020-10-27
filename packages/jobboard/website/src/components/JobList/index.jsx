import React from "react";
import { Typography, Flexbox, Grid } from '@crocoder-dev/components';
import styles from './index.module.scss';


const JobPost = ({ jobUrl, title, companyName, companyLogo, location, tags }) => (
  <Grid alignItems="center" className={styles.grid}>
    <img className={!!companyLogo ? styles.image : `${styles.image} ${styles.filter}`} src={companyLogo || "images/logo.png"} />
    <a href={jobUrl} className={styles.link}>
      <Grid alignItems="center" className={styles.text}>
        <Typography className={styles.upper} fontSize={20} color="gray_6">
          {companyName}
        </Typography>
        <Typography color="green_4" className={styles.title} fontWeight={700} fontSize={26}>
          {title}
        </Typography>
       {/*  <Typography
          color="gray_2"
          fontSize={24}
          className={styles.location}
        >
          {location}
        </Typography> */}
        <Flexbox className={styles.tags}>
          {tags}
        </Flexbox>
      </Grid>
    </a>
  </Grid>


);

export const JobList = ({ jobs }) => {
  return jobs.map(job => <JobPost key={job.jobUrl}  {...job} />);
}