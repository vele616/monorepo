const { createFilePath } = require("gatsby-source-filesystem");
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
const path = require("path");
const fs = require("fs");

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
        react: path.resolve(path.join(__dirname, "node_modules", "react")),
      },
      modules: [path.resolve(__dirname, "src"), "node_modules"],
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

  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: "slug",
      node,
      value,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostsResult = await graphql(
    `
      {
        allMarkdownRemark(filter: { frontmatter: { blog: { eq: true } } }) {
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
    `
  );
  const blogPosts = blogPostsResult.data.allMarkdownRemark.edges;
  const blogPostTemplate = path.resolve("./src/templates/BlogPost.js");
  const blogPostSocialTemplate = path.resolve(
    "./src/templates/BlogPostSocial.js"
  );

  blogPosts.forEach((post) => {
    createPage({
      path: post.node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
      },
    });
  });

  if (process.env.IS_SOCIAL === "true") {
    blogPosts.forEach((post) => {
      createPage({
        path: `${post.node.fields.slug}social`,
        component: blogPostSocialTemplate,
        context: {
          slug: post.node.fields.slug,
        },
      });
    });
  }
};
