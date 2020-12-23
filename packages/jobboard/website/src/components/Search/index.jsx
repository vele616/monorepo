/* eslint-disable react/prop-types */
import React, { useCallback, useContext, useState } from 'react';
import Img from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby';
import {
  Typography,
  Section,
  Flexbox,
  Button,
  Select,
  Input,
} from '@crocoder-dev/components';
import { useMemo } from 'react';
import styles from './index.module.scss';

const Search = ({}) => {
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState([]);

  const [filterSelectionType, setFilterSelectionType] = useState([]);
  const [filterSelectionContract, setFilterSelectionContract] = useState([]);
  const [filterSelectionExperience, setFilterSelectionExperience] = useState(
    []
  );
  const [filterSelectionSkills, setFilterSelectionSkills] = useState([]);

  const green = useCallback((text) => {
    return (
      text && (
        <Typography color="green_2">{` ${text.toLowerCase()}`}</Typography>
      )
    );
  }, []);

  const title = useMemo(() => {
    const jobType =
      filterSelectionType.map((option) => option.value).join(' or ') || '';
    const jobContract =
      filterSelectionContract.map((option) => option.value).join(' or ') || '';
    const jobExperience =
      filterSelectionExperience.map((option) => option.value).join(' or ') ||
      '';
    const jobSkills =
      filterSelectionSkills.map((option) => option.value).join(' or ') || '';

    if (Object.keys(searchQuery).length > 0) {
      return (
        <Typography
          className={styles.title}
          color="gray_2"
          fontFamily="rubik"
          fontSize={65}
          fontWeight={500}
          element="div"
        >
          Oh, so you’re looking for a{green(jobContract)}
          {green(jobExperience)}
          {green(jobType)}
          {green(jobSkills)}
          {} job post
          {searchText && ` that mentions `}
          {searchText && green(searchText)}.
        </Typography>
      );
    } else {
      return (
        <>
          <Typography
            className={styles.title}
            color="gray_2"
            fontFamily="rubik"
            fontSize={65}
            fontWeight={500}
            element="div"
          >
            So glad you’re here!
          </Typography>
          <Typography
            className={styles.subtitle}
            color="gray_2"
            fontFamily="rubik"
            fontSize={50}
            fontWeight={500}
            element="div"
          >
            What are you looking for?
          </Typography>
        </>
      );
    }
  }, [
    searchQuery,
    filterSelectionType,
    filterSelectionContract,
    filterSelectionExperience,
    filterSelectionSkills,
  ]);

  const handleOnFilterChangeType = useCallback((selection) => {
    setFilterSelectionType(selection);
  }, []);

  const handleOnFilterChangeContract = useCallback((selection) => {
    setFilterSelectionContract(selection);
  }, []);

  const handleOnFilterChangeExperience = useCallback((selection) => {
    setFilterSelectionExperience(selection);
  }, []);

  const handleOnFilterChangeSkills = useCallback((selection) => {
    setFilterSelectionSkills(selection);
  }, []);

  const handleTextChange = useCallback((event) => {
    setSearchText(event.target.value);
  }, []);

  const handleSearch = useCallback(
    (event) => {
      if (event && event.key && event.key !== 'Enter') return;

      const jobType =
        filterSelectionType.map((option) => option.value).join(', ') || '';
      const jobContract =
        filterSelectionContract.map((option) => option.value).join(', ') || '';
      const jobExperience =
        filterSelectionExperience.map((option) => option.value).join(', ') ||
        '';
      const jobSkills =
        filterSelectionSkills.map((option) => option.value).join(', ') || '';

      setSearchQuery({
        jobType: jobType,
        jobContract: jobContract,
        jobExperience: jobExperience,
        jobSkills: jobSkills,
      });
    },
    [
      searchText,
      filterSelectionType,
      filterSelectionContract,
      filterSelectionExperience,
      filterSelectionSkills,
    ]
  );

  return (
    <Section className={styles.wrapper}>
      {title}
      <div className={styles.search} onKeyDown={handleSearch}>
        <Input
          className={styles.search__input}
          label="Search by keyboard or filter attributes"
          onChange={handleTextChange}
        />
        <Button onClick={handleSearch} variant="secondary">
          Search
        </Button>
      </div>
      <div className={styles.filters}>
        <Select
          onChange={handleOnFilterChangeType}
          className={styles.filters__filter}
          pill
          multiselect
          confirmChoice
          clear
          label="Job Type"
          title="Job Type"
        >
          <Select.Option>Content writer</Select.Option>
          <Select.Option>erwer</Select.Option>
        </Select>
        <Select
          onChange={handleOnFilterChangeContract}
          className={styles.filters__filter}
          pill
          multiselect
          confirmChoice
          clear
          label="Contract Type"
          title="Contract Type"
        >
          <Select.Option>Part Time</Select.Option>
          <Select.Option>Full Time</Select.Option>
        </Select>
        <Select
          onChange={handleOnFilterChangeExperience}
          className={styles.filters__filter}
          pill
          multiselect
          confirmChoice
          clear
          label="Experience Level"
          title="Experience Level"
        >
          <Select.Option>Junior</Select.Option>
          <Select.Option>Senior</Select.Option>
        </Select>
        <Select
          onChange={handleOnFilterChangeSkills}
          className={styles.filters__filter}
          pill
          multiselect
          confirmChoice
          clear
          label="Skills"
          title="Skills"
        >
          <Select.Option>erwer</Select.Option>
          <Select.Option>erwer</Select.Option>
        </Select>
      </div>
    </Section>
  );
};

export default Search;
