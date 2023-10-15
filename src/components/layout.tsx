import { ComponentType, ReactNode } from 'react'
import { Header } from './header'
import { Footer } from './footer'

interface Props {
  children: ReactNode
}

export const Layout: ComponentType<Props> = ({ children }) => {
  return (
    <div className="min-h-[100vh] bg-[color:var(--base-color)]">
      <Header />
      <div className="pt-[var(--header-height)]">
        <div className="m-auto max-w-5xl p-3">{children}</div>
      </div>
      <Footer />
    </div>
  )
}
