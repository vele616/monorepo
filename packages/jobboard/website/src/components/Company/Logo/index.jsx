import React from 'react';
import styled from 'styled-components';

const ImageWithFilter = styled.img`
  ${({ logoUrl }) => (!!logoUrl ? '' : `filter: grayscale(100%);`)}
`;

const CompanyLogo = ({ src, className, ...other }) => (
  <ImageWithFilter
    {...other}
    logoUrl={src}
    className={className}
    src={src || '/images/logo.png'}
  />
);

export default CompanyLogo;
