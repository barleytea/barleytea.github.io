import { Link } from 'gatsby'
import { ComponentType } from 'react'

export const Header: ComponentType = () => {
  return (
    <header className="fixed z-10 h-[var(--header-height)] w-full bg-[color:var(--header-color)] font-['Oswald']">
      <div className="flex items-center justify-between py-3">
        <div className="flex-1 text-center text-[32px]">
          <Link to="/" className="text-4xl text-[color:var(--text-color)]">
            barlog.tech
          </Link>
        </div>
        <div className="mr-2 flex">
          <Link
            to="/about-me"
            className="mr-2 text-[color:var(--text-color)] hover:[color:var(--primary-color)]"
          >
            About Me
          </Link>
          <p className="mr-2 text-[color:var(--text-color)]">|</p>
          <Link
            to="/tag-list"
            className="mr-2 text-[color:var(--text-color)] hover:[color:var(--primary-color)]"
          >
            Tags
          </Link>
        </div>
      </div>
    </header>
  )
}
