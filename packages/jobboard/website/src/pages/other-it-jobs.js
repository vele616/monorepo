import React from 'react';
import './index.css';
import '@crocoder-dev/components/lib/main.css';
import { Navigation, Button } from '@crocoder-dev/components';
import { OtherJobList } from '../components/JobList/OtherJobList';
import Footer from '../components/Footer';
import { JobSection } from '../components/JobSection';
import Newsletter from '../components/Newsletter';
import CrocNav from '../images/croc-nav.svg';

const AllOtherITJobsPage = () => {
  return (
    <>
      <Navigation Logo={<CrocNav />}>
        <Button variant="secondary">Post a job</Button>
      </Navigation>
      <JobSection title="All Other IT Related Jobs">
        <OtherJobList />
      </JobSection>
      <Newsletter />
      <Footer />
    </>
  );
};

export default AllOtherITJobsPage;
