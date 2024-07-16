import { Pagination } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

interface Props {
  page: number
  pages: number
  isAdmin?: boolean
  keyword?: string
}
const paginate = ({ page, pages, isAdmin = false, keyword = "" }: Props) => {
  if (pages > 1)
    return (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? {
                    pathname: "/",
                    search: `page=${x + 1}&search=${keyword}`,
                  }
                : {
                    pathname: "/admin/productlist",
                    search: `page=${x + 1}&search=${keyword}`,
                  }
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  return null
}

export default paginate
