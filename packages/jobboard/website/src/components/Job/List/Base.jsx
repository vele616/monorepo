import React, { useEffect, useRef } from 'react';
import JobPost from '../Post';

const JobList = ({ jobs, scrollToJobWithIndex }) => {
  const jobRef = useRef();

  useEffect(() => {
    if (jobRef.current && scrollToJobWithIndex >= 0) {
      jobRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  return jobs.map((job, index) => (
    <React.Fragment key={job.jobUrl}>
      <JobPost {...job} />
      {scrollToJobWithIndex === index && (
        <div style={{ top: '-100px', position: 'relative' }} ref={jobRef} />
      )}
    </React.Fragment>
  ));
};

export default JobList;
