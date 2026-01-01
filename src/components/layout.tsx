import { ComponentType, ReactNode } from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { ScrollToTop } from './scroll-to-top'

interface Props {
  children: ReactNode
}

export const Layout: ComponentType<Props> = ({ children }) => {
  return (
    <div className="w-full min-h-[100vh] bg-gradient-to-b from-[#0d1117] to-[#161b22]">
      <Header />
      <div className="pt-[var(--header-height)]">
        <div className="m-auto max-w-6xl px-4 py-6">{children}</div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
