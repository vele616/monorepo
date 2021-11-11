/* eslint-disable react/prop-types */
import React from 'react';
import styles from './index.module.scss';
import { Link } from 'gatsby';
import '@crocoder-dev/components/lib/main.css';
import { Navigation, Typography } from '@crocoder-dev/components';
import Footer from '../Footer';
import CrocNav from '../../images/logo.svg';
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
        className={styles.navigation}
        Logo={
          <Link
            to="/"
            className={styles.crocoderLogo}
            onClick={() => {
              if (scrollToTop) scrollToTop();
            }}
          >
            {/* <CrocNav
              style={{ height: '40px',marginRight: '7px', verticalAlign: 'middle', display: 'inline-block' }}
            /> */}
            <Typography fontSize={30} fontWeight={700} className={styles.title}>
              Cro
              <span className={styles.coder}>Coder</span> Jobs
            </Typography>
          </Link>
        }
      >
        <Link to="/" className={'link'}>
          Home
        </Link>
        <Link className={'link'} to="/search/">
          Search
        </Link>
        <Link style={{ minWidth: '74px' }} className={'link'} to="/post-a-job">
          Post a job
        </Link>
        <a
          className={'link'}
          rel="noreferrer noopener"
          target="_blank"
          href="https://crocoder.dev"
          style={{ minWidth: '124px' }}
        >
          About{' '}
          <Typography fontWeight={600}>
            <Typography fontWeight={600} color="primary">
              Cro
            </Typography>
            Coder
          </Typography>
        </a>
      </Navigation>
      {children}
      <Footer scrollToTop={scrollToTop} sticky={stickyFooter} />
    </>
  );
};

export default Layout;
