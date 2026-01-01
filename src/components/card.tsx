import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { ComponentType } from 'react'
import { TagList } from './tag-list'

const WORDS_PER_MINUTE = 200

interface CardNode {
  id: string
  wordCount?: {
    words: number | null
  } | null
  frontmatter: {
    title: string | null
    created: string | null
    path: string | null
    tags: readonly (string | null)[] | null
    category: string | null
    eyecatcher: {
      childImageSharp: {
        gatsbyImageData: import('gatsby-plugin-image').IGatsbyImageData
      } | null
    } | null
  } | null
}

export const Card: ComponentType<{
  node: CardNode
}> = ({ node }) => {
  if (
    !node.frontmatter ||
    !node.frontmatter.title ||
    !node.frontmatter.path ||
    !node.frontmatter.created ||
    !node.frontmatter.eyecatcher ||
    !node.frontmatter.tags
  ) {
    throw new Error('Invalid node')
  }

  const image = getImage(node.frontmatter.eyecatcher.childImageSharp)
  if (!image) {
    throw new Error('No image')
  }

  const altText = `${node.frontmatter.title} thumbnail`
  
  // Calculate reading time
  const wordCount = node.wordCount?.words || 0
  const readingTime = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))

  return (
    <Link
      to={`${node.frontmatter.path}`}
      className="card text-[color:var(--text-color)]"
    >
      <div className="card-image">
        <GatsbyImage image={image} alt={altText} />
      </div>
      <div className="flex flex-col justify-between">
        <div className="break-all p-2">
          <div className="font-semibold">{node.frontmatter.title}</div>
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
            <span>{node.frontmatter.created}</span>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>
          <div className="mt-2">
            <TagList tags={node.frontmatter.tags} />
          </div>
        </div>
      </div>
    </Link>
  )
}
