import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import { Location } from "@reach/router";
import createJSONLD, { JSONLDType } from "./jsonld";

const Head = ({
  siteTitle,
  siteTitleShort,
  siteDescription,
  siteUrl,
  logoUrl,
  themeColor,
  social,
  location,
  title,
  description,
  company,
  canonical = siteUrl + (location.pathname || ""),
  pageTitleFull = title ? `${title} - ${siteTitle}` : siteTitle,
}) => {
  return (
    <Helmet defer={false}>
      <html lang="en" />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <meta
        content="width=device-width,initial-scale=1.0,user-scalable=yes"
        name="viewport"
      />
      <link rel="canonical" href={canonical} />
      <link href="/manifest.json" rel="manifest" />
      <meta content={themeColor} name="theme-color" />
      <meta content={siteTitle} name="application-name" />

      {/** JSONLD */}
      <script type="application/ld+json">
        {JSON.stringify(
          createJSONLD(JSONLDType.ORGANIZATION)({
            ...company,
            state: company.region,
            logo: logoUrl,
            url: siteUrl,
            websites: Object.entries(social),
          })
        )}
      </script>

      {/* Title */}
      <title>{pageTitleFull}</title>

      {/* Description */}
      <meta content={description || siteDescription} name="description" />

      {/* Favicon */}
      <link
        href="/icons/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/icons/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />

      {/* Twitter */}
      <meta content={pageTitleFull} name="twitter:title" />
      <meta
        content={description || siteDescription}
        name="twitter:description"
      />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content="@crocoderdev" name="twitter:site" />
      <meta content="@crocoderdev" name="twitter:creator" />
      <meta content={pageTitleFull} name="twitter:text:title" />
      <meta content={canonical} name="twitter:url" />
      <meta content={`${siteUrl}/social.png`} name="twitter:image" />
      <meta content="1024" name="twitter:image:width" />
      <meta content="512" name="twitter:image:height" />

      {/* OG */}
      <meta content={pageTitleFull} property="og:title" />
      <meta
        content={description || siteDescription}
        property="og:description"
      />
      <meta content="website" property="og:type" />
      <meta content={siteTitle} property="og:site_name" />
      <meta content={canonical} property="og:url" />
      <meta content="1024" property="og:image:width" />
      <meta content="512" property="og:image:height" />
      <meta content={`${siteUrl}/social.png`} property="og:image" />

      {/* Apple */}
      <meta content={siteTitle} name="apple-mobile-web-app-title" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta
        content="black-translucent"
        name="apple-mobile-web-app-status-bar-style"
      />
      <link
        href="/icons/apple-touch-icon-57x57.png"
        rel="apple-touch-icon"
        sizes="57x57"
      />
      <link
        href="/icons/apple-touch-icon-60x60.png"
        rel="apple-touch-icon"
        sizes="60x60"
      />
      <link
        href="/icons/apple-touch-icon-72x72.png"
        rel="apple-touch-icon"
        sizes="72x72"
      />
      <link
        href="/icons/apple-touch-icon-76x76.png"
        rel="apple-touch-icon"
        sizes="76x76"
      />
      <link
        href="/icons/apple-touch-icon-114x114.png"
        rel="apple-touch-icon"
        sizes="114x114"
      />
      <link
        href="/icons/apple-touch-icon-120x120.png"
        rel="apple-touch-icon"
        sizes="120x120"
      />
      <link
        href="/icons/apple-touch-icon-144x144.png"
        rel="apple-touch-icon"
        sizes="144x144"
      />
      <link
        href="/icons/apple-touch-icon-152x152.png"
        rel="apple-touch-icon"
        sizes="152x152"
      />
      <link
        href="/icons/apple-touch-icon-167x167.png"
        rel="apple-touch-icon"
        sizes="167x167"
      />
      <link
        href="/icons/apple-touch-icon-180x180.png"
        rel="icon"
        sizes="180x180"
        type="image/png"
      />

      {/* msapplication */}
      <meta content={themeColor} name="msapplication-TileColor" />
      <meta
        content="/icons/mstile-70x70.png"
        name="msapplication-square70x70"
      />
      <meta
        content="/icons/mstile-144x144.png"
        name="msapplication-square144x144"
      />
      <meta
        content="/icons/mstile-150x150.png"
        name="msapplication-square150x150"
      />
      <meta
        content="/icons/mstile-310x150.png"
        name="msapplication-wide310x150"
      />
      <meta
        content="/icons/mstile-310x310.png"
        name="msapplication-square310x310"
      />
    </Helmet>
  );
};

Head.propTypes = {
  siteTitle: PropTypes.string,
  siteTitleShort: PropTypes.string,
  siteDescription: PropTypes.string,
  siteUrl: PropTypes.string,
  themeColor: PropTypes.string,
  social: PropTypes.objectOf(PropTypes.string),
  imageUrl: PropTypes.string,
  canonical: PropTypes.string,
  pageTitle: PropTypes.string,
  pageTitleFull: PropTypes.string,
  location: PropTypes.object.isRequired,
};

const HeadWithQuery = (props) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteTitle
            siteTitleShort
            siteDescription
            siteUrl
            logoUrl
            company {
              name
              street
              region
              postalCode
              country
            }
            themeColor
            social {
              twitter
              linkedin
              youtube
            }
          }
        }
      }
    `}
    render={(data) => (
      <Location>
        {({ location }) => (
          <Head {...data.site.siteMetadata} {...props} location={location} />
        )}
      </Location>
    )}
  />
);

export default HeadWithQuery;
