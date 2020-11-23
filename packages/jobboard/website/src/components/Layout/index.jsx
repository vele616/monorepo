import React from "react";
import './index.scss';
import { Link } from 'gatsby';
import '@crocoder-dev/components/lib/main.css';
import { Navigation, Button } from '@crocoder-dev/components';
import Footer from '../Footer';
import CrocNav from '../../images/croc-nav.svg';
import Head from '../Head';


const Layout = ({ children, head = {}, stickyFooter }) => {
  return (
    <>
      <Head title={head.title} description={head.description} />
      <Navigation Logo={<Link to='/'><CrocNav /></Link>}>
        <Link to="/post-a-job"><Button variant="secondary">Post a job</Button></Link>
      </Navigation>
       {children}
      <Footer sticky={stickyFooter} />
    </>
  )
}

export default Layout;