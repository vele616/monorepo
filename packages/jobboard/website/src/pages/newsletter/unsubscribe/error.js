/* eslint-disable react/prop-types */
import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import NewsletterLayout from '../../../components/Newsletter/Layout';
import { graphql } from 'gatsby';
import { Location } from '@reach/router';

const Unsubscribe = ({ data }) => {
  const { unsubscribe } = data.newsletterJson;

  const result = unsubscribe['DEFAULT'];

  return (
    <NewsletterLayout
      image={result.image}
      buttonText={result.buttonText}
      buttonLinkTo={result.buttonLinkTo}
      title={result.title}
      subtitle={result.subtitle}
      text={result.text}
    />
  );
};

const UnsubscribePage = (props) => (
  <Location>
    {({ location }) => (
      <Unsubscribe {...props} location={location}></Unsubscribe>
    )}
  </Location>
);

export default UnsubscribePage;

export const query = graphql`
  query unsubscribeErrorQuery {
    newsletterJson {
      unsubscribe {
        DEFAULT {
          ref
          title
          titleColor
          subtitle
          text
          buttonText
          buttonLinkTo
          image {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
