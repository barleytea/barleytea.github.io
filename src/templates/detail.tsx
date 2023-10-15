import { PageProps, graphql } from 'gatsby'
import { DetailPageContext } from '../../gatsby-node'
import { Layout } from '../components/layout'
import { MainColumn } from '../components/main-clumn'

const RootBlogList = ({
  data,
  pageContext,
}: PageProps<Queries.detailPageQuery, DetailPageContext>) => {
  console.log(pageContext)

  if (!data.markdownRemark) {
    throw new Error('MarkdownRemark shouled be provided')
  }

  return (
    <Layout>
      <div className="grid gap-y-6">
        <div className="grid gap-x-6">
          <MainColumn detailPage={data.markdownRemark} />
        </div>
      </div>
    </Layout>
  )
}

export default RootBlogList

export const details = graphql`
  query detailPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      excerpt(pruneLength: 140, truncate: true)
      id
      html
      frontmatter {
        path
        title
        created
      }
    }
  }
`
