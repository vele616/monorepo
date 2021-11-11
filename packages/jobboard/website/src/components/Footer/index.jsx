import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { Icon, Footer as FooterComponent } from '@crocoder-dev/components';
import CrocFooter from '../../images/croc-footer.svg';
import styles from './index.module.scss';

const Footer = ({ socialMedia, scrollToTop }) => {
  return (
    <FooterComponent
      copyrightNotice="Copyright © CroCoder Inc. All rights reserved"
      className={styles.footer}
      logo={
        <Link
          to="/"
          onClick={() => {
            if (scrollToTop) scrollToTop();
          }}
        >
          <div className={styles.image}>
            <CrocFooter className={styles.crocoderLogo} />
          </div>
        </Link>
      }
      socialLinks={
        <>
          {socialMedia.map((mediaLink) => (
            <a
              rel="nofollow noopener noreferrer"
              className={styles.icon}
              key={mediaLink.icon}
              href={mediaLink.link}
            >
              <Icon color="gray_1" icon={mediaLink.icon} />
            </a>
          ))}
        </>
      }
    >
      <Link to="/" style={{ color: 'inherit' }} className="link">
        Home
      </Link>
      <a
        rel="nofollow noopener noreferrer"
        href="https://crocoder.dev/terms"
        style={{ color: 'inherit' }}
        className="link"
      >
        Terms of use
      </a>
      <a
        rel="nofollow noopener noreferrer"
        href="https://crocoder.dev/privacy_policy"
        style={{ color: 'inherit' }}
        className="link"
      >
        Privacy policy
      </a>
    </FooterComponent>
  );
};

const FooterWithQuery = ({ sticky, scrollToTop }) => (
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
    render={(data) => (
      <Footer
        {...data.homeJson.footer}
        scrollToTop={scrollToTop}
        sticky={sticky}
      />
    )}
  />
);

export default FooterWithQuery;
