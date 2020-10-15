import React from "react";
import styled from "styled-components";


const JobInfo = styled.a`
  box-shadow: rgba(69, 85, 22, 0.1) 0px 5px 20px;
  border-radius: 6px;
  width: 60%;
  box-sizing: border-box;
  height: 122px;
  font-size: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 6%;
  padding-right: 9%;
  position: relative;
  margin: 21px 0px;
  background-color: white;
  color: black;
  text-decoration: none;
  @media only screen and (max-width: 1200px) {
    width: 90%;
    padding-right: 6%;
    margin: 10px 0;
  }
  @media only screen and (max-width: 600px) { 
    font-size: 24px;
  }
`;
const Image = styled.img`
  background-color: white;
  position: absolute;
  border-radius: 6px;
  width: 122px;
  height: 122px;
  left: 0px;
  transform: translate(-50%);
  margin-bottom: 0px;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;
const Position = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 80%;
  @media only screen and (max-width: 600px) {
    max-width: 65%;
  }
`; 
const PositionAndLocation = styled.div`
  font-weight: 600;
  justify-content: space-between;
  flex-direction: row;
  display: flex;
`;
const Location = styled.div`
  white-space: nowrap;
`;
const Tags = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
`;

const JobPost = ({ jobUrl, title, companyName, companyLogo, location, tags }) => (
  <JobInfo href={jobUrl}>
    <Image src={companyLogo}></Image>
    <div>{companyName}</div>
    <PositionAndLocation >
      <Position>{title}</Position>
      <Location>{location}</Location>
    </PositionAndLocation>
    <Tags>{tags}</Tags>
  </JobInfo>
);

export const JobList = ({ jobs }) => {
  return jobs.map(job => <JobPost key={job.jobUrl}  {...job} />);
}