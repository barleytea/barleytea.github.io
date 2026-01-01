import { Link } from 'gatsby'
import { ComponentType } from 'react'

interface Props {
  post:
    | NonNullable<
        Queries.NextAndPreviousQuery['allMarkdownRemark']['edges'][number]['next']
      >
    | NonNullable<
        Queries.NextAndPreviousQuery['allMarkdownRemark']['edges'][number]['previous']
      >
  direction: 'right' | 'left'
}

export const NextAndPreviousItem: ComponentType<Props> = ({
  post,
  direction,
}) => {
  if (!post.frontmatter?.path || !post.frontmatter?.title) {
    throw new Error('Invalid post data')
  }

  const isNext = direction === 'right'
  const label = isNext ? 'Next Post' : 'Previous Post'
  const arrow = isNext ? '→' : '←'

  return (
    <Link
      to={post.frontmatter.path}
      className="group flex w-full max-w-xs flex-col rounded-xl border border-gray-700 bg-gray-800/30 p-4 transition-all duration-300 hover:border-[color:var(--primary-color)] hover:bg-gray-800/50 hover:shadow-lg sm:w-64"
    >
      <span className="mb-2 text-sm text-gray-400 transition-colors duration-300 group-hover:text-[color:var(--primary-color)]">
        {label}
      </span>
      <div className={`flex items-center gap-2 ${isNext ? 'flex-row-reverse text-right' : ''}`}>
        <span className="text-2xl text-[color:var(--text-color)] transition-transform duration-300 group-hover:text-[color:var(--primary-color)] ${isNext ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}">
          {arrow}
        </span>
        <span className="line-clamp-2 flex-1 text-[color:var(--text-color)] transition-colors duration-300 group-hover:text-[color:var(--primary-color)]">
          {post.frontmatter.title}
        </span>
      </div>
    </Link>
  )
}
