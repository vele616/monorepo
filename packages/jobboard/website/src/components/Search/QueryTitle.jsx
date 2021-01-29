/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Typography } from '@crocoder-dev/components';
import { useMemo } from 'react';
import styles from './index.module.scss';

const Green = ({ children = '' }) => {
  return (
    <Typography color="green_4">{` ${children.toLowerCase()}`}</Typography>
  );
};

const QueryTitle = ({ filters, searchInput, empty }) => {
  const [hasSearched, setHasSearched] = useState(false);

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
    if (!filters) return;

    const filterArray = Object.values(filters).filter((arr) => arr.length > 0);
    return filterArray.map((options, index) => {
      if (options && options.length > 0) {
        return (
          <React.Fragment key={index}>
            <Green>{options.map(({ value }) => value).join(' / ')}</Green>
            {index < filterArray.length - 1 && ` and`}
          </React.Fragment>
        );
      }
    });
  }, [filters]);

  useEffect(() => {
    if ((filterValues && filterValues.length > 0) || input)
      setHasSearched(true);
  }, [filterValues, input]);

  return (
    (empty && (
      <Typography
        className={styles.queryTitle}
        color="gray_2"
        fontFamily="rubik"
        fontSize={30}
        fontWeight={500}
        element="div"
      >
        Ah, you are probably looking for
        <Green>every </Green>
        job post there is.
      </Typography>
    )) ||
    (hasSearched && (
      <Typography
        className={styles.queryTitle}
        color="gray_2"
        fontFamily="rubik"
        fontSize={30}
        fontWeight={500}
        element="div"
      >
        Oh, so you’re looking for a{filterValues}
        {} job posts
        {input}?
      </Typography>
    )) || (
      <Typography
        className={styles.queryTitle}
        color="gray_2"
        fontFamily="rubik"
        fontSize={30}
        fontWeight={500}
        element="div"
      >
        Are you looking for any jobs?
      </Typography>
    )
  );
};

export default QueryTitle;
