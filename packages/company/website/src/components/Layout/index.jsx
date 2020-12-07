import React from "react";
import { Link } from "gatsby";
import "@crocoder-dev/components/lib/main.css";
import { Navigation, Button, Typography } from "@crocoder-dev/components";
import Footer from "../Footer";
import CrocNav from "../../images/croc-nav.svg";
import styles from "./index.module.scss";
import Head from "../Head";

const Layout = ({ children, stickyFooter, pageTitle, scrollToContactUs }) => {
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
            <Button
              onClick={() => {
                toggle();
                window.sa_event(
                  `${process.env.GATSBY_SCHEDULE_CALL_NAVIGATION_CLICK_SA_EVENT}`
                );
                scrollToContactUs && scrollToContactUs();
              }}
              variant="secondary"
            >
              Contact Us
            </Button>
          </>
        )}
      </Navigation>
      {children}
      <Footer sticky={stickyFooter} />
    </>
  );
};

export default Layout;
