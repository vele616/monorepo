/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import SearchIndex from '../../search';
import ResultList from '../Job/ResultList/ResultList';

const SearchResults = ({
  index,
  store,
  searchQuery,
  onPageChange,
  defaultPage,
  scrollToJobWithIndex
}) => {
  const jobsIndex = useMemo(() => new SearchIndex(index, store), [
    index,
    store,
  ]);

  const jobs = useMemo(() => {
    const { input, filters } = searchQuery;
    const { experience, contract, skills, jobType } = filters || {};

    let experienceIds = [];
    let contractIds = [];
    let skillsIds = [];
    let jobTypeIds = [];

    if (jobType && jobType.length > 0) {
      jobTypeIds = jobType.map((t) => t.id || t);
    }
    if (experience && experience.length > 0) {
      experienceIds = experience.map((e) => e.id || e);
    }
    if (contract && contract.length > 0) {
      contractIds = contract.map((c) => c.id || c);
    }
    if (skills && skills.length > 0) {
      skillsIds = skills.map((s) => {
        const skill = s.id || s || '';
        return skill.startsWith('#') ? skill : `#${skill}`;
      });
    }

    const results = jobsIndex.search(
      input,
      experienceIds,
      contractIds,
      skillsIds,
      jobTypeIds
    );

    return (
      <ResultList
        defaultPage={defaultPage}
        jobs={results}
        onPageChange={onPageChange}
        scrollToJobWithIndex={scrollToJobWithIndex}
      />
    );
  }, [searchQuery]);

  return jobs;
};

const SearchWithQuery = ({ searchQuery, onPageChange, defaultPage, scrollToJobWithIndex }) => (
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
      <SearchResults
        searchQuery={searchQuery}
        {...data.localSearchJobs}
        defaultPage={defaultPage}
        onPageChange={onPageChange}
        scrollToJobWithIndex={scrollToJobWithIndex}
      />
    )}
  />
);

export default SearchWithQuery;
