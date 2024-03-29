import { HeadProps, PageProps, graphql } from 'gatsby'
import { DetailPageContext } from '../../gatsby-node'
import { Layout } from '../components/layout'
import { MainColumn } from '../components/main-column'
import { ContentsHeader } from '../components/contents-header'
import { NextAndPrevious } from '../components/next-previous'
import { SideColumn } from '../components/side-column'
import SEO from '../components/seo'
import { getSrc } from 'gatsby-plugin-image'

const RootBlogList = ({
  data,
  pageContext,
}: PageProps<Queries.DetailPageQuery, DetailPageContext>) => {
  console.log(pageContext)

  if (!data.markdownRemark) {
    throw new Error('MarkdownRemark shouled be provided')
  }

  const postsRelatedToTag = data.tags.nodes
  const displaySideMenu = postsRelatedToTag.length > 0
  const sideColumnClassName = displaySideMenu
    ? `invisible min-[480px]:visible`
    : `invisible`

  return (
    <Layout>
      <div>
        <ContentsHeader
          markdownMeta={data.markdownRemark.frontmatter}
        ></ContentsHeader>
        <div className="grid min-[480px]:gap-x-6 min-[480px]:grid-cols-[70%_30%] max-[480px]:grid-cols-[100%]" >
          <MainColumn detailPage={data.markdownRemark} />
          <aside className={sideColumnClassName}>
            <SideColumn tags={postsRelatedToTag}></SideColumn>
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
  query DetailPage($id: String!, $tags: [String!]) {
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

export const Head = ({ data }: HeadProps<Queries.DetailPageQuery>) => {
  if (
    !data.markdownRemark?.frontmatter?.title ||
    !data.markdownRemark?.frontmatter?.created ||
    !data.markdownRemark?.frontmatter?.eyecatcher?.childImageSharp
  ) {
    throw new Error('Insufficient details')
  }

  const eyecatcherPath = getSrc(
    data.markdownRemark.frontmatter.eyecatcher.childImageSharp
  )
  return (
    <SEO
      title={data.markdownRemark.frontmatter.title}
      path={`${data.markdownRemark.frontmatter.path}/`}
      eyecatcherPath={eyecatcherPath}
    />
  )
}
