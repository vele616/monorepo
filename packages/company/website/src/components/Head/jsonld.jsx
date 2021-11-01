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
const createOrganizationJSONLD = ({ company, websites, url, logo }) => ({
  "@context": "http://schema.org/",
  "@type": "Organization",
  name: company.name,
  logo,
  url,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.street,
    addressLocality: company.city,
    addressRegion: company.region,
    postalCode: company.postalCode,
    addressCountry: company.country,
  },
  sameAs: websites,
});

const createArticleJSONLD = ({ article, company, logo, url }) => ({
  "@context": "http://schema.org/",
  "@type": "Article",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${url}${article.slug}`,
  },
  author: {
    "@type": "Person",
    name: article.author.name,
  },
  publisher: {
    "@type": "Organization",
    name: company.name,
    logo: {
      "@type": "ImageObject",
      url: logo,
    },
  },
  name: article.headline,
  headline: article.headline,
  articleBody: article.articleBody,
  about: article.about,
  abstract: article.abstract,
  image: article.imageUrl,
  datePublished: article.datePublished,
  dateModified: article.dateModified,
});

const createJSONLD = (type, data) => {
  switch (type) {
    case JSONLDType.ORGANIZATION:
      return JSON.stringify(createOrganizationJSONLD(data));
    case JSONLDType.ARTICLE:
      return JSON.stringify(createArticleJSONLD(data));
    default:
      return null;
  }
};

export default createJSONLD;

export const JSONLDType = {
  ORGANIZATION: "ORGANIZATION",
  ARTICLE: "ARTICLE",
};

/*<script type="application/ld+json">
</script>*/
