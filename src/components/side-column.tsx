import { ComponentType } from 'react'
import { RelatedPostList } from './related-post-list'

interface Props {
  tags: Queries.DetailPageQuery['tags']['nodes']
  tableOfContents?: string
}

export const SideColumn: ComponentType<Props> = ({ tags, tableOfContents }) => {
  return (
    <div className="sticky top-24">
      {/* 目次 */}
      {tableOfContents && (
        <section className="zenn-toc mb-8">
          <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">
            目次
          </h3>
          <nav 
            className="toc-nav text-sm"
            dangerouslySetInnerHTML={{ __html: tableOfContents }}
          />
        </section>
      )}
      
      {/* 関連記事 */}
      {tags.length > 0 && (
        <section className="mb-8">
          <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">
            関連記事
          </h3>
          <RelatedPostList posts={tags} />
        </section>
      )}
    </div>
  )
}
