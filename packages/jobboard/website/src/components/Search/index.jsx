/* eslint-disable react/prop-types */
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Typography, Section, Flexbox } from '@crocoder-dev/components';
import FlexSearch from 'flexsearch';

const searchTerms = {
  JUNIOR: [
    'junior',
  ],
  MID: [
    'mid',
  ],
  SENIOR: [
    'senior',
  ],
  LEAD: [
    'team lead',
    'head',
    'principal',
  ],
  FULLTIME: [
    'full time',
    'full-time',
  ],
  PARTTIME: [
    'part time',
    'part-time',
  ],
  CONTRACT: [
    'contract',
    'freelance',
  ],
};


const createSearchQuery = (query, seniority, contractType) => {
  const s = searchTerms[seniority];
  const c = searchTerms[contractType];

  if(!seniority && !contractType) {
    return [query];
  } else if(!contractType) {
    return s.map(sterm => `${sterm} ${query}`);
  } else if(!seniority) {
    return c.map(cterm => `${cterm} ${query}`);
  } else {
    return s.flatMap(sterm => c.flatMap(cterm => `${sterm} ${cterm} ${query}`));
  }
};

const mergeSorted = (firstArray, secondArray) => {
  const merge = (firstArray, secondArray) => {
    return [
      ...secondArray.flatMap((t, i) => [t, firstArray[i]]),
      ...firstArray.slice(secondArray.length),
    ];
  }
  
  if(firstArray.length > secondArray.length) {
    return merge(firstArray, secondArray);
  } else {
    return merge(secondArray, firstArray);
  }
}

const search = (index, store, query = '', seniority = null, contractType = null, tags = []) => {
  if(query === '' && !seniority && !contractType && tags.length !== 0) {
    return Object.values(store)
    .filter(x => tags.length === 0 || tags.some(t => x.hashtags.includes(t)));
  } 
  return createSearchQuery(query, seniority, contractType)
    .map(q => index.search({query: q}))
    .reduce(mergeSorted)
    .filter((v, i, a) => a.indexOf(v) === i)
    .map(t => store[t])
    .filter(x => tags.length === 0 || tags.some(t => x.hashtags.includes(t)));
}

const Search = ({ index, store }) => {
  React.useEffect(() => {
    const jobs = new FlexSearch({
      encode: "balance",
      tokenize: "full",
      threshold: 1,
      cache: true,
    });
    jobs.import(index);

    const result1 = search(jobs, store, '', null, null, ['#python']);
    const result2 = search(jobs, store, 'SENIOR', null, null, []);

    console.log(result1, result2);
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
