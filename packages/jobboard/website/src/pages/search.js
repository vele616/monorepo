/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react';
import Layout from '../components/Layout';
import Search from '../components/Search';
import SearchResults from '../components/Search/Results';
import styles from './index.module.scss';

const SearchPage = ({ location }) => {
  const [searchQuery, setSearchQuery] = useState({});
  const [hasSearched, setHasSearched] = useState(false);

  const handleOnSearch = useCallback((query) => {
    setHasSearched(true);
    setSearchQuery(query);
  }, []);

  return (
    <Layout pageTitle="search">
      <Search
        className={`${!hasSearched && styles.search}`}
        onSearch={handleOnSearch}
        location={location}
      />
      {hasSearched && <SearchResults searchQuery={searchQuery} />}
    </Layout>
  );
};

export default SearchPage;