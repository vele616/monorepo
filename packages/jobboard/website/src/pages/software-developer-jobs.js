import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import { DevJobList } from '../components/JobList/DevJobList';
import { JobSection } from '../components/JobSection';
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
