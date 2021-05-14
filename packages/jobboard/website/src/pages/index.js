/* eslint-disable react/prop-types */
import React, { useRef, useCallback } from 'react';
import '@crocoder-dev/components/lib/main.css';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { DevJobListLimit12, OtherJobListLimit12 } from '../components/Job/List';
import JobSection from '../components/Job/Section';
import Hero from '../components/Hero';
import Banner from '../components/ContactBanner';
import Newsletter from '../components/Newsletter';
import Layout from '../components/Layout';
import { graphql } from 'gatsby';
import PostAJob from '../components/PostAJob';
import styles from './index.module.scss';

const StyledLink = styled(Link)``;

const IndexPage = ({ data }) => {
  const subscribeRef = useRef(null);

  const topRef = useRef(null);

  const scrollToTop = () => topRef.current.scrollIntoView({ block: 'end' });

  const scrollToSubscribe = useCallback(() => {
    subscribeRef &&
      subscribeRef.current &&
      subscribeRef.current.scrollIntoView();
  }, []);

  const { group } = data.allMarkdownRemark;
  const [otherJobs, softwareJobs] = group;

  const otherJobsNumber = otherJobs.totalCount;
  const softwareJobsNumber = softwareJobs.totalCount;

  return (
    <Layout scrollToTop={scrollToTop}>
      <Hero topRef={topRef} scrollToSubscribe={scrollToSubscribe} />
      <JobSection title="Remote Software Developer Jobs">
        <DevJobListLimit12 />
        {softwareJobsNumber > 12 && (
          <div
            style={{
              width: '100%',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <StyledLink
              className={`link--secondary ${styles.link}`}
              to="/software-developer-jobs"
              state={{ linkFromIndex: true }}
            >
              {`VIEW ${softwareJobsNumber - 12} MORE DEVELOPER JOBS`}
            </StyledLink>
          </div>
        )}
      </JobSection>

      <PostAJob />

      <Newsletter subscribeRef={subscribeRef} />
      <JobSection title="All other remote IT Jobs">
        <OtherJobListLimit12 />
        {otherJobsNumber > 12 && (
          <div
            style={{
              width: '100%',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <StyledLink
              className={`link--secondary ${styles.link}`}
              to="/other-it-jobs"
              state={{ linkFromIndex: true }}
            >
              {`VIEW ${otherJobsNumber - 12} MORE IT RELATED JOBS`}
            </StyledLink>
          </div>
        )}
      </JobSection>
      <Banner />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query indexQuery {
    allMarkdownRemark(sort: { fields: frontmatter___jobType }) {
      group(field: frontmatter___jobType) {
        fieldValue
        totalCount
      }
    }
  }
`;
