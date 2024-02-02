import { ComponentType } from 'react'
import { NextAndPreviousItem } from './next-previous-item'

interface NextAndPreviousEdges {
  next: Queries.NextAndPreviousQuery['allMarkdownRemark']['edges'][number]['next']
  prev: Queries.NextAndPreviousQuery['allMarkdownRemark']['edges'][number]['previous']
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
