import path from 'path'
import { CreatePagesArgs, CreateSchemaCustomizationArgs } from 'gatsby'

export interface TagListContext {
  tag: string
}

export interface DetailPageContext {
  next: {
    frontmatter?: {
      path?: string
      title?: string
    }
  } | null
  prev: {
    frontmatter?: {
      path?: string
      title?: string
    }
  } | null
  id: string
  tags: string[]
}

interface MarkdownNode {
  id: string
  frontmatter?: {
    path?: string
    tags?: string[]
    category?: string
  }
}

interface MarkdownEdge {
  next: {
    frontmatter?: {
      path?: string
      title?: string
    }
  }
  previous: {
    frontmatter?: {
      path?: string
      title?: string
    }
  }
}

interface MarkdownRemark {
  nodes: MarkdownNode[]
  edges: MarkdownEdge[]
}

interface QueryResult {
  data?: {
    allMarkdownRemark: MarkdownRemark
  }
}

export const createSchemaCustomization = ({ actions }: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions

  createTypes(`
    type MarkdownRemarkFrontmatter {
      title: String
      created: String
      path: String
      tags: [String]
      category: String
      eyecatcher: File @fileByRelativePath
      draft: Boolean
    }

    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
  `)
}

export const createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions

  // Get all markdown posts
  const result: QueryResult = await graphql(`
    query CreatePages {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { frontmatter: { created: DESC } }
      ) {
        nodes {
          id
          frontmatter {
            path
            tags
            category
          }
        }
        edges {
          next {
            frontmatter {
              path
              title
            }
          }
          previous {
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `)

  if (!result.data) {
    throw new Error('Failed to get posts')
  }

  const posts = result.data.allMarkdownRemark.nodes
  const postsPerPage = 12
  const numPages = Math.ceil(posts.length / postsPerPage)

  // Get all categories and tags
  const categories = Array.from(
    new Set(
      posts
        .map((post: MarkdownNode) => post.frontmatter?.category)
        .filter((category: string | undefined): category is string => category !== undefined)
    )
  ).sort()

  const tags = Array.from(
    new Set(
      posts.flatMap((post: MarkdownNode) =>
        post.frontmatter?.tags?.filter((tag: string | null): tag is string => tag !== undefined) ?? []
      )
    )
  ) as string[]

  const rootTemplate = path.resolve('src/templates/root.tsx')
  const detailTemplate = path.resolve('src/templates/detail.tsx')
  const tagTemplate = path.resolve('src/templates/posts-by-tag.tsx')
  const categoryTemplate = path.resolve('src/templates/posts-by-category.tsx')

  // Create blog post list pages
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/posts/${i + 1}`,
      component: rootTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        totalPages: numPages,
        currentPage: i + 1,
        categories,
        tags,
      },
    })
  })

  // Create blog post detail pages
  result.data.allMarkdownRemark.edges.forEach((edge: MarkdownEdge, index: number) => {
    const id = posts[index].id
    const path = posts[index].frontmatter?.path
    const currentTags = posts[index].frontmatter?.tags || []

    if (!path) {
      throw new Error('Invalid path')
    }

    createPage({
      path: path,
      component: detailTemplate,
      context: {
        id: id,
        next: edge.next,
        prev: edge.previous,
        categories,
        tags: currentTags,
      },
    })
  })

  // Create tag pages
  tags.forEach((tag: string) => {
    createPage({
      path: `/tag-list/${tag}`,
      component: tagTemplate,
      context: {
        tag: tag,
      },
    })
  })

  // Create category pages
  categories.forEach((category) => {
    const categoryPosts = posts.filter(
      (post) => post.frontmatter?.category === category
    )
    const categoryNumPages = Math.ceil(categoryPosts.length / postsPerPage)

    Array.from({ length: categoryNumPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/category/${category.toLowerCase()}` : `/category/${category.toLowerCase()}/${i + 1}`,
        component: rootTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          totalPages: categoryNumPages,
          currentPage: i + 1,
          categories,
          category,
        },
      })
    })
  })
}
