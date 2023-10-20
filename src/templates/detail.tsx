import { PageProps, graphql } from 'gatsby'
import { DetailPageContext } from '../../gatsby-node'
import { Layout } from '../components/layout'
import { MainColumn } from '../components/main-column'
import { ContentsHeader } from '../components/contents-header'
import { NextAndPrevious } from '../components/next-previous'
import { SideColumn } from '../components/side-column'

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
        <div className="grid grid-cols-[70%_30%] gap-x-6">
          <MainColumn detailPage={data.markdownRemark} />
          <aside>
            <SideColumn tags={data.tags.nodes}></SideColumn>
          </aside>
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
  query detailPage($id: String!, $tags: [String!]) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        path
        title
        created
        tags
        eyecatcher {
          childImageSharp {
            gatsbyImageData(width: 300, height: 300, placeholder: BLURRED)
          }
        }
      }
    }
    tags: allMarkdownRemark(
      filter: { id: { ne: $id }, frontmatter: { tags: { in: $tags } } }
      limit: 10
      sort: { frontmatter: { created: DESC } }
    ) {
      nodes {
        frontmatter {
          path
          title
          eyecatcher {
            childImageSharp {
              gatsbyImageData(width: 120, height: 90)
            }
          }
        }
      }
    }
  }
`
