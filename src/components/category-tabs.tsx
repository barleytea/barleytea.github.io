import React from 'react'
import { Link } from 'gatsby'

interface CategoryTabsProps {
  categories: string[]
  currentCategory: string
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, currentCategory }) => {
  return (
    <div className="mb-6">
      <ul className="flex flex-nowrap overflow-x-auto scrollbar-hide py-2 px-2">
        <li className="mx-2 flex-none">
          <Link
            to="/"
            className={`px-6 py-2 border rounded-full text-lg transition-all duration-300 whitespace-nowrap ${
              currentCategory === ''
                ? 'bg-[color:var(--primary-color)] border-[color:var(--primary-color)] text-white font-bold'
                : 'border-gray-700 text-gray-400 bg-gray-800/30 hover:border-[color:var(--primary-color)] hover:text-[color:var(--primary-color)] hover:bg-gray-800/50'
            }`}
          >
            All
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category} className="mx-2 flex-none">
            <Link
              to={`/category/${category.toLowerCase()}`}
              className={`px-6 py-2 border rounded-full text-lg transition-all duration-300 whitespace-nowrap ${
                category === currentCategory
                  ? 'bg-[color:var(--primary-color)] border-[color:var(--primary-color)] text-white font-bold'
                  : 'border-gray-700 text-gray-400 bg-gray-800/30 hover:border-[color:var(--primary-color)] hover:text-[color:var(--primary-color)] hover:bg-gray-800/50'
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