import type { Meta, StoryObj } from '@storybook/react'

import { NextAndPreviousItem } from './next-previous-item'

const meta = {
  title: 'components/NextAndPreviousItem',
  component: NextAndPreviousItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof NextAndPreviousItem>

export default meta
type Story = StoryObj<typeof meta>

export const Left: Story = {
  args: {
    post: {
      frontmatter: {
        title: 'Sample001',
        created: '2023-10-02',
        path: 'sample001',
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
    direction: 'left',
  },
}

export const Right: Story = {
  args: {
    post: {
      frontmatter: {
        title: 'Sample003',
        created: '2023-10-04',
        path: 'sample003',
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
    direction: 'right',
  },
}

export const RightWithLongText: Story = {
  args: {
    post: {
      frontmatter: {
        title: 'LongTitle LongTitle LongTitle LongTitle LongTitle LongTitle LongTitle LongTitle LongTitle LongTitle LongTitle LongTitle',
        created: '2023-10-04',
        path: 'sample003',
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
    direction: 'right',
  },
}

export const RightWithLongTextJapanese: Story = {
  args: {
    post: {
      frontmatter: {
        title: '長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル',
        created: '2023-10-04',
        path: 'sample003',
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
    direction: 'right',
  },
}
