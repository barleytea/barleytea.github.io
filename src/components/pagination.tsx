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
          <Link to={idx === 0 ? `/` : `/posts/${idx + 1}`} key={idx}>
            <li
              className={
                idx + 1 === currentPage
                  ? `border-grey-500 flex h-12 w-12 items-center justify-center border bg-[color:var(--primary-color)] align-middle`
                  : `border-grey-500 flex h-12 w-12 items-center justify-center border align-middle hover:bg-[color:var(--primary-color)]`
              }
            >
              {idx + 1}
            </li>
          </Link>
        )
      })}
    </ul>
  )
}
