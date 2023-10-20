import { Meta, StoryObj } from '@storybook/react'
import { Tag } from './tag'

const meta = {
  title: 'components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    name: 'tag',
  },
}
