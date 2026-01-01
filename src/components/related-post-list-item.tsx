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

  const altText = `${post.frontmatter.title} thumbnail`

  return (
    <li className="border-b border-gray-700 last:border-b-0">
      <Link
        to={post.frontmatter.path}
        className="group flex items-center gap-3 p-2 transition-all duration-300 hover:bg-gray-800/50"
      >
        <div className="shrink-0 overflow-hidden rounded-lg">
          <GatsbyImage
            image={image}
            alt={altText}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <span className="line-clamp-2 text-sm text-[color:var(--text-color)] transition-colors duration-300 group-hover:text-[color:var(--primary-color)]">
          {post.frontmatter.title}
        </span>
      </Link>
    </li>
  )
}
