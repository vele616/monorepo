/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Typography } from '@crocoder-dev/components';
import { useMemo } from 'react';
import styles from './index.module.scss';
import Typing from './Typing';

const Green = ({ children = '' }) => (
  <Typography color="green_4">{` ${children.toLowerCase()}`}</Typography>
);

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
    return Object.values(filters).map((options, index) => {
      if (options && options.length > 0) {
        return (
          <Green key={index}>
            {options.map(({ value }) => value).join(' or ')}
          </Green>
        );
      }
    });
  }, [filters]);

  useEffect(() => {
    if (filterValues.length > 0 || input) setHasSearched(true);
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
