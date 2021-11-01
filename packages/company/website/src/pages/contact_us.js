import React from "react";
import Layout from "../components/Layout";
import Img from "gatsby-image";
import { graphql, Link } from "gatsby";
import { Section, Typography, Button } from "@crocoder-dev/components";
import ContactUsSection from "../components/ContactUs";

const ContactUs = ({ data }) => {
  return (
    <Layout pageTitle="Contact Us">
      <ContactUsSection />
    </Layout>
  );
};

export default ContactUs;
