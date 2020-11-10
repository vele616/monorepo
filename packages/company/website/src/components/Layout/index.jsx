import React from "react";
import './index.css';
import { Link } from 'gatsby';
import '@crocoder-dev/components/lib/main.css';
import { Navigation } from '@crocoder-dev/components';
import Footer from '../Footer';
import CrocNav from '../../images/croc-nav.svg';


const Layout = ({ children }) => {
  return (
    <>
      <Navigation Logo={<Link to='/'><CrocNav /></Link>}>
      </Navigation>
       {children}
      <Footer />
    </>
  )
}

export default Layout;