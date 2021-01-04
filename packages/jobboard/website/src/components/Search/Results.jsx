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
    //setLoading(true);

    const { input, filters } = searchQuery;
    const { experience, type, contract, skills } = filters || {};

    let experienceIds = [];
    let typeIds = []; // TODO: where goes type?
    let contractIds = [];
    let skillsIds = [];

    if (experience && experience.length > 0) {
      experienceIds = experience.map((e) => e.id);
    }
    if (type && type.length > 0) {
      typeIds = type.map((t) => t.id);
    }
    if (contract && contract.length > 0) {
      contractIds = contract.map((c) => c.id);
    }
    if (skills && skills.length > 0) {
      skillsIds = skills.map((s) => s.id);
    }

    const results = jobsIndex.search(
      input,
      experienceIds,
      contractIds,
      skillsIds
    );

    return <ResultList jobs={results} />;
  }, [searchQuery]);

  useEffect(() => {
    //setLoading(false);
  }, [jobs]);

  return jobs;
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
