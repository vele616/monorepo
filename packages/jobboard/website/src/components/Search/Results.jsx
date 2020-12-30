/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import SearchIndex from '../../search';
import ResultList from '../Job/ResultList/ResultList';
import { Loader } from '@crocoder-dev/components';

const SearchResults = ({ index, store, searchQuery }) => {
  const [loading, setLoading] = useState(false);
  const jobsIndex = useMemo(() => new SearchIndex(index, store), [
    index,
    store,
  ]);

  const jobs = useMemo(() => {
    setLoading(true);

    const { input, filters } = searchQuery;
    const { experience, type, contract, skills } = filters || {};

    if (experience && experience.length > 0) {
    }
    if (type && type.length > 0) {
    }
    if (contract && contract.length > 0) {
    }
    if (skills && skills.length > 0) {
    }

    const results = jobsIndex.search(input, null, null, []);
    return <ResultList jobs={results} />;
  }, [searchQuery]);

  useEffect(() => {
    setLoading(false);
  }, [jobs]);

  return <>{loading ? <Loader type="dots" /> : jobs}</>;
};

const SearchWithQuery = ({ searchQuery }) => (
  <StaticQuery
    query={graphql`
      query {
        localSearchJobs {
          index
          store
        }
      }
    `}
    render={(data) => (
      <SearchResults searchQuery={searchQuery} {...data.localSearchJobs} />
    )}
  />
);

export default SearchWithQuery;
