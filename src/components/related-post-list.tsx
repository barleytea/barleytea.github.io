import { ComponentType } from 'react'
import { RelatedPostListItem } from './related-post-list-item'

interface RelatedPostListProps {
  posts: Queries.detailPageQuery['tags']['nodes']
}

export const RelatedPostList: ComponentType<RelatedPostListProps> = ({
  posts,
}) => {
  return (
    <ul className='p-0 border-solid border-[color:var(--text-color)] rounded'>
      {posts.map((p) => (
        <RelatedPostListItem key={p.frontmatter?.path} post={p} />
      ))}
    </ul>
  )
}
