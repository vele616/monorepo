const { createFilePath } = require('gatsby-source-filesystem');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const path = require('path');

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
        'react': path.resolve(path.join(__dirname, 'node_modules', 'react'))
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
          }
        }
      }
    }
  `);
  const jobPosts = jobPostsResult.data.allMarkdownRemark.edges;
  const jobPostTemplate = path.resolve('./src/templates/JobPost.js');
  jobPosts.forEach(post => {
    createPage({
      path: post.node.fields.slug,
      component: jobPostTemplate,
      context: {
        slug: post.node.fields.slug,
      }
    })
  });
};