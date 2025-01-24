import { ComponentType } from 'react'
import { NextAndPreviousItem } from './next-previous-item'

interface PostFrontmatter {
  path: string | null
  title: string | null
  created: string | null
}

interface Post {
  frontmatter: PostFrontmatter | null
}

interface NextAndPreviousEdges {
  next: Post | null
  prev: Post | null
}

export const NextAndPrevious: ComponentType<NextAndPreviousEdges> = ({
  next,
  prev,
}) => {
  return (
    <div className="flex justify-between max-[480px]:flex-col">
      {prev ? (
        <NextAndPreviousItem post={prev} direction="left" />
      ) : (
        <div></div>
      )}
      {next ? (
        <NextAndPreviousItem post={next} direction="right" />
      ) : (
        <div></div>
      )}
    </div>
  )
}
