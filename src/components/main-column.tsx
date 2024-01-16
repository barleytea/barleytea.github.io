import { ComponentType } from 'react'

interface Props {
  detailPage: NonNullable<Queries.DetailPageQuery['markdownRemark']>
}

export const MainColumn: ComponentType<Props> = ({ detailPage }) => {
  return (
    <div className="text-[color:var(--text-color)]">
      <article
        dangerouslySetInnerHTML={{
          __html: detailPage.html || '',
        }}
        className="markdown"
      ></article>
    </div>
  )
}
