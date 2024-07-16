import { Row, Col, Spinner, Alert } from "react-bootstrap"
import Product from "../components/Product"
import { useGetProductsQuery } from "../slices/productsApiSlice"
import { ProductType } from "../helpers/types"
import { Link, useLocation } from "react-router-dom"
import Paginate from "../components/paginate"
import ProductCarousel from "../components/ProductCarousel"

const HomeScreen = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const pageNumber = Number(searchParams.get("page"))
  const search = searchParams.get("search") || ""

  const { data, error, isLoading } = useGetProductsQuery({ pageNumber, search })

  if (isLoading) {
    return <Spinner animation="border" />
  }

  if (error) {
    if ("status" in error) {
      const errMsg = "error" in error ? error.error : JSON.stringify(error.data)

      return (
        <Alert variant="danger">
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </Alert>
      )
    }
    return <div>{error.message}</div>
  }

  if (data!.products) {
    return (
      <>
        <h1>Latest Products</h1>
        {!search ? (
          <ProductCarousel />
        ) : (
          <Link to="/" className="btn btn-light">
            Go Back
          </Link>
        )}
        <Row>
          {data.products.map((product: ProductType) => (
            <Col
              sm={12}
              md={6}
              lg={4}
              xl={3}
              className="my-3"
              key={product._id}
            >
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate page={data.page} pages={data.pages} keyword={search} />
      </>
    )
  }
  return null
}

export default HomeScreen
