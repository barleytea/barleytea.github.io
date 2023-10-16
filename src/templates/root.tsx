import { graphql, type PageProps } from 'gatsby'
import { Layout } from '../components/layout'
import { CardList } from '../components/card-list'
import { Pagination } from '../components/pagination'

const PostList = ({
  data,
  pageContext,
}: PageProps<
  Queries.postsPaginationQuery,
  Queries.postsPaginationQueryVariables & {
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
  query postsPagination($skip: Int!, $limit: Int!) {
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
