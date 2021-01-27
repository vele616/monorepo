import React, { useMemo } from 'react';
import '@crocoder-dev/components/lib/main.css';
import { DevJobList } from '../components/Job/List';
import JobSection from '../components/Job/Section';
import Newsletter from '../components/Newsletter';
import Layout from '../components/Layout';

const AllSoftwareDeveloperJobsPage = ({ location }) => {
  const scrollToJobWithIndex = useMemo(() => {
    if (location && location.state && location.state.linkFromIndex) return 10;
    return undefined;
  }, [location]);

  return (
    <Layout
      head={{
        title: 'All Software Developer Jobs',
        description: '',
      }}
    >
      <JobSection title="All Software Developer Jobs">
        <DevJobList scrollToJobWithIndex={scrollToJobWithIndex} />
      </JobSection>
      <Newsletter />
    </Layout>
  );
};

export default AllSoftwareDeveloperJobsPage;
