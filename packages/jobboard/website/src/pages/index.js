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

const StyledLink = styled(Link)``;

const IndexPage = ({ data }) => {
  const subscribeRef = useRef(null);

  const scrollToSubscribe = useCallback(() => {
    console.log('click', subscribeRef.current);
    subscribeRef &&
      subscribeRef.current &&
      subscribeRef.current.scrollIntoView();
  }, []);

  const { nodes } = data.allMarkdownRemark;
  const softwareJobsNumber = nodes.filter(
    (t) => t.frontmatter.jobType === 'software'
  ).length;
  const otherJobsNumber = nodes.filter((t) => t.frontmatter.jobType === 'other')
    .length;

  return (
    <Layout>
      <Hero scrollToSubscribe={scrollToSubscribe} />
      <JobSection title="Software Developer Jobs">
        <DevJobListLimit12 />
        {softwareJobsNumber > 12 && (
          <div style={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
          }}>
            <StyledLink
              className={'link--secondary'}
              to="/software-developer-jobs"
            >
              {`VIEW ${softwareJobsNumber - 12} MORE DEVELOPER JOBS`}
            </StyledLink>
          </div>
        )}
      </JobSection>

      <PostAJob />

      <Newsletter subscribeRef={subscribeRef} />
      <JobSection title="Other IT Related Jobs">
        <OtherJobListLimit12 />
        {otherJobsNumber > 12 && (
          <div style={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
          }}>
            <StyledLink className={'link--secondary'} to="/other-it-jobs">
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
    allMarkdownRemark {
      nodes {
        frontmatter {
          jobType
        }
      }
    }
  }
`;
