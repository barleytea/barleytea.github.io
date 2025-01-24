import type { Meta, StoryObj } from '@storybook/react'

import { ContentsHeader } from './contents-header'

const meta = {
  title: 'components/ContentsHeader',
  component: ContentsHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ContentsHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    markdownMeta: {
      title: 'Sample さんぷる サンプル 見本',
      created: '2023-10-02',
      path: 'sample001',
      tags: ['tag'],
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
}
