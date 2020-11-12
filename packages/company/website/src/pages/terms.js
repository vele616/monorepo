import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/Layout";
import PropTypes from 'prop-types';
import '@crocoder-dev/components/lib/main.css';
import { Typography, Section } from '@crocoder-dev/components';

const Terms = ({ data }) => {
  const { content, title, license, links, contact } = data.termsJson;
  return (
    <Layout pageTitle="Terms of use">
      <Section style={{paddingTop: 0}}>
        <Typography fontSize="34" element="h1">
          {title}
        </Typography>
        <Typography
          fontSize="14"
          dangerouslySetInnerHTML={{
            __html: content.childMarkdownRemark.html,
          }}
        />
      </Section>
      <Section style={{paddingTop: 0}}>
        <Typography fontSize="24" element="h2">
          {license.title}
        </Typography>
        <Typography
          fontSize="14"
          dangerouslySetInnerHTML={{
            __html: license.content.childMarkdownRemark.html,
          }}
        />
      </Section>
      <Section style={{paddingTop: 0}}>
        <Typography fontSize="24" element="h2">
          {links.title}
        </Typography>
        <Typography
          fontSize="14"
          dangerouslySetInnerHTML={{
            __html: links.content.childMarkdownRemark.html,
          }}
        />
      </Section>
      <Section style={{paddingTop: 0}}>
        <Typography
          fontSize="14"
          dangerouslySetInnerHTML={{
            __html: contact.content.childMarkdownRemark.html,
          }}
        />
      </Section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Layout>
  );
};

export default Terms;

export const query = graphql`
  query TermsQuery {
    termsJson {
      content {
        childMarkdownRemark {
          html
        }
      }
      title
      license {
        title
        content {
          childMarkdownRemark {
            html
          }
        }
      }
      links {
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

Terms.propTypes = {
  data: PropTypes.object.isRequired,
};