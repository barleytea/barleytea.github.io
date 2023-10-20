import { ComponentType } from 'react'

interface TagProps {
  name: string
}

export const Tag: ComponentType<TagProps> = ({ name }) => {
  return (
    <div className="rounded bg-[color:var(--tag-color)] px-1 py-0.5 text-[color:var(--text-color)] hover:border-solid [&>p]:mb-0">
      <p>#{name}</p>
    </div>
  )
}
