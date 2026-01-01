import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { ComponentType } from 'react'

interface ContentsHeaderProps {
  markdownMeta: NonNullable<
    Queries.DetailPageQuery['markdownRemark']
  >['frontmatter']
  wordCount?: number
}

const WORDS_PER_MINUTE = 200

export const ContentsHeader: ComponentType<ContentsHeaderProps> = ({ 
  markdownMeta,
  wordCount 
}) => {
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

  const altText = `${markdownMeta.title} thumbnail`
  const readingTime = wordCount ? Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE)) : null

  return (
    <div className="flex flex-col items-center text-center py-8 md:py-12">
      {/* アイコン画像 */}
      <div className="w-20 h-20 md:w-24 md:h-24 mb-6 rounded-2xl overflow-hidden shadow-lg">
        <GatsbyImage 
          image={image} 
          alt={altText}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* タイトル */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white break-all mb-4 px-4 max-w-3xl">
        {markdownMeta.title}
      </h1>
      
      {/* 日付と読了時間 */}
      <div className="flex items-center justify-center gap-3 text-sm text-gray-400">
        <time dateTime={markdownMeta.created}>{markdownMeta.created}</time>
        {readingTime && (
          <>
            <span>·</span>
            <span>{readingTime} min read</span>
          </>
        )}
      </div>
    </div>
  )
}
