import React from 'react';
import styled from 'styled-components';

const ImageWithFilter = styled.img`
  ${({ logoUrl }) => (!!logoUrl ? '' : `filter: grayscale(100%);`)}
`;

const CompanyLogo = ({ src, className, alt = 'Remote company', ...other }) => {
  const [rendered, setRendered] = React.useState(false);

  React.useEffect(() => {
    setRendered(true);
  }, []);

  return (
    <ImageWithFilter
      {...other}
      logoUrl={src}
      style={rendered === false ? { display: 'none' } : null}
      className={className}
      alt={alt}
      src={src || '/images/logo.png'}
    />
  );
};

export default CompanyLogo;
