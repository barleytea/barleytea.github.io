import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Layout } from '../components/layout'
import { CardList } from '../components/card-list'
import { CategoryTabs } from '../components/category-tabs'
import { Pagination } from '../components/pagination'
import { IGatsbyImageData } from 'gatsby-plugin-image'

interface PostsByCategory {
  allMarkdownRemark: {
    nodes: Array<{
      id: string
      frontmatter: {
        title: string
        created: string
        path: string
        tags: string[]
        category: string
        eyecatcher: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          }
        }
      }
    }>
  }
}

interface PageContext {
  category: string
  categories: string[]
  totalPages: number
  currentPage: number
}

const PostsByCategory: React.FC<PageProps<PostsByCategory, PageContext>> = ({ data, pageContext }) => {
  const { category, categories, totalPages, currentPage } = pageContext

  return (
    <Layout>
      <CategoryTabs categories={categories} currentCategory={category} />
      <CardList nodes={data.allMarkdownRemark.nodes} />
      <div className="my-12 flex justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </Layout>
  )
}

export default PostsByCategory

export const query = graphql`
  query PostsByCategory($category: String!) {
    allMarkdownRemark(
      sort: { frontmatter: { created: DESC } }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      nodes {
        id
        frontmatter {
          title
          created
          path
          tags
          category
          eyecatcher {
            childImageSharp {
              gatsbyImageData(width: 296, height: 296, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
` 