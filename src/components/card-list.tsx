import { ComponentType } from 'react'
import { Card } from './card'

export const CardList: ComponentType<{
  nodes: Queries.paginationQuery['allMarkdownRemark']['nodes']
}> = ({ nodes }) => {
  return (
    <ul className="grid list-none grid-cols-5 gap-1 pl-0">
      {nodes.map((node) => (
        <li key={node.id} className="rounded border border-gray-500">
          <Card node={node} />
        </li>
      ))}
    </ul>
  )
}
