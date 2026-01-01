import { Link } from 'gatsby'
import { ComponentType, useState, useMemo } from 'react'

interface SearchablePost {
  title: string
  path: string
  tags: string[]
}

interface SearchProps {
  posts: SearchablePost[]
  onClose?: () => void
}

export const filterPosts = (posts: SearchablePost[], query: string): SearchablePost[] => {
  if (!query.trim()) {
    return []
  }
  
  const lowerQuery = query.toLowerCase()
  
  return posts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(lowerQuery)
    const tagMatch = post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    return titleMatch || tagMatch
  })
}

export const highlightText = (text: string, query: string): JSX.Element => {
  if (!query.trim()) {
    return <>{text}</>
  }
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  
  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="bg-[color:var(--primary-color)] text-white px-0.5 rounded">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  )
}

export const Search: ComponentType<SearchProps> = ({ posts, onClose }) => {
  const [query, setQuery] = useState('')

  const results = useMemo(() => filterPosts(posts, query), [posts, query])

  return (
    <div className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts by title or tag..."
          className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 pl-10 text-[color:var(--text-color)] placeholder-gray-500 transition-colors duration-300 focus:border-[color:var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-color)]"
          autoFocus
        />
        <svg
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {query.trim() && (
        <div className="mt-4 max-h-96 overflow-y-auto rounded-lg border border-gray-700 bg-gray-800/50">
          {results.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {results.map((post) => (
                <li key={post.path}>
                  <Link
                    to={post.path}
                    onClick={onClose}
                    className="block p-4 transition-colors duration-200 hover:bg-gray-700/50"
                  >
                    <h3 className="text-lg font-semibold text-[color:var(--text-color)]">
                      {highlightText(post.title, query)}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[color:var(--tag-color)] px-2 py-0.5 text-sm text-[color:var(--text-color)]"
                        >
                          {highlightText(`#${tag}`, query)}
                        </span>
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <svg
                className="mx-auto h-12 w-12 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg">No posts found for "{query}"</p>
              <p className="mt-2 text-sm">Try searching with different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
