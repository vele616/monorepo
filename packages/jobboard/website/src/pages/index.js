import React from 'react';
import './index.css';
import { DevJobListLimit12 } from '../components/JobList/DevJobListLimit12';
import { OtherJobListLimit12 } from '../components/JobList/OtherJobListLimit12';
import { Hero } from '../components/Hero';
import { JobSection } from '../components/JobSection';
import { Newsletter } from '../components/Newsletter';

const IndexPage = () => {
  return (
    <div>
      <Hero></Hero>
      <JobSection title="Software Developer Jobs">
        <DevJobListLimit12 />
      </JobSection>
      <Newsletter></Newsletter>
      <JobSection title="Other IT Related Jobs">
        <OtherJobListLimit12 />
      </JobSection>
    </div>
  );
};

export default IndexPage;
