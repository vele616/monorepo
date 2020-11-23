import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import Layout from '../../components/Layout';
import { graphql } from 'gatsby';
import { Location } from '@reach/router';

const Subscribe = ({ data, location }) => {
  const {
    subscribe,
  } = data.newsletterJson;

  const params = new URLSearchParams(location.search);

  const message = subscribe[params.get('response')] ? subscribe[params.get('response')] : subscribe['DEFAULT'];

  return (
    <Layout stickyFooter>
      {message}
    </Layout>
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
        ALREADY_CONFIRMED
        SUCCESS
        DEFAULT
      }
    }
  }
`;