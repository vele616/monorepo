import React from "react";
import { graphql } from "gatsby";
import Header from "../components/Blog/Content/Header";
import Body from "../components/Blog/Content/Body";
import About from "../components/Blog/Content/About";
import Layout from "../components/Layout";
import SimiliarPosts from "../components/Blog/Content/SimiliarPosts";

export const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { author, similiarPosts } = pageContext;
  const posts = similiarPosts.map((p) => ({
    id: p.id,
    image: p.frontmatter.image,
    category: p.frontmatter.category,
    title: p.frontmatter.title,
    slug: p.fields.slug,
  }));
  return (
    <Layout stickyFooter>
      <Header
        author={author}
        image={post.frontmatter.image}
        title={post.frontmatter.title}
      />
      <Body html={post.html} htmlAst={post.htmlAst} />
      <About author={author} />
      <SimiliarPosts posts={posts} />
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
