import React, { useEffect, useRef } from "react";
import Layout from "../components/Layout";
import OurClients from "../components/OurClients";
import HowWeWork from "../components/HowWeWork";
import Hero from "../components/Hero";
import ContactUs from "../components/ContactUs";
import "./index.scss";
import { JSONLDType } from "../components/Head/jsonld";

export default function Home() {
  const contactUsRef = useRef(null);

  const topRef = useRef(null);

  const scrollToTop = () => topRef.current.scrollIntoView({ block: "end" });

  const scrollToContactUs = () => contactUsRef.current.scrollIntoView();

  return (
    <Layout
      jsonldType={JSONLDType.ORGANIZATION}
      scrollToTop={scrollToTop}
      scrollToContactUs={scrollToContactUs}
      stickyFooter
    >
      <article>
        <Hero topRef={topRef} scrollToContactUs={scrollToContactUs} />
        <OurClients scrollToContactUs={scrollToContactUs} />
        <HowWeWork />
        <ContactUs contactUsRef={contactUsRef} />
      </article>
    </Layout>
  );
}
