import React from 'react';
import styled from "styled-components";
import { StaticQuery, graphql } from 'gatsby';

const Section = styled.section`
  padding: 0%;
`;

const Footer = () => {

  return (
    <Section>
      I FOOTER
    </Section>
  )
};

const FooterWithQuery = () => (
  <StaticQuery
    query={graphql`
    query {
      homeJson {
        Footer {
          title
          titleEmphasis
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `}
    render={data => (<Footer {...data.homeJson.Footer} />)}
  />
);

export default FooterWithQuery;