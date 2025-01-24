import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Layout } from '../components/layout'
import { CardList } from '../components/card-list'
import { Pagination } from '../components/pagination'
import { CategoryTabs } from '../components/category-tabs'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import SEO from '../components/seo'

interface RootPageData {
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
  limit: number
  skip: number
  totalPages: number
  currentPage: number
  categories: string[]
  category?: string
}

const RootPage: React.FC<PageProps<RootPageData, PageContext>> = ({ data, pageContext }) => {
  const { categories, category } = pageContext

  return (
    <Layout>
      <CategoryTabs 
        categories={categories} 
        currentCategory={category || ''} 
      />
      <CardList nodes={data.allMarkdownRemark.nodes} />
      <div className="my-12 flex justify-center">
        <Pagination
          totalPages={pageContext.totalPages}
          currentPage={pageContext.currentPage}
        />
      </div>
    </Layout>
  )
}

export default RootPage

export const query = graphql`
  query RootPage($skip: Int!, $limit: Int!, $category: String) {
    allMarkdownRemark(
      sort: { frontmatter: { created: DESC } }
      limit: $limit
      skip: $skip
      filter: { 
        frontmatter: { 
          category: { eq: $category }
          draft: { ne: true }
        } 
      }
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

export const Head = () => {
  return <SEO />
}
