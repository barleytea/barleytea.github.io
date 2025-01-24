import { ComponentType } from 'react'
import { Card } from './card'
import { graphql } from 'gatsby'

export const query = graphql`
  fragment CardList on MarkdownRemark {
    id
    frontmatter {
      title
      created
      path
      tags
      category
      eyecatcher {
        childImageSharp {
          gatsbyImageData(width: 296, height: 296, placeholder: BLURRED)
        }
      }
    }
  }
`

type CardNode = Queries.CardListFragment

export const CardList: ComponentType<{
  nodes: ReadonlyArray<Queries.CardListFragment>
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
