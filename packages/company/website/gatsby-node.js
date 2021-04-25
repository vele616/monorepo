const { createFilePath } = require("gatsby-source-filesystem");
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
const path = require("path");
const fs = require("fs");
const { findSimilarPosts } = require("./scripts/compare-strings");

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

const createBlogPages = async (graphql, createPage) => {
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
              excerpt(pruneLength: 160)
              frontmatter {
                title
                description
                author
                category
                image {
                  id
                  childImageSharp {
                    fluid(maxHeight: 350, quality: 100) {
                      srcSet
                      srcSetWebp
                      src
                      sizes
                      base64
                      aspectRatio
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  const authorsResult = await graphql(
    `
      {
        authorsJson {
          authors {
            id
            name
            description
            twitter
            linkedin
            email
            image {
              id
              childImageSharp {
                fluid(maxHeight: 100, quality: 90) {
                  srcSet
                  srcSetWebp
                  src
                  sizes
                  base64
                  aspectRatio
                }
              }
            }
          }
        }
      }
    `
  );

  const authors = authorsResult.data.authorsJson.authors;
  const blogPosts = blogPostsResult.data.allMarkdownRemark.edges;
  const blogPostTemplate = path.resolve("./src/templates/BlogPost.js");
  const blogPostSocialTemplate = path.resolve(
    "./src/templates/BlogPostSocial.js"
  );
  console.log(authors);

  blogPosts.forEach((post) => {
    let author;
    //console.log(authors);
    //console.log(post.node.frontmatter.author && authors.find(t => t.id === post.node.frontmatter.author))
    if (
      post.node.frontmatter.author &&
      authors.find((t) => t.id === post.node.frontmatter.author)
    ) {
      author = authors.find((t) => t.id === post.node.frontmatter.author);
    } else if (authors[0]) {
      author = authors[0];
    }

    const blogPostData = {
      title: post.node.frontmatter.title,
      description: post.node.frontmatter.description,
      id: post.node.id,
      excerpt: post.node.excerpt,
    };

    const otherBlogPostData = blogPosts
      .filter((p) => p.node.id !== post.node.id)
      .map((p) => {
        return {
          title: p.node.frontmatter.title,
          description: p.node.frontmatter.description,
          id: p.node.id,
          excerpt: p.node.excerpt,
        };
      });

    const { bestMatches } = findSimilarPosts(blogPostData, otherBlogPostData);

    createPage({
      path: post.node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
        author,
        similiarPosts: blogPosts
          .filter((p) => bestMatches.map((b) => b.id).includes(p.node.id))
          .map((p) => p.node),
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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  await createBlogPages(graphql, createPage);
};
