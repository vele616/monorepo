import React from "react";
import { StaticQuery, graphql } from 'gatsby';
import { JobList } from './index';

export const DevJobList = (props) => (
  <StaticQuery
    query={graphql`
  query {
    allMarkdownRemark(sort: {fields: frontmatter___timestamp, order: DESC}) {
    nodes {
      id
      fields {
        slug
      }
      frontmatter {
        title
        location
        hashtags
      }
    }
  }
}
`}
    render={data => {
      return <JobList jobs={data.allMarkdownRemark.nodes.map(node => ({
        title: node.frontmatter.title,
        location: node.frontmatter.location,
        jobUrl: node.fields.slug,
        tags: node.frontmatter.hashtags.replace(/,/gi, ' '),
      }))} />
    }
    }
  />
);
