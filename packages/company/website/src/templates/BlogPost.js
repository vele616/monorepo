import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

export const BlogPostTemplate = (props) => {
  const post = props.data.markdownRemark;

  return (
    <div>
      <Img
        fadeIn={false}
        fluid={
          post?.frontmatter.image
            ? post?.frontmatter.image.childImageSharp.fluid
            : {}
        }
        alt={post.frontmatter.title}
        style={{}}
      />
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        category
        date
        description
        title
        image {
          childImageSharp {
            fluid(maxHeight: 1200, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      timeToRead
    }
  }
`;

export default BlogPostTemplate;
