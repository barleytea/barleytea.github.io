import { GatsbyNode } from 'gatsby';
import path from 'path';

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions;
  await pagination(createPage, graphql);
  await detailPage(createPage, graphql);
};

type NextEdge =
  Queries.nextAndPreviousQuery['allMarkdownRemark']['edges'][number]['next'];
type PrevEdge =
  Queries.nextAndPreviousQuery['allMarkdownRemark']['edges'][number]['previous'];

export interface DetailPageContext {
  next: NextEdge;
  prev: PrevEdge;
  id: string;
}

const detailPage = async (
  createPage: Parameters<
    NonNullable<GatsbyNode['createPages']>
  >['0']['actions']['createPage'],
  graphql: Parameters<NonNullable<GatsbyNode['createPages']>>['0']['graphql']
) => {
  const nextAndPreviousResult = await graphql<Queries.nextAndPreviousQuery>(`
    query nextAndPrevious {
      allMarkdownRemark(sort: { frontmatter: { created: DESC } }) {
        edges {
          next {
            frontmatter {
              created,
              title,
              path,
              eyecatcher {
                childImageSharp {
                  gatsbyImageData(width: 120, height: 90)
                }
              },
            }
          },
          previous {
            frontmatter {
              created,
              title,
              path,
              eyecatcher {
                childImageSharp {
                  gatsbyImageData(width: 120, height: 90)
                }
              },
            }
          },
          node {
            frontmatter {
              created,
              title,
              path,
              eyecatcher {
                childImageSharp {
                  gatsbyImageData(width: 120, height: 90)
                }
              },
            },
            id
          }
        }
      }
    }
  `);

  if (!nextAndPreviousResult.data) {
    throw new Error("Failed to get the node and next/previous nodes")
  }

  nextAndPreviousResult.data.allMarkdownRemark.edges.forEach((edge) => {
    const context: DetailPageContext = {
      id: edge.node.id,
      next: edge.next,
      prev: edge.previous,
    };

    if (!edge.node.frontmatter) {
      throw new Error("Failed to get post details.")
    }

    createPage({
      path: `${edge.node.frontmatter.path}`,
      component: path.resolve("./src/templates/detail.tsx"),
      context,
    });
  });
}

const pagination = async (
  createPage: Parameters<NonNullable<GatsbyNode['createPages']>>['0']['actions']['createPage'],
  graphql: Parameters<NonNullable<GatsbyNode['createPages']>>['0']['graphql']
) => {
  const paginationResult = await graphql<Queries.paginationQuery>(`
    query pagination {
      allMarkdownRemark(
        sort: { frontmatter: { created: DESC } }
        limit: 1000
      ) {
        nodes {
          frontmatter {
            title
            path
            created
            eyecatcher {
              childImageSharp {
                gatsbyImageData(width: 120, height: 90)
              }
            }
          }
          id
        }
      }
    }
  `)

  if (!paginationResult.data) {
    throw new Error("Failed to get posts")
  }

  const posts = paginationResult.data.allMarkdownRemark.nodes;

  const postsPerPage = 50
  const totalPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: totalPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/posts/${i + 1}`,
      component: path.resolve("./src/templates/root.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        totalPages: totalPages,
        currentPage: i + 1,
      },
    });
  });
}