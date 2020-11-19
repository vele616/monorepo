import React, { useMemo } from 'react';
import { Section, Icon, Grid, Typography } from '@crocoder-dev/components';
import styles from './index.module.scss';
import GoBackLink from '../../GoBackLink';
import CompanyLogo from '../../Company/Logo';
import TitleWithSummary from './TitleWithSummary';
import VisitWebsite from '../../Company/VisitWebsite';
import HashtagList from '../../HashtagList';

const JobDetails = ({
  title,
  hashtags,
  html,
  logoUrl,
  summary,
  companyName,
  companyWebsite,
  url,
  applyUrl,
}) => {
  const [applyRefUrl, companyWebsiteRef] = useMemo(() => {
    const applyRefUrl = new URL(applyUrl);
    const companyWebsiteRef = new URL(companyWebsite);
    applyRefUrl.searchParams.append('ref', 'jobs.crocoder.dev');
    companyWebsiteRef.searchParams.append('ref', 'jobs.crocoder.dev');
    return [applyRefUrl, companyWebsiteRef];
  }, [url]);

  return (
    <Section style={{ paddingTop: 0 }}>
      <GoBackLink
        className={styles.goBack}
        typographyProps={{
          fontSize: '20px',
          color: 'gray_2',
          style: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          },
        }}
      >
        <Icon icon="arrow-left" /> Go back
      </GoBackLink>
      <Grid className={styles.grid}>
        <div className={styles.image}>
          <CompanyLogo src={logoUrl} />
        </div>
        <Typography
          fontSize="34"
          fontWeight={700}
          color="gray_2"
          className={styles.companyName}
        >
          {companyName}
        </Typography>
        <VisitWebsite
          className={styles.companyWebsite}
          href={companyWebsiteRef}
          hiddenClassName={styles.mobileHide}
        />
        <HashtagList
          alignItems="flex-end"
          justifyContent="flex-end"
          className={styles.tags}
          tags={hashtags}
        />
        <TitleWithSummary title={title} summary={summary} />
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

        {/* TODO Links with button style */}
        <a
          href={applyRefUrl}
          className={`${styles.applyButton} ${styles.linkButton}`}
        >
          Apply for position
        </a>
      </Grid>
      <Typography color="gray_2" element="h3">
        Description
      </Typography>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: html }} />
      <a href={applyRefUrl} className={`${styles.button} ${styles.linkButton}`}>
        Apply for position
      </a>
    </Section>
  );
};

export default JobDetails;
