import { ComponentType } from 'react'
import { Card } from './card'

export const CardList: ComponentType<{
  nodes: Queries.PaginationQuery['allMarkdownRemark']['nodes']
}> = ({ nodes }) => {
  return (
    <ul className="xs:grid-cols-2 grid list-none gap-1 pl-0 sm:grid-cols-2 md:grid-cols-3">
      {nodes.map((node) => (
        <li key={node.id} className="rounded border border-gray-500">
          <Card node={node} />
        </li>
      ))}
    </ul>
  )
}
