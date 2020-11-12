import React from 'react';
import { graphql } from 'gatsby';
import { JobDescription } from '../components/JobDescription';
import Footer from '../components/Footer';
import { Navigation, Button } from '@crocoder-dev/components';
import CrocNav from '../images/croc-nav.svg';
import Layout from '../components/Layout';

export const JobPostTemplate = (props) => {
  const post = props.data.markdownRemark;

  if (!post) {
    return null;
  }
  const {
    title,
    location,
    host,
    companyName,
    url,
    applyUrl,
    timestamp,
    hashtags,
    logoUrl,
    companyWebsite,
  } = post.frontmatter;
  const { html } = post;

  return (
    <Layout>
      <JobDescription
        title={title}
        hashtags={hashtags}
        html={html}
        logoUrl={logoUrl}
        companyName={companyName}
        companyLocation={location}
        companyWebsite={companyWebsite}
        url={url}
        applyUrl={applyUrl}
        timestamp={timestamp}
      />
    </Layout>
  );
};

export const pageQuery = graphql`
  query JobPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        applyUrl
        host
        location
        timestamp
        title
        url
        hashtags
        logoUrl
        companyName
        companyWebsite
      }
    }
  }
`;

export default JobPostTemplate;
