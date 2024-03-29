import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { ComponentType } from 'react'

interface RelatedPostListItemProps {
  post: Queries.DetailPageQuery['tags']['nodes'][number]
}

export const RelatedPostListItem: ComponentType<RelatedPostListItemProps> = ({
  post,
}) => {
  if (
    !post.frontmatter?.path ||
    !post.frontmatter?.title ||
    !post.frontmatter?.eyecatcher
  ) {
    throw new Error('Invalid node')
  }

  const image = getImage(post.frontmatter.eyecatcher.childImageSharp)
  if (!image) {
    throw new Error('No image')
  }

  return (
    <li
      key={post.frontmatter.path}
      className="border-b-2 border-solid border-[color:var(--text-color)]"
    >
      <Link to={post.frontmatter.path}>
        <div className="flex h-full text-[color:var(--text-color)] hover:bg-[color:var(--text-color)] hover:text-[color:var(--base-color)]">
          <GatsbyImage image={image} alt="thumbnail" className="shrink-0" />
          <div className="w-full px-2 py-1">
            <span className="break-all">{post.frontmatter.title}</span>
          </div>
        </div>
      </Link>
    </li>
  )
}
