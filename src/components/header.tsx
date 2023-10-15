import { Link } from 'gatsby'
import { ComponentType } from 'react'

export const Header: ComponentType = () => {
  return (
    <header className="fixed z-10 h-[var(--header-height)] w-full bg-[color:var(--header-color)]">
      <div className="flex items-center justify-between py-3">
        <div>
          <Link to="/" className="ml-1 text-4xl text-[color:var(--text-color)]">
            barlog.tech
          </Link>
        </div>
        <div className="flex">
          <Link to="/bio" className="mr-1 text-[color:var(--text-color)]">
            Bio
          </Link>
        </div>
      </div>
    </header>
  )
}
