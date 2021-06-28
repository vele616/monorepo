import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import JobList from './Base';

export const OtherJobList = ({ scrollToJobWithIndex }) => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          sort: {
            fields: [frontmatter___timestamp, frontmatter___featured]
            order: DESC
          }
          filter: {
            frontmatter: { jobType: { eq: "other" }, archived: { ne: "true" } }
          }
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
              timestamp
            }
          }
        }
      }
    `}
    render={(data) => {
      const bod = new Date();
      bod.setHours(0, 0, 0, 0);
      return (
        <JobList
          scrollToJobWithIndex={scrollToJobWithIndex}
          jobs={data.allMarkdownRemark.nodes
            .filter((node) => node.frontmatter.timestamp <= bod.getTime())
            .map((node) => ({
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
