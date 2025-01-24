import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Layout } from '../components/layout'
import { CardList } from '../components/card-list'
import { Pagination } from '../components/pagination'
import { CategoryTabs } from '../components/category-tabs'
import SEO from '../components/seo'
import '../components/card-list'

type RootPageData = Queries.PaginationQuery

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
  query Pagination($skip: Int!, $limit: Int!, $category: String) {
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
        ...CardList
      }
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        itemCount
        pageCount
        perPage
        totalCount
      }
    }
  }
`

export const Head = () => {
  return <SEO />
}
