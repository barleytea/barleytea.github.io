import { RelatedPostList } from './related-post-list'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'components/RelatedPostList',
  component: RelatedPostList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RelatedPostList>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    posts: [
      {
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
      {
        frontmatter: {
          path: 'sample002',
          title: 'sample002',
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
    ]
  },
}
