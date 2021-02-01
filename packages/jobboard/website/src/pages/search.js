/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Search from '../components/Search';
import SearchResults from '../components/Search/Results';
import styles from './index.module.scss';
import querystring from 'query-string';

const SearchPage = ({ location }) => {
  const [searchQuery, setSearchQuery] = useState({});
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleOnSearch = useCallback((query) => {
    setHasSearched(true);
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleOnPageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    if (location && location.search) {
      const { page } = querystring.parse(location.search);
      if (page && Number(page) > 0) setCurrentPage(page);
    }
  }, [location]);

  return (
    <Layout pageTitle="search">
      <div className={styles.search}>
        <Search
          onSearch={handleOnSearch}
          location={location}
          currentPage={currentPage}
        />
        {hasSearched && (
          <SearchResults
            searchQuery={searchQuery}
            defaultPage={currentPage}
            onPageChange={handleOnPageChange}
          />
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
