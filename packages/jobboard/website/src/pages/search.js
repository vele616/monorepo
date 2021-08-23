/* eslint-disable react/prop-types */
import React, { useCallback, useState, useMemo } from 'react';
import Layout from '../components/Layout';
import Search from '../components/Search';
import SearchResults from '../components/Search/Results';
import styles from './index.module.scss';

const SearchPage = ({ location }) => {
  const [searchQuery, setSearchQuery] = useState({});
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);

  const handleOnPageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleOnSearch = useCallback((query, page) => {
    setHasSearched(true);
    setSearchQuery(query);
    handleOnPageChange(page);
  }, []);

  /**
   * If search page has been accessed from homepage (index page) via See more developer/other jobs,
   * skip first 12 jobs by scrolling to the 12th job 
   */
  const scrollToJobWithIndex = useMemo(() => {
    if (location && location.state && location.state.linkFromIndex) return 10;
    return undefined;
  }, [location]);

  return (
    <Layout pageTitle="search">
      <div className={styles.search}>
        <Search
          hasSearched={hasSearched}
          onSearch={handleOnSearch}
          location={location}
          currentPage={currentPage}
        />
        {hasSearched && (
          <SearchResults
            scrollToJobWithIndex={scrollToJobWithIndex}
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
