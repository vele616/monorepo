import React from "react";
import { graphql } from "gatsby";

export const BlogPostSocialTemplate = (props) => {
  const post = props.data.markdownRemark;

  return <div>{post.frontmatter.title}</div>;
};

export const pageQuery = graphql`
  query BlogPostSocialBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;

export default BlogPostSocialTemplate;
