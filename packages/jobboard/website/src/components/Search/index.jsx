/* eslint-disable react/prop-types */
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Typography, Section, Flexbox } from '@crocoder-dev/components';
import SearchIndex from '../../search';


const Search = ({ index, store }) => {
  React.useEffect(() => {
    const jobsIndex = new SearchIndex(index, store);

    const result1 = jobsIndex.search('', null, null, ['#python']);
    const result2 = jobsIndex.search('SENIOR', null, null, []);
    const result3 = jobsIndex.search('designer', null, null, []);

    console.log(result1, result2, result3);
  }, []);
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
