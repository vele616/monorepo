import React from 'react';
import JobPost from '../Post';

const JobList = ({ jobs }) => {
  return jobs.map((job) => <JobPost key={job.jobUrl} {...job} />);
};

export default JobList;
