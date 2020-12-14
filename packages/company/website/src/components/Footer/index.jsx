import React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import CrocFooter from "../../images/croc-footer.svg";
import { Icon, Footer as FooterComponent } from "@crocoder-dev/components";
import styles from "./index.module.scss";

const Footer = ({ image, socialMedia, sticky }) => {
  return (
    <FooterComponent
      className={sticky ? styles.sticky : ""}
      logo={
        <Link to="/">
          <div className={styles.image}>
            <CrocFooter />
          </div>
        </Link>
      }
      socialLinks={
        <>
          {socialMedia.map((mediaLink) => (
            <a
              className={styles.icon}
              key={mediaLink.icon}
              href={mediaLink.link}
            >
              <Icon color="gray_1" icon={mediaLink.icon} />
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

const FooterWithQuery = ({ sticky }) => (
  <StaticQuery
    query={graphql`
      query {
        homeJson {
          footer {
            socialMedia {
              link
              icon
            }
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => <Footer {...data.homeJson.footer} sticky={sticky} />}
  />
);

export default FooterWithQuery;
