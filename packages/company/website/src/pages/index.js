import React, { useEffect, useRef } from "react";
import Layout from "../components/Layout";
import OurClients from "../components/OurClients";
import HowWeWork from "../components/HowWeWork";
import Hero from "../components/Hero";
import ContactUs from "../components/ContactUs";
import "./index.scss";

export default function Home({ location }) {
  const contactUsRef = useRef(null);

  const howWeWorkRef = useRef(null);

  const topRef = useRef(null);

  const scrollToTop = () => topRef.current.scrollIntoView({ block: "end" });

  const scrollToContactUs = () => contactUsRef.current.scrollIntoView();

  return (
    <Layout
      scrollToTop={scrollToTop}
      scrollToContactUs={scrollToContactUs}
      stickyFooter
    >
      <Hero topRef={topRef} scrollToContactUs={scrollToContactUs} />
      <OurClients scrollToContactUs={scrollToContactUs} />
      <HowWeWork />
      <ContactUs contactUsRef={contactUsRef} />
    </Layout>
  );
}
