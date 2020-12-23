/* eslint-disable react/prop-types */
import React, { useRef, useCallback } from 'react';
import '@crocoder-dev/components/lib/main.css';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { DevJobListLimit12, OtherJobListLimit12 } from '../components/Job/List';
import JobSection from '../components/Job/Section';
import Hero from '../components/Hero';
import Banner from '../components/ContactBanner';
import Newsletter from '../components/Newsletter';
import Layout from '../components/Layout';
import { graphql } from 'gatsby';
import PostAJob from '../components/PostAJob';
import styles from './index.module.scss';
import Search from '../components/Search';

const SearchPage = ({ data }) => {
  return (
    <Layout>
      <Search></Search>
    </Layout>
  );
};

export default SearchPage;
