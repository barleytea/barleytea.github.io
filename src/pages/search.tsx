import { PageProps, graphql } from 'gatsby'
import { Layout } from '../components/layout'
import { Search } from '../components/search'

interface SearchPageData {
  allMarkdownRemark: {
    nodes: Array<{
      frontmatter: {
        title: string | null
        path: string | null
        tags: readonly (string | null)[] | null
      } | null
    }>
  }
}

const SearchPage = ({ data }: PageProps<SearchPageData>) => {
  const posts = data.allMarkdownRemark.nodes
    .filter((node) => node.frontmatter?.title && node.frontmatter?.path)
    .map((node) => ({
      title: node.frontmatter!.title!,
      path: node.frontmatter!.path!,
      tags: (node.frontmatter!.tags || []).filter((t): t is string => t !== null),
    }))

  return (
    <Layout>
      <div className="py-8">
        <h1 className="mb-8 text-2xl font-bold text-[color:var(--text-color)]">
          Search Posts
        </h1>
        <Search posts={posts} />
      </div>
    </Layout>
  )
}

export default SearchPage

export const query = graphql`
  query SearchPosts {
    allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { frontmatter: { created: DESC } }
    ) {
      nodes {
        frontmatter {
          title
          path
          tags
        }
      }
    }
  }
`
