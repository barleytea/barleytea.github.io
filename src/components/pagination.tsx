import { Link } from 'gatsby'
import { ComponentType } from 'react'

interface Props {
  totalPages: number
  currentPage: number
}

export const Pagination: ComponentType<Props> = ({
  currentPage,
  totalPages,
}) => {
  return (
    <ul className="flex list-none pl-0 text-[color:var(--text-color)]">
      {new Array(totalPages).fill(0).map((_, idx) => {
        return (
          <li
            className={
              idx + 1 === currentPage
                ? `border-grey-500 h-12 w-12 border bg-[color:var(--primary-color)]`
                : `border-grey-500 h-12 w-12 border hover:bg-[color:var(--primary-color)]`
            }
          >
            <Link
              to={idx === 0 ? `/` : `/posts/${idx + 1}`}
              key={idx}
              className="flex h-full w-full items-center justify-center align-middle"
            >
              {idx + 1}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
