import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './card'

const meta = {
  title: 'components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    node: {
      id: '001',
      frontmatter: {
        title: 'Sample さんぷる サンプル 見本',
        created: '2023-10-02',
        path: 'sample001',
        tags: ['tag', 'tag2'],
        category: 'tech',
        eyecatcher: {
          childImageSharp: {
            gatsbyImageData: {
              width: 1,
              height: 3,
              layout: 'constrained',
              images: {},
            },
          },
        },
      },
    },
  },
}
