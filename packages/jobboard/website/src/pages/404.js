/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Img from 'gatsby-image';
import { graphql, Link } from 'gatsby';
import { Section, Typography } from '@crocoder-dev/components';

const StyledSection = styled(Section)`
  padding-top: 0;
  padding-bottom: 0;
  min-height: calc(100vh - 150px - 81px);

  & > div {
    width: 100%;
  }
`;

const NotFound = ({ data }) => {
  const { title, image, subtitle, homepage } = data.notfoundJson;
  return (
    <Layout pageTitle="404">
      <StyledSection>
        <Img
          style={{ minWidth: '80%', maxWidth: '600px', margin: 'auto' }}
          fadeIn={false}
          fluid={image ? image.childImageSharp.fluid : {}}
          alt={'Page not found.'}
        />
        <Typography
          textAlign="center"
          color="gray_2"
          element="h1"
          style={{ marginTop: 0, marginBottom: 0 }}
        >
          {title}
        </Typography>
        <Typography textAlign="center" fontSize={24} color="gray_2" element="p">
          {subtitle}
        </Typography>
        <Typography
          style={{ margin: '2em', marginBottom: '50px' }}
          textAlign="center"
          color="gray_2"
          element="p"
        >
          <Link to="/" className="link--primary">
            {homepage}
          </Link>
        </Typography>
      </StyledSection>
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
