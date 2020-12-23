/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Typography,
  Section,
  Flexbox,
  Button,
  Select,
  Input,
} from '@crocoder-dev/components';
import styles from './index.module.scss';
import QueryTitle from './QueryTitle';
import querystring from 'query-string';
import { StaticQuery, graphql } from 'gatsby';

const Search = ({ filters, location }) => {
  const queryParams = useMemo(() => {
    if (location.search) {
      const { input, ...queryFilters } = querystring.parse(location.search);
      const defaultQueryFilters = {};
      Object.entries(queryFilters).map(([key, options]) => {
        defaultQueryFilters[key] = options
          .split(',')
          .map((id) => ({ id: id, value: id })); // BUG INSIDE SELECT DEFAULT SELECTION
      });
      return { input: input || '', filters: defaultQueryFilters };
    }
    return { input: '', filters: {} };
  }, [location]);

  const [searchInput, setSearchInput] = useState(() => queryParams.input);
  const [filterSelection, setFilterSelection] = useState(
    () => queryParams.filters
  );

  const handleInputChange = useCallback((event) => {
    setSearchInput(event.target.value);
  }, []);

  useEffect(() => {
    if (location.search) {
      const { input } = querystring.parse(location.search);
      if (input) setSearchInput(input);
    }
  }, [location]);

  const setHistory = useCallback(() => {
    if (!filterSelection || Object.keys(filterSelection) === 0) return;

    const historyParams = searchInput ? { input: searchInput } : {};
    Object.entries(filterSelection).forEach(([key, options]) => {
      if (key && options && options.length > 0)
        historyParams[key] = options.map(({ id }) => id);
    });

    history.replaceState(
      historyParams,
      'Jobboard search',
      `?${new URLSearchParams(historyParams).toString()}`
    );
  }, [filterSelection, searchInput]);

  const handleSearch = useCallback(
    (event) => {
      if (event && event.key && event.key !== 'Enter') return;
      setHistory();
      // handle search
    },
    [setHistory]
  );

  const handleOnFilterChange = useCallback((selection, id) => {
    setFilterSelection((prev) => ({
      ...prev,
      [id]: selection,
    }));
  }, []);

  const renderFilters = useCallback(() => {
    return filters.map(({ id, name, options }) => (
      <Select
        defaultSelection={filterSelection[id]}
        key={id}
        onChange={(selection) => handleOnFilterChange(selection, id)}
        className={styles.filters__filter}
        pill
        multiselect
        confirmChoice
        clear
        label={name}
        title={name}
      >
        {options.map(({ id, value }) => (
          <Select.Option key={id} id={id}>
            {value}
          </Select.Option>
        ))}
      </Select>
    ));
  }, [filters, filterSelection]);

  return (
    <Section className={styles.wrapper}>
      <QueryTitle filters={filterSelection} searchInput={searchInput} />
      <div className={styles.search} onKeyDown={handleSearch}>
        <Input
          className={styles.search__input}
          label="Search by keyboard or filter attributes"
          onChange={handleInputChange}
        />
        <Button onClick={handleSearch} variant="secondary">
          Search
        </Button>
      </div>
      <div className={styles.filters}>{renderFilters()}</div>
    </Section>
  );
};

const SearchWithQuery = ({ location }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          searchJson {
            filters {
              id
              name
              options {
                id
                value
              }
            }
          }
        }
      `}
      render={(data) => <Search location={location} {...data.searchJson} />}
    />
  );
};

export default SearchWithQuery;
