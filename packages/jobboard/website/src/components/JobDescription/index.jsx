import React from 'react';
import styled from 'styled-components';
import { CompanyCard } from '../CompanyCard';

const Section = styled.section`
  background-color: white;
  padding: 42px 0px;
`;
const Wrapper = styled.div`
  max-width: 1600px;
  margin: 0px auto;
  flex-direction: row;
  display: flex;
`;
const Info = styled.div`
  box-sizing: border-box;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: white;
  text-decoration: none;
  position: relative;
  justify-content: space-between;
  @media only screen and (min-width: 1200px) {
    padding-left: 10%;
    padding-right: 3%;
  }
  @media only screen and (min-width: 600px) and (max-width: 1200px) {
    padding-left: 5%;
    padding-right: 3%;
  }
  @media only screen and (max-width: 600px) {
    padding: 0 5%;
  }
`;
const TitleAndTags = styled.div`
  justify-content: space-around;
  flex-direction: column;
  display: flex;
`;
const Title = styled.div`
  text-size-adjust: 100%;
  @media only screen and (max-width: 1200px) {
    font-weight: 700;
  }
  @media only screen and (min-width: 1200px) {
    font-weight: 600;
  }
  @media only screen and (min-width: 600px) {
    font-size: 30px;
  }
  @media only screen and (max-width: 600px) {
    font-size: 40px;
    letter-spacing: 2.5px;
  }
  @media only screen and (min-width: 1200px) and (max-width: 600px) {
    padding-right: 8%;
  }
`;
const Tags = styled.div`
  text-size-adjust: 100%;
  font-weight: 900;
  padding-top: 3%;
  @media only screen and (min-width: 600px) {
    font-size: 24px;
  }
  @media only screen and (max-width: 600px) {
    font-size: 30px;
  }
`;

const Content = styled.div`
  max-width: 1600px;
  flex-direction: column;
  height: auto;
  box-sizing: border-box;
  margin-top: 58px;
  overflow-wrap: break-word;
  line-height: 1.6;
  display: block;
  font-weight: 300;
  @media only screen and (min-width: 600px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 600px) {
    font-size: 28px;
  }
  h2 {
    margin-block-end: 0;
    @media only screen and (min-width: 600px) {
      font-size: 22px;
    }
    @media only screen and (max-width: 600px) {
      font-size: 36px;
    }
  }
  ul {
    list-style-type: circle;
    padding-inline-start: 30px;
    margin-block-start: 0;
  }
`;

export const JobDescription = ({
  title,
  hashtags,
  html,
  logoUrl,
  companyName,
  companyLocation,
  companyWebsite,
  timestamp,
  url,
  applyUrl,
}) => {
  return (
    <Section>
      <Wrapper>
        <Info>
          <TitleAndTags>
            <Title>{title}</Title>
            <Tags>{hashtags.replace(/,/gi, ' ')}</Tags>
          </TitleAndTags>
          <CompanyCard
            logoUrl={logoUrl}
            companyName={companyName}
            companyLocation={companyLocation}
            companyWebsite={companyWebsite}
          />
          <Content dangerouslySetInnerHTML={{ __html: html }} />
          <div>
            <br></br>
            <div>timestamp: {timestamp}</div>
            <a href={url}>url</a>
            <br></br>
            <a href={applyUrl}>Apply to Job</a>
          </div>
        </Info>
        <CompanyCard
          large
          logoUrl={logoUrl}
          companyName={companyName}
          companyLocation={companyLocation}
          companyWebsite={companyWebsite}
        />
      </Wrapper>
    </Section>
  );
};
