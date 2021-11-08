import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import "@crocoder-dev/components/lib/main.css";
import { Navigation, Typography } from "@crocoder-dev/components";
import Footer from "../Footer";
import CrocNav from "../../images/croc-nav.svg";
import styles from "./index.module.scss";
import Head from "../Head";

const Layout = ({
  children,
  stickyFooter,
  pageTitle,
  scrollToTop,
  jsonldType,
  article,
  home,
  blog,
  contactUs,
}) => {
  return (
    <>
      <Head jsonldType={jsonldType} article={article} pageTitle={pageTitle} />
      <Navigation
        Logo={
          <Link
            to="/"
            aria-label={home.ariaLabel}
            onClick={() => {
              if (scrollToTop) scrollToTop();
            }}
          >
            <CrocNav className={styles.crocoderLogo} area-hidden="true" />
          </Link>
        }
      >
        {() => (
          <>
            <Link className={`${styles.home} link`} to="/">
              {home.text}
            </Link>

            <Link className={`${styles.jobs} link`} to="/blog">
              {blog.text}
            </Link>
            <Link className={`${styles.contactus1} link`} to="/contact">
              {contactUs.text}
            </Link>
            <a
              target="_blank"
              rel="noreferrer noopener"
              className={`${styles.jobs} link`}
              href="https://jobs.crocoder.dev/"
            >
              <Typography fontWeight={600}>
                <Typography
                  fontWeight={600}
                  style={{ color: "#647E1B" }}
                  color="primary"
                >
                  Cro
                </Typography>
                Coder
              </Typography>{" "}
              Jobs
            </a>
          </>
        )}
      </Navigation>
      <main>{children}</main>
      <Footer scrollToTop={scrollToTop} sticky={stickyFooter} />
    </>
  );
};

const LayoutWithQuery = (props) => (
  <StaticQuery
    query={graphql`
      query {
        layoutJson {
          navigation {
            home {
              ariaLabel
              text
            }
            blog {
              text
            }
            contactUs {
              text
            }
          }
        }
      }
    `}
    render={(data) => <Layout {...data.layoutJson.navigation} {...props} />}
  />
);

export default LayoutWithQuery;
