import React from 'react';
import './index.css';
import '@crocoder-dev/components/lib/main.css';
import { Navigation, Button } from '@crocoder-dev/components';
import { DevJobList } from '../components/JobList/DevJobList';
import Footer from '../components/Footer';
import { JobSection } from '../components/JobSection';
import Newsletter from '../components/Newsletter';
import CrocNav from '../images/croc-nav.svg';

const AllSoftwareDeveloperJobsPage = () => {
  return (
    <>
      <Navigation Logo={<CrocNav />}>
        <Button variant="secondary">Post a job</Button>
      </Navigation>
      <JobSection title="All Software Developer Jobs">
        <DevJobList />
      </JobSection>
      <Newsletter />
      <Footer />
    </>
  );
};

export default AllSoftwareDeveloperJobsPage;
