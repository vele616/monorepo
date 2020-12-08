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
        engineOptions: 'speed',
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
                companyName
                summary
              }
              rawMarkdownBody
            }
          }
        }
        `,
        ref: 'id',
        index: ['title', 'companyName', 'summary', 'body'],
        store: ['slug', 'title', 'companyName', 'summary'],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            slug: node.fields.slug,
            summary: node.frontmatter.summary,
            companyName: node.frontmatter.companyName,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
          })),
      },
    },
  ],
};
