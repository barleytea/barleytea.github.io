import { Link } from 'gatsby'
import { ComponentType } from 'react'

export const Card: ComponentType<{
  node: Queries.paginationQuery['allMarkdownRemark']['nodes'][number]
}> = ({ node }) => {
  if (
    !node.frontmatter ||
    !node.frontmatter.title ||
    !node.frontmatter.path ||
    !node.frontmatter.created
  ) {
    throw new Error(`Invalid node`)
  }

  return (
    <Link
      to={`${node.frontmatter.path}`}
      className="text-[color:var(--text-color)]"
    >
      <div className="flex flex-col justify-between">
        <div className="break-all p-2">
          <div className="font-semibold">{node.frontmatter.title}</div>
          <div className="text-sm font-light italic">
            {node.frontmatter.created}
          </div>
        </div>
      </div>
    </Link>
  )
}
