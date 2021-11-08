import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import CrocFooter from "../../images/croc-footer.svg";
import { Icon, Footer as FooterComponent } from "@crocoder-dev/components";
import styles from "./index.module.scss";

const Footer = ({ footer, navigation, scrollToTop }) => {
  return (
    <FooterComponent
      copyrightNotice={footer.copyrightNotice}
      className={styles.footer}
      logo={
        <Link
          to="/"
          onClick={() => {
            if (scrollToTop) scrollToTop();
          }}
          aria-label={navigation.home.ariaLabel}
        >
          <div
            className={styles.image}
            style={{ visibility: "visible" }}
            aria-hidden="true"
          >
            <CrocFooter className={styles.crocoderLogo} />
          </div>
        </Link>
      }
      socialLinks={
        <>
          {footer.socialMedia.map((mediaLink) => (
            <a
              rel="nofollow noopener noreferrer"
              className={styles.icon}
              key={mediaLink.icon}
              href={mediaLink.link}
              aria-label={mediaLink.ariaLabel}
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
        {navigation.home.text}
      </Link>
      <Link to="/terms" style={{ color: "inherit" }} className="link">
        {navigation.terms.text}
      </Link>
      <Link to="/privacy_policy" style={{ color: "inherit" }} className="link">
        {navigation.privacy.text}
      </Link>
    </FooterComponent>
  );
};

const FooterWithQuery = ({ sticky, scrollToTop }) => (
  <StaticQuery
    query={graphql`
      query {
        layoutJson {
          navigation {
            home {
              ariaLabel
              text
            }
            terms {
              text
            }
            privacy {
              text
            }
          }
          footer {
            copyrightNotice
            socialMedia {
              link
              icon
              ariaLabel
            }
          }
        }
      }
    `}
    render={(data) => (
      <Footer {...data.layoutJson} scrollToTop={scrollToTop} sticky={sticky} />
    )}
  />
);

export default FooterWithQuery;
