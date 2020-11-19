import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { DevJobListLimit12, OtherJobListLimit12 } from '../components/Job/List';
import JobSection from '../components/Job/Section';
import Hero from '../components/Hero';
import Banner from '../components/ContactBanner';
import Newsletter from '../components/Newsletter';
import Layout from '../components/Layout';

// TODO Links with button style
const StyledLink = styled(Link)`
  background-color: #fec343;
  border-color: #fec343;
  border-radius: 6px;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  color: #1e1a1a;
  cursor: pointer;
  display: block;
  width: fit-content;
  font-family: 'Rubik', sans-serif;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 1px;
  margin: auto;
  padding: 16px 25px;
  text-decoration: none;
  text-transform: uppercase;

  @media (max-width: 600px) {
    position: relative;
    padding: 10px 20px;
    top: -15px;
  }

  &:disabled,
  &:disabled:hover {
    cursor: not-allowed;
    background-color: #e8e8e8;
    color: #828282;
    border-color: #e8e8e8;
  }

  &:hover {
    background-color: rgba(254, 209, 82, 90%);
    border-color: rgba(254, 209, 82, 90%);
  }

  &:focus {
    outline: none;
    background-color: rgba(254, 209, 82, 90%);
    border-color: #1e1a1a;
  }
`;

const IndexPage = () => {
  return (
    <Layout>
      <Hero />
      <JobSection title="Software Developer Jobs">
        <DevJobListLimit12 />

        <StyledLink to="/software-developer-jobs">
          VIEW MORE DEVELOPER JOBS
        </StyledLink>
      </JobSection>
      <Newsletter />
      <JobSection title="Other IT Related Jobs">
        <OtherJobListLimit12 />
        <StyledLink to="/other-it-jobs">VIEW MORE IT RELATED JOBS</StyledLink>
      </JobSection>
      <Banner />
    </Layout>
  );
};

export default IndexPage;
