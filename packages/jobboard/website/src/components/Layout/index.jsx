/* eslint-disable react/prop-types */
import React from 'react';
import styles from './index.module.scss';
import { Link } from 'gatsby';
import '@crocoder-dev/components/lib/main.css';
import { Navigation, Button, Typography } from '@crocoder-dev/components';
import Footer from '../Footer';
import CrocNav from '../../images/croc-nav.svg';
import Head from '../Head';

const Layout = ({ children, head = {}, stickyFooter }) => {
  return (
    <>
      <Head
        socialImageUrl={head.socialImageUrl}
        title={head.title}
        description={head.description}
      />
      <Navigation
        Logo={
          <Link to="/">
            <CrocNav style={{ verticalAlign: 'bottom' }} />
          </Link>
        }
      >
        <Link className={`${styles.aboutUs} link`} to="https://crocoder.dev/">
          About{' '}
          <Typography fontWeight={600}>
            <Typography fontWeight={600} color="primary">
              Cro
            </Typography>
            Coder
          </Typography>
        </Link>
        <Link to="/post-a-job">
          <Button variant="secondary">Post a job</Button>
        </Link>
      </Navigation>
      {children}
      <Footer sticky={stickyFooter} />
    </>
  );
};

export default Layout;
