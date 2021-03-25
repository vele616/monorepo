import React from "react";
import Layout from "../components/Layout";
import BlogHeader from "../components/Blog/Header";

export default function Blog({ data }) {
  const { big, small1, small2 } = data.blogJson;

  return (
    <Layout stickyFooter>
      <BlogHeader featured={big} post1={small1} post2={small2} />
    </Layout>
  );
}

export const query = graphql`
  query QueryBlog {
    blogJson {
      big {
        childImageSharp {
          fluid(maxHeight: 700, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      small1 {
        childImageSharp {
          fluid(maxHeight: 700, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      small2 {
        childImageSharp {
          fluid(maxHeight: 700, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`;
