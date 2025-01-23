import React from 'react'
import { Link } from 'gatsby'

interface CategoryTabsProps {
  categories: string[]
  currentCategory: string
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, currentCategory }) => {
  return (
    <div className="tabs is-centered mb-6">
      <ul className="is-flex-wrap-nowrap">
        <li className={currentCategory === '' ? 'is-active' : ''}>
          <Link to="/" className="px-6 py-2">
            All
          </Link>
        </li>
        {categories.map((category) => (
          <li
            key={category}
            className={category === currentCategory ? 'is-active' : ''}
          >
            <Link 
              to={`/category/${category.toLowerCase()}`}
              className="px-6 py-2"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .tabs ul {
          border-bottom: none;
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          -ms-overflow-style: none;
          scrollbar-width: none;
          padding: 0.5rem;
        }
        .tabs ul::-webkit-scrollbar {
          display: none;
        }
        .tabs li {
          margin: 0 0.5rem;
          flex: 0 0 auto;
        }
        .tabs li a {
          border: 1px solid #dbdbdb;
          border-radius: 20px;
          color: #888888;
          transition: all 0.3s ease;
          white-space: nowrap;
          font-size: 1.1rem;
          background-color: white;
        }
        .tabs li:hover a {
          border-color: #3273dc;
          color: #3273dc;
          background-color: #f8f9fa;
        }
        .tabs li.is-active a {
          background-color: #3273dc;
          border-color: #3273dc;
          color: white;
          font-weight: bold;
        }
      `}</style>
    </div>
  )
} 