import React from "react";
import Layout from "../components/Layout";
import ContactUsSection from "../components/ContactUs";

const ContactUs = ({ data }) => {
  return (
    <Layout pageTitle="Contact Us">
      <ContactUsSection />
    </Layout>
  );
};

export default ContactUs;
