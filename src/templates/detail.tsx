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
        <div className="grid md:grid-cols-[70%_30%] gap-x-6">
          <MainColumn detailPage={data.markdownRemark} />
          <aside className='invisible md:visible'>
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

export const Head = ({ data }: HeadProps<Queries.detailPageQuery>) => {
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