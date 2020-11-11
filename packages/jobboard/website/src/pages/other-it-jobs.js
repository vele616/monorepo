import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import { OtherJobList } from '../components/JobList/OtherJobList';
import { JobSection } from '../components/JobSection';
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
