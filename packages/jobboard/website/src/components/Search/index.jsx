/* eslint-disable react/prop-types */
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Typography, Section, Flexbox } from '@crocoder-dev/components';
import FlexSearch from 'flexsearch';

const Search = ({ index, store }) => {
  const jobs = new FlexSearch();
  jobs.import(index);
  console.log('results:', jobs.search('junior').map(t => store[t]));
  return (
    <Section>
      search
    </Section>
  );
};

const SearchWithQuery = () => (
  <StaticQuery
    query={graphql`
    query {
  localSearchJobs {
    index
    store
  }
}
  `}
    render={(data) => <Search {...data.localSearchJobs} />}
  />
);

export default SearchWithQuery;
