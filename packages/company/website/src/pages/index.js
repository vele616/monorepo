import React, { useRef } from "react";
import Layout from "../components/Layout";
import WhatCanWeDo from "../components/WhatCanWeDo";
import OurWorkProcess from "../components/OurWorkProcess";
import HowWeWork from "../components/HowWeWork";
import OurServices from "../components/OurServices";
import Hero from "../components/Hero";
import ContactUs from "../components/ContactUs";
import "./index.scss";

export default function Home() {
  const contactUsRef = useRef(null);

  const ourWorkProcessRef = useRef(null);

  const scrollToContactUs = () => contactUsRef.current.scrollIntoView();

  const scrollToOurWorkProcess = () =>
    ourWorkProcessRef.current.scrollIntoView({ block: "start" });

  return (
    <Layout scrollToContactUs={scrollToContactUs} stickyFooter>
      <Hero
        scrollToOurWorkProcess={scrollToOurWorkProcess}
        scrollToContactUs={scrollToContactUs}
      />
      <WhatCanWeDo />
      <HowWeWork />
      <OurWorkProcess ourWorkProcessRef={ourWorkProcessRef} />
      <OurServices />
      <ContactUs contactUsRef={contactUsRef} />
    </Layout>
  );
}
