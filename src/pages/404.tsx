import * as React from 'react'
import { Link, HeadFC, PageProps } from 'gatsby'
import { Layout } from '../components/layout'

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="mb-8 text-6xl font-bold text-[color:var(--primary-color)]">
          404
        </h1>
        <h2 className="mb-4 text-3xl font-semibold text-[color:var(--text-color)]">
          Page not found
        </h2>
        <p className="mb-8 max-w-md text-lg text-[color:var(--text-color)]">
          Sorry 😔, we couldn't find what you were looking for.
          {process.env.NODE_ENV === 'development' && (
            <>
              <br />
              <br />
              Try creating a page in{' '}
              <code className="rounded bg-gray-800 px-2 py-1 text-[color:var(--primary-color)]">
                src/pages/
              </code>
              .
            </>
          )}
        </p>
        <Link
          to="/"
          className="rounded-lg bg-[color:var(--primary-color)] px-6 py-3 text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg"
        >
          Go home
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
