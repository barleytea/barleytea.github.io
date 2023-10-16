import type { Meta, StoryObj } from '@storybook/react'

import { CardList } from './card-list'

const meta = {
  title: 'components/CardList',
  component: CardList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CardList>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    nodes: [
      {
        id: '001',
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
      {
        id: '002',
        frontmatter: {
          title: 'Sample002',
          created: '2023-10-03',
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
      {
        id: '003',
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
      {
        id: '004',
        frontmatter: {
          title: 'Sample004',
          created: '2023-10-05',
          path: 'sample004',
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
        id: '005',
        frontmatter: {
          title: 'Sample005',
          created: '2023-10-06',
          path: 'sample005',
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
        id: '006',
        frontmatter: {
          title: 'Sample006',
          created: '2023-10-07',
          path: 'sample006',
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
    ],
  },
}
