import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './pagination'

const meta = {
  title: 'components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    currentPage: 2,
    totalPages: 10,
  },
}
