import { ComponentType } from 'react'
import { RelatedPostList } from './related-post-list'

interface Props {
  tags: Queries.DetailPageQuery['tags']['nodes']
}

export const SideColumn: ComponentType<Props> = ({ tags }) => {
  return (
    <div>
      <section className="mb-12">
        <h2 className="mb-4 text-xl text-[color:var(--text-color)]">
          Related Posts
        </h2>
        <RelatedPostList posts={tags} />
      </section>
    </div>
  )
}
