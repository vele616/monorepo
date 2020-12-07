import React from 'react';
import { graphql } from 'gatsby';
import JobDetails from '../components/Job/Details';
import Layout from '../components/Layout';

export const JobPostTemplate = (props) => {
  const post = props.data.markdownRemark;

  if (!post) {
    return null;
  }
  const { slug } = post.fields;
  const social = /\/jobs\/(.*)\//g.exec(slug)[1];
  const socialUrl = `social/${social}.png`;

  const {
    title,
    location,
    host,
    companyName,
    url,
    applyUrl,
    timestamp,
    summary,
    hashtags,
    logoUrl,
    companyWebsite,
  } = post.frontmatter;
  const { html } = post;

  return (
    <Layout head={{
      title,
      description: summary,
      socialImageUrl: socialUrl,
    }}>
      <JobDetails
        title={title}
        hashtags={hashtags}
        html={html}
        logoUrl={logoUrl}
        companyName={companyName}
        summary={summary}
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
      fields {
        slug
      }
      frontmatter {
        applyUrl
        host
        location
        summary
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
