/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Typography,
  Typing,
  Section,
  Flexbox,
  Button,
  Select,
  Input,
  Icon,
  useDevice,
} from '@crocoder-dev/components';
import styles from './index.module.scss';
import QueryTitle from './QueryTitle';
import querystring from 'query-string';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const Search = ({
  title,
  subtitle,
  searchLabel,
  searchButtonText,
  filters,
  location,
  onSearch,
  className,
  hashtags,
  currentPage,
  image,
  hasSearched,
  crocTexts,
}) => {
  const maxInputLenght = 115;
  const { isMobile } = useDevice({ tablet: styles.tabletLandscapeLimit });

  const [textIndex, setTextIndex] = useState(0);

  const handleOnTextFinish = useCallback(() => {
    setTimeout(() => {
      const nextIndex = textIndex + 1 < crocTexts.length ? textIndex + 1 : 0;
      setTextIndex(nextIndex);
    }, 6000);
  }, [textIndex]);

  const queryParams = useMemo(() => {
    const queryParams = {
      q: '',
      page: null,
      filters: {
        contract: [],
        experience: [],
        skills: [],
        jobType: []
      },
    };

    if (location && location.search) {
      const {
        q = '',
        page = null,
        contract = '',
        experience = '',
        skills = '',
        jobType =  '',
      } = querystring.parse(location.search);
      if (typeof jobType === 'string') {
        queryParams.filters.jobType = jobType.split(',') || [];
      }
      if (typeof contract === 'string') {
        queryParams.filters.contract = contract.split(',') || [];
      }
      if (typeof experience === 'string') {
        queryParams.filters.experience = experience.split(',') || [];
      }
      if (typeof skills === 'string') {
        queryParams.filters.skills = skills.split(',') || [];
      }
      if (typeof q === 'string') {
        queryParams.q = q.slice(0, maxInputLenght);
      }
      if (page && Number(page) > 0) {
        queryParams.page = page;
      }
    }

    return queryParams;
  }, [location]);

  const [empty, setEmpty] = useState(true);
  const [searchInput, setSearchInput] = useState(() => queryParams.q);
  const [filterSelection, setFilterSelection] = useState();

  const [crocVisible, setCrocVisible] = useState(false);
  const [inputKey, setInputKey] = useState('');

  React.useEffect(() => {
    setInputKey(Math.random().toString());
  }, []);

  const handleInputChange = useCallback((event) => {
    setSearchInput(event.target.value);
  }, []);

  const handleSearch = useCallback(
    (event) => {
      if (event && event.key && event.key !== 'Enter') return;
      if (onSearch) {
        onSearch({ input: searchInput, filters: filterSelection }, 1);
      }
    },
    [searchInput, filterSelection]
  );

  useEffect(() => {
    const historyParams = {};

    if (searchInput) {
      historyParams['q'] = searchInput;
    }

    if (currentPage) {
      historyParams['page'] = currentPage;
    }

    searchInput ? { q: searchInput } : {};

    if (filterSelection && Object.keys(filterSelection).length > 0) {
      Object.entries(filterSelection).forEach(([key, options]) => {
        if (key && options && options.length > 0) {
          historyParams[key] = options.map(({ id }) => id);
        }
      });
    }

    if (Object.keys(historyParams).length > 0) {
      const paramsEncoded = `?${new URLSearchParams(historyParams).toString()}`;
      const paramsDecoded = decodeURIComponent(paramsEncoded);
      history.replaceState(historyParams, 'Jobboard search', paramsDecoded);
    }
  }, [filterSelection, searchInput, currentPage]);

  const handleOnFilterChange = useCallback(
    (selection, id) => {
      setFilterSelection((prev) => ({
        ...prev,
        [id]: selection,
      }));
    },
    [filterSelection]
  );

  const renderFilters = useMemo(() => {
    return (
      <>
        <Select
          id={'job-type-filter'}
          defaultSelection={
            queryParams && queryParams.filters && queryParams.filters['jobType']
          }
          key="jobType"
          onChange={(selection) => handleOnFilterChange(selection, 'jobType')}
          className={styles.filters__filter}
          pill
          multiselect
          clear
          label="Job Type"
          title="Job Type"
          x={'center'}
          y={'bottom'}
        >
          <Select.Option id="software">
            Software developer
          </Select.Option>
          <Select.Option id="other">
            Other IT jobs
          </Select.Option>
        </Select>
        {/*

          Hide these filters for now.

          {filters.map(({ id, name, options }) => (
            <Select
              style={{ display: 'none' }}
              id={`${id}-filter`}
              defaultSelection={
                queryParams && queryParams.filters && queryParams.filters[id]
              }
              key={id}
              onChange={(selection) => handleOnFilterChange(selection, id)}
              className={styles.filters__filter}
              pill
              multiselect
              clear
              label={name}
              title={name}
              x={'center'}
              y={'bottom'}
            >
              {options.map(({ id, value }) => (
                <Select.Option key={id} id={id}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          ))}
          <Select
            id={'skills-filter'}
            defaultSelection={
              queryParams && queryParams.filters && queryParams.filters['skills']
            }
            key="skills"
            onChange={(selection) => handleOnFilterChange(selection, 'skills')}
            className={styles.filters__filter}
            pill
            multiselect
            clear
            label="Skills"
            title="Skills"
            x={'center'}
            y={'bottom'}
          >
            {hashtags.map((tag) => (
              <Select.Option key={tag} id={tag}>
                {tag}
              </Select.Option>
            ))}
          </Select>
        */}
      </>
    );
  }, [filters, queryParams.filters]);

  useEffect(() => {
    const anyFilters = Object.values(filterSelection || {}).some(
      (filter) => filter && filter.length > 0
    );
    setEmpty(!searchInput && !anyFilters);
  }, [searchInput, filterSelection]);

  useEffect(() => {
    // Execute search if there is something in query params on first load

    if (
      Object.keys(queryParams.filters.jobType.length === 0) &&
      Object.keys(queryParams.filters.contract.length === 0) &&
      Object.keys(queryParams.filters.experience.length === 0) &&
      Object.keys(queryParams.filters.skills.length === 0) &&
      !queryParams.q &&
      !queryParams.page
    ) {
      setCrocVisible(true);
      return;
    }

    const searchData = { input: queryParams.q, filters: {} };

    Object.entries(queryParams.filters).map(([filterId, options]) => {
      // Get only valid jobTypes
      if (filterId === 'jobType' && options && options.length > 0) {
        const existingJobTypes = options.filter((opt) => {
          return ['software', 'other'].find((tag) => tag === opt);
        });
        if (existingJobTypes && existingJobTypes.length > 0) {
          searchData.filters['jobType'] = existingJobTypes;
        }
      }

      // Get only valid skills
      if (filterId === 'skills' && options && options.length > 0) {
        const existingSkills = options.filter((opt) => {
          return hashtags.find((tag) => tag === opt);
        });
        if (existingSkills && existingSkills.length > 0) {
          searchData.filters['skills'] = existingSkills;
        }
      }
      // Get valid experiences and valid contract-types
      const filter = filters.find((f) => f.id === filterId);
      if (filter && filter.options) {
        const existingOptions = options.filter((option) =>
          filter.options.find((o) => o.id === option)
        );
        if (existingOptions && existingOptions.length > 0) {
          searchData.filters[filterId] = existingOptions;
        }
      }
    });
    if (onSearch) {
      onSearch(searchData, queryParams.page);
    }
  }, []);

  return (
    <Section className={`${styles.section} ${className}`}>
      <Typography
        className={styles.section__title}
        color="gray_2"
        fontFamily="rubik"
        fontSize={65}
        fontWeight={500}
        element="div"
      >
        {title}
        <Typography
          className={styles.section__subtitle}
          fontSize={36}
          fontFamily="rubik"
          element="div"
        >
          {subtitle}
        </Typography>
      </Typography>
      <Flexbox
        alignItems="center"
        className={styles.search}
        onKeyDownCapture={handleSearch}
      >
        <Input
          key={inputKey}
          maxLength={maxInputLenght}
          defaultValue={queryParams.q || ''}
          className={styles.search__input}
          label={searchLabel}
          onChange={handleInputChange}
          hideLabelOnFocus
        />
        <Button className={styles.search__button} variant="sneaky">
          <Icon
            className={styles.search__button__icon}
            color="gray_2"
            icon="search1"
            fontSize={30}
          />
        </Button>
      </Flexbox>
      <Flexbox className={styles.filters}>{renderFilters}</Flexbox>
      <Flexbox alignItems="center" justifyContent="space-between">
        <QueryTitle
          empty={empty}
          filters={filterSelection}
          searchInput={searchInput}
        />
        <Button
          onClick={handleSearch}
          className={styles.searchButton}
          variant="secondary"
        >
          {isMobile || empty ? 'SEARCH' : searchButtonText}
        </Button>
      </Flexbox>
      {crocVisible && !hasSearched && (
        <div className={styles.search__croc}>
          <Img
            className={styles.search__croc__image}
            fadeIn={false}
            fluid={image ? image.childImageSharp.fluid : {}}
            alt={'croc'}
          />
          <Typography
            fontFamily="rubik"
            className={styles.search__croc__text}
            color="gray_2"
            fontWeight={400}
            fontSize={24}
            element="div"
          >
            <Typing onFinish={handleOnTextFinish}>
              {crocTexts[textIndex]}
            </Typing>
          </Typography>
        </div>
      )}
    </Section>
  );
};

const SearchWithQuery = (props) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          searchJson {
            title
            subtitle
            searchLabel
            searchButtonText
            crocTexts
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            filters {
              id
              name
              options {
                id
                value
              }
            }
          }
          allMarkdownRemark {
            distinct(field: fields___tags)
          }
        }
      `}
      render={(data) => (
        <Search
          {...props}
          {...data.searchJson}
          hashtags={data.allMarkdownRemark.distinct}
        />
      )}
    />
  );
};

export default SearchWithQuery;
