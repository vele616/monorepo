import React from "react";
import Layout from "../components/Layout";
import MostRecent from "../components/Blog/MostRecent";
import Header from "../components/Blog/Header";
import Posts from "../components/Blog/Posts";
import { Section } from "@crocoder-dev/components";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

export default function Blog({ data }) {
  const nodes = data?.allMarkdownRemark?.edges.map((t) => t.node);

  const posts = nodes.map((n) => ({
    timeToRead: n.timeToRead,
    category: n.frontmatter.category,
    date: n.frontmatter.date,
    description: n.frontmatter.description,
    title: n.frontmatter.title,
    image: n.frontmatter.image,
    slug: n.fields.slug,
  }));

  const [featured, post1, post2, ...rest] = posts;

  return (
    <Layout stickyFooter>
      <Helmet>
        <title>{"Blog | CroCoder"}</title>
        <meta
          content="Tips and ideas to help you learn, build and improve your projects."
          name="description"
        />
        <meta
          content="Tips and ideas to help you learn, build and improve your projects."
          name="twitter:description"
        />
        <meta
          content="Tips and ideas to help you learn, build and improve your projects."
          property="og:description"
        />
      </Helmet>
      <Header />
      <MostRecent featuredPost={featured} post1={post1} post2={post2} />
      <Section>
        <Posts posts={rest} />
      </Section>
    </Layout>
  );
}

export const query = graphql`
  query QueryBlog {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { blog: { eq: true } } }
    ) {
      edges {
        node {
          timeToRead
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
        }
      }
    }
  }
`;
