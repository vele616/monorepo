import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import Layout from '../../components/Layout';
import { graphql } from 'gatsby';
import { Location } from '@reach/router';

const Unsubscribe = ({ data, location }) => {
  const {
    unsubscribe,
  } = data.newsletterJson;

  const params = new URLSearchParams(location.search);

  const message = unsubscribe[params.get('response')] ? unsubscribe[params.get('response')] : unsubscribe['DEFAULT'];

  return (
    <Layout stickyFooter>
      {message}
    </Layout>
  );
};

const UnsubscribePage = (props) => (
  <Location>
    {({ location }) => (
      <Unsubscribe {...props} location={location}  ></Unsubscribe>
    )}
  </Location>
);

export default UnsubscribePage;

export const query = graphql`
  query unsubscribeQuery {
    newsletterJson {
      unsubscribe {
        SUCCESS
        DEFAULT
      }
    }
  }
`;