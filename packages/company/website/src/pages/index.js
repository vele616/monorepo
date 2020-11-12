import React from "react";
import Layout from "../components/Layout";
import Contact from "../components/Contact";
import './index.scss';

export default function Home() {
  return (
    <Layout stickyFooter>
      <Contact />
    </Layout>
  );
}
