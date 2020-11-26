import React, { useMemo } from 'react';
import { Section, Icon, Grid, Typography } from '@crocoder-dev/components';
import styles from './index.module.scss';
import CompanyLogo from '../../Company/Logo';
import TitleWithSummary from './TitleWithSummary';
import HashtagList from '../../HashtagList';

const JobSocialDetails = ({
  title,
  hashtags,
  logoUrl,
  summary,
  companyName,
  url,
}) => {
  return (
    <Section backgroundColor="background_base" className={styles.section}>
      <Grid className={styles.grid}>
        <div className={styles.image}>
          <CompanyLogo src={logoUrl} />
        </div>
        <Typography
          fontSize="36"
          fontWeight={700}
          color="gray_2"
          className={styles.companyName}
        >
          {companyName}
        </Typography>
        <HashtagList
          alignItems="flex-end"
          justifyContent="flex-end"
          className={styles.tags}
          tags={hashtags}
        />
        <TitleWithSummary title={title} summary={summary} />
        <Typography
          color="gray_2"
          fontSize={26}
          fontWeight={700}
          className={styles.applyUrl}
        >
          Job post found at{' '}
          <a
            className="link"
            style={{ fontSize: 'inherit' }}
            href={url}
            target="_blank"
            rel="noopener"
          >
            {new URL(url).hostname}
          </a>
        </Typography>
      </Grid>
    </Section>
  );
};

export default JobSocialDetails;
