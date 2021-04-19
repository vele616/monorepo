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
          encode: 'extra',
          tokenize: 'strict',
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
                logoUrl
              }
              rawMarkdownBody
            }
          }
        }
        `,
        ref: 'id',
        index: [
          'title',
          'indexedSlug',
          'companyName',
          'body',
          'hashtagsString',
        ],
        store: [
          'slug',
          'title',
          'companyName',
          'summary',
          'hashtags',
          'companyLogo',
        ],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map((node, i) => ({
            id: i,
            slug: node.fields.slug,
            indexedSlug: node.fields.slug.split('-').join(' '),
            summary: node.frontmatter.summary,
            hashtags: node.frontmatter.hashtags.split(',').slice(0, 3),
            hashtagsString: node.frontmatter.hashtags
              .split(',')
              .slice(0, 3)
              .join(' ')
              .replace(/#/g, ''),
            companyName: node.frontmatter.companyName,
            companyLogo: node.frontmatter.logoUrl,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
          })),
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap.xml',
        exclude: [
          '/newsletter/unsubscribe/error/',
          '/newsletter/unsubscribe/success/',
          '/newsletter/subscribe/already-confirmed/',
          '/newsletter/subscribe/error/',
          '/newsletter/subscribe/success/',
          '/archived-jobs/',
          '/404/',
          '/404.html',
          '/search/',
        ],
        query: `
          {
            allSitePage {
              nodes {
                path
                context {
                  slug
                  archived
                  timestamp
                }
              }
            }
            site {
              siteMetadata {
                siteUrl
              }
            }
          }
        `,
        resolveSiteUrl: ({ site }) => {
          return site.siteMetadata.siteUrl;
        },
        serialize: ({ site, allSitePage }) =>
          allSitePage.nodes.map((node) => {
            if (node.path.includes('/jobs/') && !node.context.archived) {
              return {
                url: `${site.siteMetadata.siteUrl}${node.path}`,
                changefreq: 'weekly',
                priority: 0.7,
                lastmod: new Date(node.context.timestamp),
              };
            } else if (node.path.includes('/jobs/') && node.context.archived) {
              return {
                url: `${site.siteMetadata.siteUrl}${node.path}`,
                changefreq: 'never',
                priority: 0.0,
                lastmod: new Date(node.context.timestamp),
              };
            }

            if (node.path.includes('/post-a-job/')) {
              return {
                url: `${site.siteMetadata.siteUrl}${node.path}`,
                changefreq: 'monthly',
                priority: 0.4,
                lastmod: new Date(),
              };
            }

            return {
              url: `${site.siteMetadata.siteUrl}${node.path}`,
              changefreq: 'daily',
              priority: 1,
              lastmod: new Date(),
            };
          }),
      },
    },
  ],
};
