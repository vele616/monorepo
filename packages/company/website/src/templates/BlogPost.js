import React from "react";
import { graphql } from "gatsby";
import Header from "../components/Blog/Content/Header";
import Body from "../components/Blog/Content/Body";
import Layout from "../components/Layout";

export const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { author } = pageContext;
  return (
    <Layout stickyFooter>
      <Header
        author={author}
        image={post.frontmatter.image}
        title={post.frontmatter.title}
      />
      <Body html={post.html} htmlAst={post.htmlAst} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      htmlAst
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
