/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Search from '../components/Search';
import SearchResults from '../components/Search/Results';
import styles from './index.module.scss';

const SearchPage = ({ location }) => {
  const [searchQuery, setSearchQuery] = useState({});
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleOnPageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleOnSearch = useCallback((query, page) => {
    setHasSearched(true);
    setSearchQuery(query);

    console.log('search page', page);
    handleOnPageChange(page || 1);
  }, []);

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
