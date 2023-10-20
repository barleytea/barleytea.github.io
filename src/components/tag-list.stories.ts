import { Meta, StoryObj } from '@storybook/react'
import { TagList } from './tag-list'

const meta = {
  title: 'components/TagList',
  component: TagList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TagList>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    tags: ['tag', 'tag2'],
  },
}
