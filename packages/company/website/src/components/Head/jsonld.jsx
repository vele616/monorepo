/*
{  
  "@context": "http://schema.org/",
  "@type": "Organization",
  "name": "CroCoder, Inc.",
  "logo": "https://crocoder.dev/images/logo.png",
  "url": "https://crocoder.dev",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "651 N BROAD ST SUITE 206",
    "addressLocality": "MIDDLETOWN",
    "addressRegion": "DELAWARE",
    "postalCode": "19709",
    "addressCountry": "United States"
  },
  "sameAs": ["https://www.linkedin.com/company/crocoderdev", "https://twitter.com/crocoderdev", "https://www.youtube.com/channel/UCWU6cnq4hp4LnunPhP-sAqA"]
}
*/
const createOrganizationJSONLD = ({
  name,
  logo,
  url,
  street,
  city,
  state,
  postalCode,
  country,
  websites,
}) => ({
  "@context": "http://schema.org/",
  "@type": "Organization",
  name,
  logo,
  url,
  address: {
    "@type": "PostalAddress",
    streetAddress: street,
    addressLocality: city,
    addressRegion: state,
    postalCode,
    addressCountry: country,
  },
  sameAs: websites,
});

const createArticleJSONLD = () => {};

const createJSONLD = (type) => {
  switch (type) {
    case JSONLDType.ORGANIZATION:
      return createOrganizationJSONLD;
    case JSONLDType.ARTICLE:
      return createArticleJSONLD;
    default:
      return () => null;
  }
};

export default createJSONLD;

export const JSONLDType = {
  ORGANIZATION: "ORGANIZATION",
  ARTICLE: "ARTICLE",
};

/*<script type="application/ld+json">
</script>*/
