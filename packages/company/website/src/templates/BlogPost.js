import React from "react";
import { graphql } from "gatsby";
import Header from "../components/Blog/Content/Header";
import Body from "../components/Blog/Content/Body";
import About from "../components/Blog/Content/About";
import Layout from "../components/Layout";
import SimiliarPosts from "../components/Blog/Content/SimiliarPosts";
import { Helmet } from "react-helmet";
import { JSONLDType } from "../components/Head/jsonld";

export const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { siteUrl } = data.site.siteMetadata;
  const { author, similiarPosts } = pageContext;
  const posts = similiarPosts.map((p) => ({
    id: p.id,
    image: p.frontmatter.image,
    category: p.frontmatter.category,
    title: p.frontmatter.title,
    slug: p.fields.slug,
  }));
  const article = {
    author,
    headline: post.frontmatter.title,
    imageUrl: post.frontmatter.image.publicURL,
    datePublished: post.frontmatter.date,
    dateUpdated: post.frontmatter.date,
    slug: post.fields.slug,
    about: post.frontmatter.description,
    abstract: post.frontmatter.abstract,
    //articleBody: post.html,
  };
  return (
    <Layout jsonldType={JSONLDType.ARTICLE} article={article} stickyFooter>
      <Helmet>
        <title>{`${post.frontmatter.title} | ${post.frontmatter.category}`}</title>
        <meta
          content={`${post.frontmatter.title} | ${post.frontmatter.category}`}
          name="twitter:text:title"
        />
        <meta
          content={`${post.frontmatter.title} | ${post.frontmatter.category}`}
          property="og:title"
        />
        <meta content={post.frontmatter.description} name="description" />
        <meta
          content={post.frontmatter.description}
          name="twitter:description"
        />
        <meta
          content={post.frontmatter.description}
          property="og:description"
        />
        <meta
          content={`${siteUrl}${post.frontmatter.image.publicURL}`}
          name="twitter:image"
        />
        <meta
          content={`${siteUrl}${post.frontmatter.image.publicURL}`}
          property="og:image"
        />
      </Helmet>
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
    site {
      siteMetadata {
        siteUrl
      }
    }
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
        abstract
        image {
          publicURL
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
