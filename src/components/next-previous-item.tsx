import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { ComponentType } from 'react'

interface Props {
  post:
    | NonNullable<
        Queries.nextAndPreviousQuery['allMarkdownRemark']['edges'][number]['next']
      >
    | NonNullable<
        Queries.nextAndPreviousQuery['allMarkdownRemark']['edges'][number]['previous']
      >
  direction: 'right' | 'left'
}

export const NextAndPreviousItem: ComponentType<Props> = ({
  post,
  direction,
}) => {
  if (
    !post.frontmatter?.path ||
    !post.frontmatter?.title
  ) {
    throw new Error()
  }

  return (
    <Link to={post.frontmatter.path} className="text-[color:var(--text-color)] hover:bg-[color:var(--primary-color)]">
      <div className="flex">
        {direction === 'left' ? (
            <div className="border border-solid p-3 text-[color:var(--text-color)] w-56 h-24">
              <span className="text-[color:var(--text-color)] line-clamp-3 break-words whitespace-pre-wrap">
                {'<<'} {post.frontmatter.title}
              </span>
            </div>
        ) : (
            <div className="border border-solid p-3 text-[color:var(--text-color)] w-56 h-24">
              <span className="text-[color:var(--text-color)] line-clamp-3 break-words whitespace-pre-wrap">
                {'>>'} {post.frontmatter.title}
              </span>
            </div>
        )}
      </div>
    </Link>
  )
}
