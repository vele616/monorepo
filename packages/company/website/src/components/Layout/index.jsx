import React from "react";
import "./index.css";
import { Link } from "gatsby";
import "@crocoder-dev/components/lib/main.css";
import { Navigation, Button } from "@crocoder-dev/components";
import Footer from "../Footer";
import CrocNav from "../../images/croc-nav.svg";
import Head from "../Head";

const Layout = ({ children, stickyFooter, pageTitle }) => {
  return (
    <>
      <Head pageTitle={pageTitle} />
      <Navigation
        Logo={
          <Link to="/">
            <CrocNav />
          </Link>
        }
      >
        <Button variant="secondary">Contact Us</Button>
      </Navigation>
      {children}
      <Footer sticky={stickyFooter} />
    </>
  );
};

export default Layout;
