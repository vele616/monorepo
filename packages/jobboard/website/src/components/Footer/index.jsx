import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { Icon, Footer as FooterComponent } from '@crocoder-dev/components';
import CrocNav from '../../images/croc-nav.svg';
import styles from './index.module.scss';

const Footer = ({ image, socialMedia, sticky }) => {
  return (
    <FooterComponent
      className={sticky ? styles.sticky : ''}
      logo={
        <Link to="/">
          <div className={styles.image}><CrocNav /></div>
        </Link>
      }
      socialLinks={
        <>
          {socialMedia.map((mediaLink) => (
            <Link
              className={styles.icon}
              key={mediaLink.icon}
              to={mediaLink.link}
            >
              <Icon color="gray_1" icon={mediaLink.icon} />
            </Link>
          ))}
        </>
      }
    >
      <Link to="/" style={{ color: 'inherit' }} className="link">
        Home
      </Link>
      <a
        href="https://crocoder.dev/terms"
        style={{ color: 'inherit' }}
        className="link"
      >
        Terms of use
      </a>
      <a
        href="https://crocoder.dev/privacy_policy"
        style={{ color: 'inherit' }}
        className="link"
      >
        Privacy policy
      </a>
    </FooterComponent>
  );
};

const FooterWithQuery = ({ sticky }) => (
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
    render={(data) => <Footer {...data.homeJson.footer} sticky={sticky} />}
  />
);

export default FooterWithQuery;
