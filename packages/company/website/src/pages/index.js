import React, { useEffect, useRef } from "react";
import { navigate } from "gatsby";
import Layout from "../components/Layout";
import WhatCanWeDo from "../components/WhatCanWeDo";
import OurWorkProcess from "../components/OurWorkProcess";
import HowWeWork from "../components/HowWeWork";
import OurServices from "../components/OurServices";
import Hero from "../components/Hero";
import ContactUs from "../components/ContactUs";
import "./index.scss";

export default function Home({ location }) {
  const contactUsRef = useRef(null);

  const howWeWorkRef = useRef(null);

  const topRef = useRef(null);

  const scrollToTop = () => topRef.current.scrollIntoView({ block: "end" });

  const scrollToContactUs = () => contactUsRef.current.scrollIntoView();

  const scrollToHowWeWork = () =>
    howWeWorkRef.current.scrollIntoView({ block: "start" });

  useEffect(() => {
    if (location && location.state && location.state.scroll) {
      scrollToContactUs();
      navigate("/", {
        state: {
          scroll: false,
        },
      });
    }
  }, []);

  return (
    <Layout
      scrollToTop={scrollToTop}
      scrollToContactUs={scrollToContactUs}
      stickyFooter
    >
      <Hero
        topRef={topRef}
        scrollToHowWeWork={scrollToHowWeWork}
        scrollToContactUs={scrollToContactUs}
      />
      <WhatCanWeDo />
      <HowWeWork howWeWorkRef={howWeWorkRef} />
      <OurWorkProcess />
      <OurServices />
      <ContactUs contactUsRef={contactUsRef} />
    </Layout>
  );
}
