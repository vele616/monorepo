const siteConfig = require('./site-config');

require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    ...siteConfig,
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    'gatsby-transformer-json',
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images\/.*\.svg$/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'jobs',
        engine: 'flexsearch',
        engineOptions: {
          encode: "balance",
          tokenize: "full",
          threshold: 1,
      },
        query: `
        {
          allMarkdownRemark(sort: {fields: [frontmatter___timestamp, frontmatter___featured], order: DESC}, filter: {frontmatter: {archived: {ne: "true"}}}) {
            nodes {
              id
              fields {
                slug
              }
              frontmatter {
                title
                hashtags
                companyName
                summary
              }
              rawMarkdownBody
            }
          }
        }
        `,
        ref: 'id',
        index: ['title', 'indexedSlug', 'companyName', 'summary', 'body', 'hashtagsString'],
        store: ['slug', 'title', 'companyName', 'summary', 'hashtags'],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            slug: node.fields.slug,
            indexedSlug: node.fields.slug.split('-').join(' '),
            summary: node.frontmatter.summary,
            hashtags: node.frontmatter.hashtags.split(',').slice(0,3),
            hashtagsString: node.frontmatter.hashtags.split(',').slice(0,3).join(' ').replace(/#/g, ''),
            companyName: node.frontmatter.companyName,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
          })),
      },
    },
  ],
};
