import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import { OtherJobList } from '../components/Job/List';
import JobSection from '../components/Job/Section';
import Newsletter from '../components/Newsletter';
import Layout from '../components/Layout';

const AllOtherITJobsPage = () => {
  return (
    <Layout>
      <JobSection title="All Other IT Related Jobs">
        <OtherJobList />
      </JobSection>
      <Newsletter />
    </Layout>
  );
};

export default AllOtherITJobsPage;
