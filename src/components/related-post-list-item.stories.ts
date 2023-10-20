import { RelatedPostListItem } from './related-post-list-item'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'components/RelatedPostListItem',
  component: RelatedPostListItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RelatedPostListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    post: {
      frontmatter: {
        path: 'sample001',
        title: 'sample001',
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
