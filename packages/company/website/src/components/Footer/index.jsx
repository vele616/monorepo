import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import { Icon, Footer as FooterComponent } from '@crocoder-dev/components';
import styles from './index.module.scss';


const Footer = ({ image, socialMedia, sticky }) => {
  return (
    <FooterComponent
      className={sticky ? styles.sticky : ''}
      logo={
        <Img
          fadeIn={false}
          className={styles.image}
          fluid={image ? image.childImageSharp.fluid : {}}
          alt={'abc'}
        />}
      socialLinks={(
        <>
          {socialMedia.map(mediaLink => (
            <Link  className={styles.icon}  key={mediaLink.icon} href={mediaLink.link}>
              <Icon color="gray_1" icon={mediaLink.icon} />
            </Link>
          ))}
        </>
      )}
    >
      <Link to='/' style={{ color: 'inherit' }} className="link">Home</Link>
      <Link to='/terms' style={{ color: 'inherit' }} className="link">Terms of use</Link>
      <Link to='/privacy_policy' style={{ color: 'inherit' }} className="link">Privacy policy</Link>
    </FooterComponent>
  )
};

const FooterWithQuery = ({sticky}) => (
  <StaticQuery
    query={graphql`
    query {
      homeJson {
        footer {
          socialMedia {
            link
            icon
          }
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `}
    render={data => (<Footer {...data.homeJson.footer} sticky={sticky} />)}
  />
);

export default FooterWithQuery;