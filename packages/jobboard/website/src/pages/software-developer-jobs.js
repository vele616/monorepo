import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import { DevJobList } from '../components/Job/List';
import JobSection from '../components/Job/Section';
import Newsletter from '../components/Newsletter';
import Layout from '../components/Layout';

const AllSoftwareDeveloperJobsPage = () => {
  return (
    <Layout>
      <JobSection title="All Software Developer Jobs">
        <DevJobList />
      </JobSection>
      <Newsletter />
    </Layout>
  );
};

export default AllSoftwareDeveloperJobsPage;
