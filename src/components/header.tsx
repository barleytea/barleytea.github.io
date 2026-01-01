import { Link } from 'gatsby'
import { ComponentType, useState, useEffect, useRef } from 'react'

export const Header: ComponentType = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="fixed z-10 h-[var(--header-height)] w-full bg-[color:var(--header-color)] font-['Oswald']">
      <div className="flex items-center justify-between py-3">
        <div>
          <Link to="/" className="ml-4 text-4xl text-[color:var(--text-color)]">
            barlog.tech
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="mr-2 hidden items-center md:flex">
          <Link
            to="/about-me"
            className="mr-2 text-[color:var(--text-color)] transition-colors duration-200 hover:text-[color:var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[color:var(--header-color)]"
          >
            About Me
          </Link>
          <p className="mr-2 text-[color:var(--text-color)]">|</p>
          <Link
            to="/tag-list"
            className="mr-2 text-[color:var(--text-color)] transition-colors duration-200 hover:text-[color:var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[color:var(--header-color)]"
          >
            Tags
          </Link>
          <p className="mr-2 text-[color:var(--text-color)]">|</p>
          <Link
            to="/search"
            className="mr-2 text-[color:var(--text-color)] transition-colors duration-200 hover:text-[color:var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[color:var(--header-color)]"
            aria-label="Search"
          >
            <svg
              className="h-5 w-5"
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
          </Link>
        </nav>

        {/* Mobile Controls */}
        <div className="mr-4 flex items-center gap-2 md:hidden">
          <button
            className="flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[color:var(--header-color)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`mb-1 block h-0.5 w-6 bg-[color:var(--text-color)] transition-all duration-300 ${
                isMobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''
              }`}
            ></span>
            <span
              className={`mb-1 block h-0.5 w-6 bg-[color:var(--text-color)] transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-[color:var(--text-color)] transition-all duration-300 ${
                isMobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav
          ref={menuRef}
          className="absolute left-0 right-0 top-[var(--header-height)] bg-[color:var(--header-color)] shadow-lg md:hidden"
        >
          <div className="flex flex-col space-y-4 p-4">
            <Link
              to="/about-me"
              onClick={handleLinkClick}
              className="text-lg text-[color:var(--text-color)] transition-colors duration-200 hover:text-[color:var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[color:var(--header-color)]"
            >
              About Me
            </Link>
            <Link
              to="/tag-list"
              onClick={handleLinkClick}
              className="text-lg text-[color:var(--text-color)] transition-colors duration-200 hover:text-[color:var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[color:var(--header-color)]"
            >
              Tags
            </Link>
            <Link
              to="/search"
              onClick={handleLinkClick}
              className="text-lg text-[color:var(--text-color)] transition-colors duration-200 hover:text-[color:var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-color)] focus:ring-offset-2 focus:ring-offset-[color:var(--header-color)]"
            >
              Search
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
