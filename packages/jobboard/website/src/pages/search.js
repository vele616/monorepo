import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import Layout from '../components/Layout';
import { First12Jobs } from '../components/Job/ResultList/First12Jobs';

const SearchResultsPage = () => {
  return (
    <Layout
      head={{
        title: 'All Software Developer Jobs',
        description: '',
      }}
    >
      <First12Jobs />
    </Layout>
  );
};

export default SearchResultsPage;
