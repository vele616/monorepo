/* eslint-disable react/prop-types */
import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import NewsletterLayout from '../../../components/Newsletter/Layout';
import { graphql } from 'gatsby';
import { Location } from '@reach/router';

const Subscribe = ({ data }) => {
  const { subscribe } = data.newsletterJson;

  const result = subscribe['DEFAULT'];

  return (
    <NewsletterLayout
      isSubscribeSuccess={result.ref === 'SUCCESS'}
      image={result.image}
      buttonText={result.buttonText}
      title={result.title}
      subtitle={result.subtitle}
      text={result.text}
      titleColor={result.titleColor}
    />
  );
};

const SubscribePage = (props) => (
  <Location>
    {({ location }) => <Subscribe {...props} location={location}></Subscribe>}
  </Location>
);

export default SubscribePage;

export const query = graphql`
  query subscribeErrorQuery {
    newsletterJson {
      subscribe {
        DEFAULT {
          ref
          title
          titleColor
          subtitle
          text
          buttonText
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
