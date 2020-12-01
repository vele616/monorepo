import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import NewsletterLayout from '../../components/Newsletter/Layout';
import { graphql } from 'gatsby';
import { Location } from '@reach/router';


const Unsubscribe = ({ data, location }) => {
  const {
    unsubscribe
  } = data.newsletterJson;

  const params = new URLSearchParams(location.search);

  const result = unsubscribe[params.get('response')] ? unsubscribe[params.get('response')] : unsubscribe['DEFAULT'];
  
  return (
    <NewsletterLayout image={result.image} buttonText={result.buttonText} title={result.title} subtitle={result.subtitle} text={result.text} />
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
  query unsubscribeQuery {
    newsletterJson {
      unsubscribe {
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