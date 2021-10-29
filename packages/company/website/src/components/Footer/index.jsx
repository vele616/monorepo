import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import CrocFooter from "../../images/croc-footer.svg";
import { Icon, Footer as FooterComponent } from "@crocoder-dev/components";
import styles from "./index.module.scss";

const Footer = ({ socialMedia, goToHomeAria, scrollToTop }) => {
  return (
    <FooterComponent
      copyrightNotice="Copyright © CroCoder Inc. All rights reserved"
      className={styles.footer}
      logo={
        <Link
          to="/"
          onClick={() => {
            if (scrollToTop) scrollToTop();
          }}
          aria-label={goToHomeAria}
        >
          <div
            className={styles.image}
            style={{ visibility: "visible" }}
            aria-hidden="true"
          >
            <CrocFooter />
          </div>
        </Link>
      }
      socialLinks={
        <>
          {socialMedia.map((mediaLink) => (
            <a
              rel="nofollow noopener noreferrer"
              className={styles.icon}
              key={mediaLink.icon}
              href={mediaLink.link}
              aria-label={mediaLink.aria}
            >
              <Icon
                aria-hidden="true"
                style={{ visibility: "visible" }}
                color="gray_1"
                icon={mediaLink.icon}
              />
            </a>
          ))}
        </>
      }
    >
      <Link to="/" style={{ color: "inherit" }} className="link">
        Home
      </Link>
      <Link to="/terms" style={{ color: "inherit" }} className="link">
        Terms of use
      </Link>
      <Link to="/privacy_policy" style={{ color: "inherit" }} className="link">
        Privacy policy
      </Link>
    </FooterComponent>
  );
};

const FooterWithQuery = ({ sticky, scrollToTop }) => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          goToHomeAria
          footer {
            socialMedia {
              link
              icon
              aria
            }
          }
        }
      }
    `}
    render={(data) => (
      <Footer
        {...data.homeJson.footer}
        goToHomeAria={data.homeJson.goToHomeAria}
        scrollToTop={scrollToTop}
        sticky={sticky}
      />
    )}
  />
);

export default FooterWithQuery;
