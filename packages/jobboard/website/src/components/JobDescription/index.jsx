import React from 'react';
import { Link } from 'gatsby';
import {
  Section,
  Tag,
  Flexbox,
  Button,
  Icon,
  Grid,
  Typography,
} from '@crocoder-dev/components';
import styles from './index.module.scss';

export const JobDescription = ({
  title,
  hashtags,
  html,
  logoUrl,
  summary,
  companyName,
  companyWebsite,
  timestamp,
  url,
  applyUrl,
}) => {
  const refUrl = new URL(url);
  const applyRefUrl = new URL(applyUrl);
  const companyWebsiteRef = new URL(companyWebsite);
  refUrl.searchParams.append('ref', 'jobs.crocoder.dev');
  applyRefUrl.searchParams.append('ref', 'jobs.crocoder.dev');
  companyWebsiteRef.searchParams.append('ref', 'jobs.crocoder.dev');
  return (
    <Section style={{ paddingTop: 0 }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Typography
          fontSize="20px"
          color="gray_2"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <Icon icon="arrow-left" /> Back to list
        </Typography>
      </Link>

      <Grid className={styles.grid}>
        <div
          className={
            !!logoUrl ? styles.image : `${styles.image} ${styles.filter}`
          }
        >
          <img src={logoUrl || '/images/logo.png'} />
        </div>
        <Typography
          fontSize="34"
          fontWeight={700}
          color="gray_2"
          className={styles.companyName}
        >
          {companyName}
        </Typography>
        <Typography className={styles.companyWebsite}>
          <a href={companyWebsite} className="link">
            Visit <span className={styles.mobileHide}>company</span> site{' '}
            <span className={styles.mobileHide}> </span>
            <Icon className={styles.mobileHide} icon="forward" />
          </a>
        </Typography>
        <Flexbox
          alignItems="flex-end"
          justifyContent="flex-end"
          className={styles.tags}
        >
          {hashtags &&
            hashtags
              .split(',')
              .filter((t) => t !== '')
              .slice(0, 3)
              .map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </Flexbox>
        <div className={styles.title}>
          <Typography color="gray_2" element="h2" className={styles.noMargin}>
            {title}
          </Typography>
          <Typography fontSize="24" color="gray_2">
            {summary}
          </Typography>
        </div>

        <Typography
          color="gray_2"
          fontSize={20}
          fontWeight={700}
          className={styles.applyUrl}
        >
          Job post found at{' '}
          <a
            className="link"
            style={{ fontSize: 'inherit' }}
            href={applyRefUrl}
          >
            {applyRefUrl.hostname}
          </a>
        </Typography>
        <Button className={styles.applyButton}>
          {' '}
          <a
            style={{
              fontSize: 'inherit',
              color: 'inherit',
              textDecoration: 'none',
            }}
            href={applyRefUrl}
          >
            Apply for position
          </a>
        </Button>
      </Grid>
      <Typography color="gray_2" element="h3">
        Description
      </Typography>

      <div className={styles.text} dangerouslySetInnerHTML={{ __html: html }} />
      <Button className={styles.button}>
        <a
          style={{
            fontSize: 'inherit',
            color: 'inherit',
            textDecoration: 'none',
          }}
          href={applyRefUrl}
        >
          Apply for position
        </a>
      </Button>
    </Section>
  );
};
