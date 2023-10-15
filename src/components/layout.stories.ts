import type { Meta, StoryObj } from '@storybook/react'

import { Layout } from './layout'

const meta = {
  title: 'components/Layout',
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
