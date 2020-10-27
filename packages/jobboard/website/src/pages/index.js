import React from 'react';
import './index.css';
import '@crocoder-dev/components/lib/main.css';
import { Navigation, Button } from '@crocoder-dev/components';
import { DevJobListLimit12 } from '../components/JobList/DevJobListLimit12';
import { OtherJobListLimit12 } from '../components/JobList/OtherJobListLimit12';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { JobSection } from '../components/JobSection';
import { Newsletter } from '../components/Newsletter';
import CrocNav from '../images/croc-nav.svg';

const IndexPage = () => {
  return (
    <div>
      <Navigation Logo={<CrocNav />}>
        <Button variant="secondary">Post a job</Button>
      </Navigation>
      <Hero />
      <JobSection title="Software Developer Jobs">
        <DevJobListLimit12 />
      </JobSection>
      <Newsletter></Newsletter>
      <JobSection title="Other IT Related Jobs">
        <OtherJobListLimit12 />
      </JobSection>
      <Footer />
    </div>
  );
};

export default IndexPage;
