import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import { DevJobListLimit12 } from '../components/JobList/DevJobListLimit12';
import { OtherJobListLimit12 } from '../components/JobList/OtherJobListLimit12';
import Hero from '../components/Hero';
import Banner from '../components/ContactBanner';
import { JobSection } from '../components/JobSection';
import Newsletter from '../components/Newsletter';
import Layout from '../components/Layout';

const IndexPage = () => {
  return (
    <Layout>
      <Hero />
      <JobSection title="Software Developer Jobs">
        <DevJobListLimit12 />
      </JobSection>
      <Newsletter />
      <JobSection title="Other IT Related Jobs">
        <OtherJobListLimit12 />
      </JobSection>
      <Banner />
    </Layout>
  );
};

export default IndexPage;
