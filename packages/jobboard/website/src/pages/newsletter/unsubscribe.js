import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import Layout from '../../components/Layout';
import { graphql } from 'gatsby';

const UnsubscribePage = ({ data }) => {
  const {
    unsubscribe,
  } = data.newsletterJson;

  const params = new URLSearchParams(document.location.search);

  const message = unsubscribe[params.get('response')] ? unsubscribe[params.get('response')] : unsubscribe['DEFAULT'];

  return (
    <Layout stickyFooter>
      {message}
    </Layout>
  );
};

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