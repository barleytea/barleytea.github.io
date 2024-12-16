import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { ComponentType } from 'react'
import { TagList } from './tag-list'

export const ContentsHeader: ComponentType<{
  markdownMeta: NonNullable<
    Queries.DetailPageQuery['markdownRemark']
  >['frontmatter']
}> = ({ markdownMeta }) => {
  if (
    !markdownMeta ||
    !markdownMeta.title ||
    !markdownMeta.created ||
    !markdownMeta.eyecatcher ||
    !markdownMeta.tags
  ) {
    throw new Error('Invalid node')
  }

  const image = getImage(markdownMeta.eyecatcher.childImageSharp)
  if (!image) {
    throw new Error('No image')
  }

  return (
    <div className="markdown">
      <h1 className="break-all">{markdownMeta.title}</h1>
      <div className="my-2">
        <TagList tags={markdownMeta.tags} />
      </div>
      <p className="text-sm">
        {markdownMeta.created}
      </p>
      <div className="mb-3">
        <GatsbyImage image={image} alt="thumbnail" />
      </div>
    </div>
  )
}
