import React, { useMemo } from 'react';
import '@crocoder-dev/components/lib/main.css';
import { OtherJobList } from '../components/Job/List';
import JobSection from '../components/Job/Section';
import Newsletter from '../components/Newsletter';
import Layout from '../components/Layout';

const AllOtherITJobsPage = ({ location }) => {
  const scrollToJobWithIndex = useMemo(() => {
    if (location && location.state && location.state.linkFromIndex) return 10;
    return undefined;
  }, [location]);

  return (
    <Layout
      head={{
        title: 'All other remote IT Jobs',
        description: '',
      }}
    >
      <JobSection title="All other remote IT Jobs" titleElement="h1">
        <OtherJobList scrollToJobWithIndex={scrollToJobWithIndex} />
      </JobSection>
      <Newsletter />
    </Layout>
  );
};

export default AllOtherITJobsPage;
