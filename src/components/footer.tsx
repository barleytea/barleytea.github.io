import { ComponentType } from 'react'

export const Footer: ComponentType = () => {
  return (
    <footer className="sticky top-[100vh] bg-[color:var(--base-color)] text-[color:var(--text-color)]">
      <div className="m-auto">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </div>
    </footer>
  )
}
