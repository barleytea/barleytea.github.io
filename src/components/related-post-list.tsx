import { ComponentType } from 'react'
import { RelatedPostListItem } from './related-post-list-item'

interface RelatedPostListProps {
  posts: Queries.DetailPageQuery['tags']['nodes']
}

export const RelatedPostList: ComponentType<RelatedPostListProps> = ({
  posts,
}) => {
  return (
    <ul className="rounded border-solid border-[color:var(--text-color)] p-0">
      {posts.map((p) => (
        <RelatedPostListItem key={p.frontmatter?.path} post={p} />
      ))}
    </ul>
  )
}
