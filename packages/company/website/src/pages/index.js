import React from "react";
import Layout from "../components/Layout";
import WhatCanWeDo from "../components/WhatCanWeDo";
import Hero from "../components/Hero";
import ContactUs from "../components/ContactUs";
import "./index.scss";

export default function Home() {
  return (
    <Layout stickyFooter>
      <Hero />
      <WhatCanWeDo />
      <ContactUs />
    </Layout>
  );
}
