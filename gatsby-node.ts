import { GatsbyNode } from 'gatsby'
import path from 'path'

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const { createPage } = actions
  await pagination(createPage, graphql)
  await detailPage(createPage, graphql)
  await tagListPage(createPage, graphql)
}

type NextEdge =
  Queries.NextAndPreviousQuery['allMarkdownRemark']['edges'][number]['next']
type PrevEdge =
  Queries.NextAndPreviousQuery['allMarkdownRemark']['edges'][number]['previous']

export interface DetailPageContext {
  next: NextEdge
  prev: PrevEdge
  id: string
  tags: string[]
}

const detailPage = async (
  createPage: Parameters<
    NonNullable<GatsbyNode['createPages']>
  >['0']['actions']['createPage'],
  graphql: Parameters<NonNullable<GatsbyNode['createPages']>>['0']['graphql']
) => {
  const nextAndPreviousResult = await graphql<Queries.NextAndPreviousQuery>(`
    query NextAndPrevious {
      allMarkdownRemark(sort: { frontmatter: { created: DESC } }) {
        edges {
          next {
            frontmatter {
              created
              title
              path
              tags
              eyecatcher {
                childImageSharp {
                  gatsbyImageData(width: 120, height: 90)
                }
              }
            }
          }
          previous {
            frontmatter {
              created
              title
              path
              tags
              eyecatcher {
                childImageSharp {
                  gatsbyImageData(width: 120, height: 90)
                }
              }
            }
          }
          node {
            frontmatter {
              created
              title
              path
              tags
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
    }
  `)

  if (!nextAndPreviousResult.data) {
    throw new Error('Failed to get the node and next/previous nodes')
  }

  nextAndPreviousResult.data.allMarkdownRemark.edges.forEach((edge) => {
    if (!edge.node.frontmatter || !edge.node.frontmatter.tags) {
      throw new Error('Failed to get post details.')
    }

    const context: DetailPageContext = {
      id: edge.node.id,
      next: edge.next,
      prev: edge.previous,
      tags: edge.node.frontmatter.tags.filter((t) => Boolean(t)) as string[],
    }

    createPage({
      path: `${edge.node.frontmatter.path}`,
      component: path.resolve('./src/templates/detail.tsx'),
      context,
    })
  })
}

const pagination = async (
  createPage: Parameters<
    NonNullable<GatsbyNode['createPages']>
  >['0']['actions']['createPage'],
  graphql: Parameters<NonNullable<GatsbyNode['createPages']>>['0']['graphql']
) => {
  const paginationResult = await graphql<Queries.PaginationQuery>(`
    query Pagination {
      allMarkdownRemark(sort: { frontmatter: { created: DESC } }, limit: 1000) {
        nodes {
          frontmatter {
            title
            path
            created
            tags
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
    throw new Error('Failed to get posts')
  }

  const posts = paginationResult.data.allMarkdownRemark.nodes

  const postsPerPage = 50
  const totalPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: totalPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/posts/${i + 1}`,
      component: path.resolve('./src/templates/root.tsx'),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        totalPages: totalPages,
        currentPage: i + 1,
      },
    })
  })
}

export interface TagListContext {
  tag: string
}

const tagListPage = async (
  createPage: Parameters<
    NonNullable<GatsbyNode['createPages']>
  >['0']['actions']['createPage'],
  graphql: Parameters<NonNullable<GatsbyNode['createPages']>>['0']['graphql']
) => {
  const tagList = await graphql<Queries.TagListQuery>(`
    query TagList {
      tags: allMarkdownRemark {
        group(field: { frontmatter: { tags: SELECT } }) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `)

  if (!tagList.data || tagList.errors) {
    throw new Error('Faild to get tags.')
  }

  tagList.data.tags.group.forEach((tag) => {
    if (tag.tag === null) {
      throw new Error('Tag not found')
    }
    const context: TagListContext = {
      tag: tag.tag,
    }
    createPage({
      path: `/tag-list/${tag.tag}`,
      component: path.resolve('./src/templates/posts-by-tag.tsx'),
      context,
    })
  })
}
