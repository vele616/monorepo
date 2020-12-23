/* eslint-disable react/prop-types */
import React from 'react';
import { Typography } from '@crocoder-dev/components';
import { useMemo } from 'react';

const Green = ({ children = '' }) => (
  <Typography color="green_4">{` ${children.toLowerCase()}`}</Typography>
);

const QueryTitle = ({ filters, searchInput }) => {
  const input = useMemo(
    () =>
      searchInput && (
        <>
          {' that mentions'}
          <Green>{searchInput}</Green>
        </>
      ),
    [searchInput]
  );

  const filterValues = useMemo(() => {
    const allFilters =
      Object.values(filters).map(
        (options) =>
          (options &&
            options.length > 0 &&
            options.map(({ value }) => value).join(' or ')) ||
          ''
      ) || [];
    return allFilters.map((filter) => <Green key={filter}>{filter}</Green>);
  }, [filters]);

  return (
    <Typography
      color="gray_2"
      fontFamily="rubik"
      fontSize={50}
      fontWeight={500}
      element="div"
    >
      Oh, so you’re looking for a{filterValues}
      {} job posts
      {input}?
    </Typography>
  );
};

export default QueryTitle;
