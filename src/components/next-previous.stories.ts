import type { Meta, StoryObj } from '@storybook/react'

import { NextAndPrevious } from './next-previous'

const meta = {
  title: 'components/NextAndPrevious',
  component: NextAndPrevious,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof NextAndPrevious>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    prev: {
      frontmatter: {
        title: 'Sample001',
        created: '2023-10-02',
        path: 'sample001',
        tags: [],
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
    next: {
      frontmatter: {
        title: 'Sample003',
        created: '2023-10-04',
        path: 'sample003',
        tags: [],
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
