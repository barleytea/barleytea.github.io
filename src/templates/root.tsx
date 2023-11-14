import { graphql, type PageProps } from 'gatsby'
import { Layout } from '../components/layout'
import { CardList } from '../components/card-list'
import { Pagination } from '../components/pagination'
import SEO from '../components/seo'

const PostList = ({
  data,
  pageContext,
}: PageProps<
  Queries.PostsPaginationQuery,
  Queries.PostsPaginationQueryVariables & {
    totalPages: number
    currentPage: number
  }
>) => {
  return (
    <Layout>
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

export default PostList

export const postsPagination = graphql`
  query PostsPagination($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { frontmatter: { created: DESC } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        frontmatter {
          path
          title
          created
          tags
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
