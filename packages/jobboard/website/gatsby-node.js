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
  const { createPage, createRedirect } = actions;
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

  createRedirect({
    fromPath:'/other-it-jobs/', 
    toPath:'/search/?page=1&jobType=other', 
    redirectInBrowser: true, 
    isPermanent: true
  });

  createRedirect({ 
    fromPath:'/software-developer-jobs/', 
    toPath:'/search/?page=1&jobType=software', 
    redirectInBrowser: true, 
    isPermanent: true
  });
};

exports.sourceNodes = (data) => {
  return;
};