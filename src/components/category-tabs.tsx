import { Link } from 'gatsby'
import { ComponentType } from 'react'

interface CategoryTabsProps {
  categories: string[]
  currentCategory: string | null
}

export const CategoryTabs: ComponentType<CategoryTabsProps> = ({
  categories,
  currentCategory,
}) => {
  return (
    <div className="mb-8">
      <ul className="flex flex-wrap border-b border-[color:var(--text-color)]">
        <li className="mr-2">
          <Link
            to="/"
            className={`inline-block rounded-t-lg p-4 ${
              currentCategory === null
                ? 'bg-[color:var(--primary-color)] text-[color:var(--text-color)]'
                : 'hover:bg-[color:var(--primary-color)] hover:text-[color:var(--text-color)]'
            }`}
          >
            All
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category} className="mr-2">
            <Link
              to={`/category/${category.toLowerCase()}`}
              className={`inline-block rounded-t-lg p-4 ${
                currentCategory === category
                  ? 'bg-[color:var(--primary-color)] text-[color:var(--text-color)]'
                  : 'hover:bg-[color:var(--primary-color)] hover:text-[color:var(--text-color)]'
              }`}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
} 