import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import NewsletterLayout from '../../components/Newsletter/Layout';
import { graphql } from 'gatsby';
import { Location } from '@reach/router';

const Subscribe = ({ data, location }) => {
  const {
    subscribe
  } = data.newsletterJson;

  const params = new URLSearchParams(location.search);

  const result = subscribe[params.get('response')] ? subscribe[params.get('response')] : subscribe['DEFAULT'];
  
  return (
    <NewsletterLayout isSubscribeSuccess={result.ref === 'SUCCESS'} image={result.image} buttonText={result.buttonText} title={result.title} subtitle={result.subtitle} text={result.text} />
  );
};

const SubscribePage = (props) => (
  <Location>
    {({ location }) => (
      <Subscribe {...props} location={location}  ></Subscribe>
    )}
  </Location>
);

export default SubscribePage;

export const query = graphql`
  query subscribeQuery {
    newsletterJson {
      subscribe {
        ALREADY_CONFIRMED {
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
        SUCCESS {
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