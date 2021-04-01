import React from "react";
import Layout from "../components/Layout";
import MostRecent from "../components/Blog/MostRecent";
import Header from "../components/Blog/Header";
import Posts from "../components/Blog/Posts";

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
      <Header />
      <MostRecent featuredPost={featured} post1={post1} post2={post2} />
      <Posts posts={rest} />
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
