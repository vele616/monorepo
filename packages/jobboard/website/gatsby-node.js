const { createFilePath } = require('gatsby-source-filesystem');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const path = require('path');
const fs = require('fs');

exports.onCreateWebpackConfig = ({
  stage,
  getConfig,
  rules,
  loaders,
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        react: path.resolve(path.join(__dirname, 'node_modules', 'react')),
      },
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      plugins: [
        new DirectoryNamedWebpackPlugin({
          exclude: /node_modules/,
        }),
      ],
    },
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
    if (
      node.frontmatter.hashtags &&
      typeof node.frontmatter.hashtags === 'string'
    ) {
      const tags = node.frontmatter.hashtags
        .split(',')
        .slice(0, 3)
        .map((tag) => tag.replace(/#/g, '').trim());

      createNodeField({
        name: 'tags',
        node,
        value: tags,
      });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const jobPostsResult = await graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              id
              frontmatter {
                archived
                timestamp
              }
            }
          }
        }
      }
    `
  );
  const jobPosts = jobPostsResult.data.allMarkdownRemark.edges;
  const jobPostTemplate = path.resolve('./src/templates/JobPost.js');
  const jobPostSocialTemplate = path.resolve(
    './src/templates/JobPostSocial.js'
  );

  jobPosts.forEach((post) => {
    createPage({
      path: post.node.fields.slug,
      component: jobPostTemplate,
      context: {
        slug: post.node.fields.slug,
        archived: post.node.frontmatter.archived === 'true',
        timestamp: post.node.frontmatter.timestamp,
      },
    });
  });

  if (process.env.IS_SOCIAL === 'true') {
    jobPosts.forEach((post) => {
      createPage({
        path: `${post.node.fields.slug}social`,
        component: jobPostSocialTemplate,
        context: {
          slug: post.node.fields.slug,
        },
      });
    });
  }
};

exports.sourceNodes = (data) => {
  // console.log(data.getNode('8d0b7c63-ffb9-5328-88dd-584b39bb2929'));

  return;

  const avengers = [
    {
      firstName: 'Tony',
      lastName: 'Stark',
      name: 'Iron Man',
    },
    {
      firstName: 'Bruce',
      lastName: 'Banner',
      name: 'Hulk',
    },
    {
      firstName: 'Thor',
      lastName: 'Odinson',
      name: 'Thor',
    },
    {
      firstName: 'Steve',
      lastName: 'Rogers',
      name: 'Captain America',
    },
    {
      firstName: 'Natasha',
      lastName: 'Romanoff',
      name: 'Black Widow',
    },
    {
      firstName: 'Clint',
      lastName: 'Barton',
      name: 'Hawkeye',
    },
  ];

  return avengers.map((avenger) =>
    createNode({
      ...avenger,
      id: createNodeId(avenger.name),
      internal: {
        type: `Avenger`,
        contentDigest: createContentDigest(avenger),
      },
    })
  );
};

/**
 *   const allHashtagsResults = await graphql(`
  {
    allMarkdownRemark {
      nodes {
        frontmatter {
          hashtags
        }
      }
    }
  }`);


  const hashtags = [
    ...new Set(
      allHashtagsResults.data.allMarkdownRemark.nodes.flatMap((node) =>
        node.frontmatter.hashtags.split(',')
      )
  )];

  fs.writeFileSync('/home/ivan/repos/crocoder/monorepo/packages/jobboard/website/content/test/test.json', 
  JSON.stringify({ hello: 'some sample message' }));


 */
