import React from "react";
import { Link } from "gatsby";
import "@crocoder-dev/components/lib/main.css";
import { Navigation, Button, Typography } from "@crocoder-dev/components";
import Footer from "../Footer";
import CrocNav from "../../images/croc-nav.svg";
import styles from "./index.module.scss";
import Head from "../Head";

const Layout = ({
  children,
  stickyFooter,
  pageTitle,
  scrollToContactUs,
  scrollToTop,
  jsonldType,
  article,
}) => {
  return (
    <>
      <Head jsonldType={jsonldType} article={article} pageTitle={pageTitle} />
      <Navigation
        Logo={
          <Link
            to="/"
            aria-label="Go to Home page"
            onClick={() => {
              if (scrollToTop) scrollToTop();
            }}
          >
            <CrocNav area-hidden="true" />
          </Link>
        }
      >
        {(toggle) => (
          <>
            <a
              target="_blank"
              rel="noreferrer noopener"
              className={`${styles.jobs} link`}
              href="https://jobs.crocoder.dev/"
            >
              <Typography fontWeight={600}>
                <Typography fontWeight={600} color="primary">
                  Cro
                </Typography>
                Coder
              </Typography>{" "}
              Jobs
            </a>
            <Link className={`${styles.jobs} link`} to="/blog">
              Blog
            </Link>
            <Link className={`${styles.contactus} link`} to="/contact_us">
              Contact Us
            </Link>
          </>
        )}
      </Navigation>
      <main>{children}</main>
      <Footer scrollToTop={scrollToTop} sticky={stickyFooter} />
    </>
  );
};

export default Layout;
