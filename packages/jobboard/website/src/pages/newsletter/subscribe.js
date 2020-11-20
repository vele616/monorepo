import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import Layout from '../../components/Layout';

const SubscribePage = ({ data }) => {
  const {
    subscribe,
  } = data.newsletterJson;

  const params = new URLSearchParams(document.location.search);

  const message = subscribe[params.get('response')] ? subscribe[params.get('response')] : subscribe['DEFAULT'];

  return (
    <Layout stickyFooter>
      {message}
    </Layout>
  );
};

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