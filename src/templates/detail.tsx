import { PageProps, graphql } from 'gatsby'
import { DetailPageContext } from '../../gatsby-node'
import { Layout } from '../components/layout'
import { MainColumn } from '../components/main-clumn'
import { ContentsHeader } from '../components/contents-header'
import { NextAndPrevious } from '../components/next-previous'

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
        <ContentsHeader
          markdownMeta={data.markdownRemark.frontmatter}
        ></ContentsHeader>
        <div className="grid gap-x-6">
          <MainColumn detailPage={data.markdownRemark} />
          <section className="mt-4">
            <NextAndPrevious next={pageContext.next} prev={pageContext.prev} />
          </section>
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
        eyecatcher {
          childImageSharp {
            gatsbyImageData(width: 300, height: 300, placeholder: BLURRED)
          }
        }
      }
    }
  }
`
