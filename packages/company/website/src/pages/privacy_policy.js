import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PropTypes from "prop-types";
import "@crocoder-dev/components/lib/main.css";
import { Typography, Section } from "@crocoder-dev/components";

const lineHeight = { lineHeight: "1.8" };

const PrivacyPolicy = ({ data }) => {
  const {
    content,
    title,
    websitevisitors,
    gathering,
    external,
    statistics,
    changes,
    contact,
  } = data.privacypolicyJson;
  return (
    <Layout pageTitle="Privacy policy">
      <Section style={{ paddingTop: 0, paddingBottom: "20px" }}>
        <Typography fontSize={34} element="h1" color="gray_2">
          {title}
        </Typography>
        <Typography
          color="gray_11"
          style={lineHeight}
          fontSize={14}
          dangerouslySetInnerHTML={{
            __html: content.childMarkdownRemark.html,
          }}
        />
      </Section>
      <Section style={{ paddingTop: 0, paddingBottom: "20px" }}>
        <Typography fontSize={24} element="h2" color="gray_2">
          {websitevisitors.title}
        </Typography>
        <Typography
          fontSize={14}
          color="gray_11"
          style={lineHeight}
          dangerouslySetInnerHTML={{
            __html: websitevisitors.content.childMarkdownRemark.html,
          }}
        />
      </Section>
      <Section style={{ paddingTop: 0, paddingBottom: "20px" }}>
        <Typography fontSize={24} element="h2" color="gray_2">
          {gathering.title}
        </Typography>
        <Typography
          fontSize={14}
          color="gray_11"
          style={lineHeight}
          dangerouslySetInnerHTML={{
            __html: gathering.content.childMarkdownRemark.html,
          }}
        />
      </Section>
      <Section style={{ paddingTop: 0, paddingBottom: "20px" }}>
        <Typography fontSize={24} element="h2" color="gray_2">
          {external.title}
        </Typography>
        <Typography
          fontSize={14}
          color="gray_11"
          style={lineHeight}
          dangerouslySetInnerHTML={{
            __html: external.content.childMarkdownRemark.html,
          }}
        />
      </Section>
      <Section style={{ paddingTop: 0, paddingBottom: "20px" }}>
        <Typography fontSize={24} element="h2" color="gray_2">
          {statistics.title}
        </Typography>
        <Typography
          color="gray_11"
          fontSize={14}
          style={lineHeight}
          dangerouslySetInnerHTML={{
            __html: statistics.content.childMarkdownRemark.html,
          }}
        />
      </Section>
      <Section style={{ paddingTop: 0, paddingBottom: "20px" }}>
        <Typography fontSize={24} element="h2" color="gray_2">
          {changes.title}
        </Typography>
        <Typography
          style={lineHeight}
          fontSize={14}
          color="gray_11"
          dangerouslySetInnerHTML={{
            __html: changes.content.childMarkdownRemark.html,
          }}
        />
      </Section>
      <Section style={{ paddingTop: 0, paddingBottom: "20px" }}>
        <Typography
          fontSize={14}
          color="gray_11"
          dangerouslySetInnerHTML={{
            __html: contact.content.childMarkdownRemark.html,
          }}
        />
      </Section>
    </Layout>
  );
};

export default PrivacyPolicy;

export const query = graphql`
  query PrivacyPolicy {
    privacypolicyJson {
      content {
        childMarkdownRemark {
          html
        }
      }
      title
      websitevisitors {
        title
        content {
          childMarkdownRemark {
            html
          }
        }
      }
      gathering {
        title
        content {
          childMarkdownRemark {
            html
          }
        }
      }
      external {
        title
        content {
          childMarkdownRemark {
            html
          }
        }
      }
      statistics {
        title
        content {
          childMarkdownRemark {
            html
          }
        }
      }
      changes {
        title
        content {
          childMarkdownRemark {
            html
          }
        }
      }
      contact {
        content {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;

PrivacyPolicy.propTypes = {
  data: PropTypes.object.isRequired,
};
