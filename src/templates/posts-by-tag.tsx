import { HeadProps, PageProps, graphql } from 'gatsby'
import { TagListContext } from '../../gatsby-node'
import { Layout } from '../components/layout'
import { CardList } from '../components/card-list'
import SEO from '../components/seo'

const PostsByTag = ({
  data,
  pageContext,
}: PageProps<Queries.PostsByTagQuery, TagListContext>) => {
  return (
    <Layout>
      <h1 className="my-4 text-xl text-[color:var(--text-color)]">
        {pageContext.tag} の記事一覧
      </h1>
      <CardList nodes={data.allMarkdownRemark.nodes} />
    </Layout>
  )
}

export default PostsByTag

export const postsPaginationQuery = graphql`
  query PostsByTag($tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { frontmatter: { created: DESC } }
    ) {
      nodes {
        frontmatter {
          path
          title
          created
          tags
          category
          eyecatcher {
            childImageSharp {
              gatsbyImageData(width: 300, height: 300)
            }
          }
        }
        id
      }
    }
  }
`

export const Head = ({
  pageContext,
}: HeadProps<Queries.PostsByTagQuery, TagListContext>) => {
  return <SEO title={`${pageContext.tag} の記事一覧`} />
}
