import React from "react";
import Layout from "../components/Layout";
import WhatCanWeDo from "../components/WhatCanWeDo";
import Hero from "../components/Hero";
import "./index.scss";

export default function Home() {
  return (
    <Layout stickyFooter>
      <Hero />
      <WhatCanWeDo />
    </Layout>
  );
}
