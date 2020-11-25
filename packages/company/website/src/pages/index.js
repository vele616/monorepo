import React, { useRef } from "react";
import Layout from "../components/Layout";
import WhatCanWeDo from "../components/WhatCanWeDo";
import HowWeWork from "../components/HowWeWork";
import OurServices from "../components/OurServices";
import Hero from "../components/Hero";
import ContactUs from "../components/ContactUs";
import "./index.scss";

export default function Home() {
  const contactUsRef = useRef(null);

  const howWeWorkRef = useRef(null);

  const scrollToContactUs = () => contactUsRef.current.scrollIntoView();

  const scrollToHowWeWork = () => howWeWorkRef.current.scrollIntoView({ block: 'start' });

  return (
    <Layout scrollToContactUs={scrollToContactUs} stickyFooter>
      <Hero
        scrollToHowWeWork={scrollToHowWeWork}
        scrollToContactUs={scrollToContactUs}
      />
      <WhatCanWeDo />
      <HowWeWork howWeWorkRef={howWeWorkRef} />
      <OurServices />
      <ContactUs contactUsRef={contactUsRef} />
    </Layout>
  );
}
