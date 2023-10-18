import { ComponentType } from 'react'
import { NextAndPreviousItem } from './next-previous-item'

interface NextAndPreviousEdges {
  next: Queries.nextAndPreviousQuery['allMarkdownRemark']['edges'][number]['next']
  prev: Queries.nextAndPreviousQuery['allMarkdownRemark']['edges'][number]['previous']
}

export const NextAndPrevious: ComponentType<NextAndPreviousEdges> = ({
  next,
  prev,
}) => {
  return (
    <div className="flex justify-between">
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
