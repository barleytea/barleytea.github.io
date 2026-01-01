import { Link, PageProps, graphql } from 'gatsby'
import { Layout } from '../components/layout'

const TagList = ({ data }: PageProps<Queries.AllTagsQuery>) => {
  // Sort tags by post count in descending order
  const sortedTags = [...data.tags.group].sort((a, b) => b.totalCount - a.totalCount)

  return (
    <Layout>
      <h1 className="my-6 text-2xl font-bold text-[color:var(--text-color)]">
        タグ一覧
      </h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {sortedTags.map((t) => (
          <Link
            key={t.tag}
            to={`/tag-list/${t.tag}`}
            className="group rounded-xl border border-gray-700 bg-gray-800/30 p-4 transition-all duration-300 hover:border-[color:var(--primary-color)] hover:bg-gray-800/50 hover:shadow-lg"
          >
            <div className="flex flex-col items-center text-center">
              <span className="mb-2 text-lg font-semibold text-[color:var(--text-color)] transition-colors duration-300 group-hover:text-[color:var(--primary-color)]">
                #{t.tag}
              </span>
              <span className="rounded-full bg-[color:var(--primary-color)] px-3 py-1 text-sm font-bold text-white">
                {t.totalCount} posts
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default TagList

export const allTags = graphql`
  query AllTags {
    tags: allMarkdownRemark {
      group(field: { frontmatter: { tags: SELECT } }) {
        tag: fieldValue
        totalCount
      }
    }
  }
`
