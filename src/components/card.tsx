import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { ComponentType } from 'react'
import { TagList } from './tag-list'

export const Card: ComponentType<{
  node: Queries.PaginationQuery['allMarkdownRemark']['nodes'][number]
}> = ({ node }) => {
  if (
    !node.frontmatter ||
    !node.frontmatter.title ||
    !node.frontmatter.path ||
    !node.frontmatter.created ||
    !node.frontmatter.eyecatcher ||
    !node.frontmatter.tags
  ) {
    throw new Error('Invalid node')
  }

  const image = getImage(node.frontmatter.eyecatcher.childImageSharp)
  if (!image) {
    throw new Error('No image')
  }

  return (
    <Link
      to={`${node.frontmatter.path}`}
      className="text-[color:var(--text-color)]"
    >
      <GatsbyImage image={image} alt="thumbnail" />
      <div className="flex flex-col justify-between">
        <div className="break-all p-2">
          <div className="font-semibold">{node.frontmatter.title}</div>
          <div className="text-sm font-light italic">
            {node.frontmatter.created}
          </div>
        </div>
        <div className="mt-auto">
          <TagList tags={node.frontmatter.tags} />
        </div>
      </div>
    </Link>
  )
}
