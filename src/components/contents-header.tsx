import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { ComponentType } from 'react'

export const ContentsHeader: ComponentType<{
  markdownMeta: NonNullable<
    Queries.detailPageQuery['markdownRemark']
  >['frontmatter']
}> = ({ markdownMeta }) => {
  if (
    !markdownMeta ||
    !markdownMeta.title ||
    !markdownMeta.created ||
    !markdownMeta.eyecatcher
  ) {
    throw new Error('Invalid node')
  }

  const image = getImage(markdownMeta.eyecatcher.childImageSharp)
  if (!image) {
    throw new Error('No image')
  }

  return (
    <div className="markdown">
      <h1>{markdownMeta.title}</h1>
      <p className="text-sm">{markdownMeta.created}</p>
      <GatsbyImage image={image} alt="thumbnail" />
    </div>
  )
}
