import React from 'react';
import { graphql } from 'gatsby';
import JobSocialDetails from '../components/Job/Social';

export const JobPostTemplate = (props) => {
  const post = props.data.markdownRemark;

  if (!post) {
    return null;
  }
  const {
    title,
    location,
    companyName,
    url,
    timestamp,
    summary,
    hashtags,
    logoUrl,
  } = post.frontmatter;

  return (
      <JobSocialDetails
        title={title}
        hashtags={hashtags}
        logoUrl={logoUrl}
        companyName={companyName}
        summary={summary}
        companyLocation={location}
        url={url}
        timestamp={timestamp}
      />
  );
};

export const pageQuery = graphql`
  query JobPostSocialBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
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
