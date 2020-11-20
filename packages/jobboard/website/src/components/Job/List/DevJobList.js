import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import JobList from './Base';

export const DevJobList = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          sort: { fields: frontmatter___timestamp, order: DESC },
          filter: {frontmatter: {jobType: {eq: "software"}}}
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              title
              location
              hashtags
              logoUrl
              companyName
              summary
            }
          }
        }
      }
    `}
    render={(data) => {
      return (
        <JobList
          jobs={data.allMarkdownRemark.nodes.map((node) => ({
            title: node.frontmatter.title,
            location: node.frontmatter.location,
            jobUrl: node.fields.slug,
            tags: node.frontmatter.hashtags,
            companyLogo: node.frontmatter.logoUrl,
            companyName: node.frontmatter.companyName,
            summary: node.frontmatter.summary,
          }))}
        />
      );
    }}
  />
);
