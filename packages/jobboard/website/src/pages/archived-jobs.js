import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import { ArchivedJobList } from '../components/Job/List';
import JobSection from '../components/Job/Section';
import Layout from '../components/Layout';

const ArchivedJobs = () => {
  return (
    <Layout
      head={{
        title: 'All Archived Jobs',
        description: '',
      }}
    >
      <JobSection title="All Archived Jobs">
        <ArchivedJobList />
      </JobSection>
    </Layout>
  );
};

export default ArchivedJobs;
