import React from 'react';
import Layout from '../components/Layout';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import { Section, Typography, Button } from '@crocoder-dev/components';

const NotFound = ({ data }) => {
  const { title, image, subtitle, homepage } = data.notfoundJson;
  return (
    <Layout pageTitle="404">
      <Section>
        <Img
          fadeIn={false}
          fluid={image ? image.childImageSharp.fluid : {}}
          alt={'Page not found.'}
        />
        <Typography
          element="h1"
        >
          {title}
        </Typography>
        <Typography
          element="h2"
        >
          {subtitle}
        </Typography>
        <Typography
          element="p"
        >
          <Link to="/">
            <Button color="primary">{homepage}</Button>
          </Link>
        </Typography>
      </Section>
    </Layout>
  );
};

export default NotFound;

export const query = graphql`
  query Query404 {
    notfoundJson {
      title
      subtitle
      homepage
      image {
        childImageSharp {
          fluid(maxHeight: 700, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`;