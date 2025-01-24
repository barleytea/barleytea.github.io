import { HeadProps, PageProps, graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { DetailPageContext } from '../../gatsby-node'
import { Layout } from '../components/layout'
import { MainColumn } from '../components/main-column'
import { ContentsHeader } from '../components/contents-header'
import { NextAndPrevious } from '../components/next-previous'
import { SideColumn } from '../components/side-column'
import SEO from '../components/seo'
import { getSrc } from 'gatsby-plugin-image'

interface DetailPageContextWithCategories extends DetailPageContext {
  categories: string[]
}

interface DetailPageFrontmatter {
  path: string | null
  title: string | null
  created: string | null
  tags: readonly (string | null)[] | null
  category: string | null
  eyecatcher: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    } | null
  } | null
}

interface DetailPageData {
  markdownRemark: {
    id: string
    html: string
    frontmatter: DetailPageFrontmatter
  } | null
  tags: {
    nodes: {
      frontmatter: {
        path: string | null
        title: string | null
        tags: readonly (string | null)[] | null
        eyecatcher: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          } | null
        } | null
      } | null
    }[]
  }
}

const RootBlogList = ({
  data,
  pageContext,
}: PageProps<DetailPageData, DetailPageContextWithCategories>) => {
  console.log('Current page data:', data.markdownRemark)
  console.log('Related posts:', data.tags.nodes)

  if (!data.markdownRemark) {
    throw new Error('MarkdownRemark shouled be provided')
  }

  const currentTags = data.markdownRemark.frontmatter.tags || []
  console.log('Current tags:', currentTags)
  
  const postsRelatedToTag = data.tags.nodes.filter(node => {
    if (!node.frontmatter?.tags) return false
    const hasMatchingTag = node.frontmatter.tags.some(tag => tag && currentTags.includes(tag))
    console.log('Checking post:', node.frontmatter.title, 'tags:', node.frontmatter.tags, 'matches:', hasMatchingTag)
    return hasMatchingTag
  })
  
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
  query DetailPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        path
        title
        created
        tags
        category
        eyecatcher {
          childImageSharp {
            gatsbyImageData(width: 300, height: 300, placeholder: BLURRED)
          }
        }
      }
    }
    tags: allMarkdownRemark(
      filter: { 
        id: { ne: $id }
        frontmatter: { 
          draft: { ne: true }
        }
      }
      limit: 10
      sort: { frontmatter: { created: DESC } }
    ) {
      nodes {
        frontmatter {
          path
          title
          tags
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

export const Head = ({ data }: HeadProps<DetailPageData>) => {
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
