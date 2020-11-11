import React from "react";
import './index.css';
import { Link } from 'gatsby';
import '@crocoder-dev/components/lib/main.css';
import { Navigation } from '@crocoder-dev/components';
import Footer from '../Footer';
import CrocNav from '../../images/croc-nav.svg';
import Head from '../Head';


const Layout = ({ children, stickyFooter, pageTitle }) => {
  return (
    <>
      <Head pageTitle={pageTitle} />
      <Navigation Logo={<Link to='/'><CrocNav /></Link>}>
      </Navigation>
       {children}
      <Footer sticky={stickyFooter} />
    </>
  )
}

export default Layout;