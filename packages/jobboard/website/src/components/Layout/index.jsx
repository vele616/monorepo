/* eslint-disable react/prop-types */
import React from 'react';
import styles from './index.module.scss';
import { Link } from 'gatsby';
import '@crocoder-dev/components/lib/main.css';
import { Navigation, Button, Typography } from '@crocoder-dev/components';
import Footer from '../Footer';
import CrocNav from '../../images/croc-nav.svg';
import Head from '../Head';

const Layout = ({ children, head = {}, stickyFooter, scrollToTop }) => {
  return (
    <>
      <Head
        socialImageUrl={head.socialImageUrl}
        title={head.title}
        description={head.description}
      />
      <Navigation
        Logo={
          <Link to="/" onClick={
            () => {
              if(scrollToTop) scrollToTop();
            }
          }>
            <CrocNav style={{ verticalAlign: 'bottom' }} />
          </Link>
        }
      >
        <a
          className={`${styles.aboutUs} link`}
          rel="noreferrer noopener"
          target="_blank"
          href="https://crocoder.dev/"
        >
          About{' '}
          <Typography fontWeight={600}>
            <Typography fontWeight={600} color="primary">
              Cro
            </Typography>
            Coder
          </Typography>
        </a>
        <Link to="/post-a-job">
          <Button variant="secondary">Post a job</Button>
        </Link>
      </Navigation>
      {children}
      <Footer scrollToTop={scrollToTop} sticky={stickyFooter} />
    </>
  );
};

export default Layout;
