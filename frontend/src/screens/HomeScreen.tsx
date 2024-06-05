import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import { useGetProductsQuery } from "../slices/productSlice"

const HomeScreen = () => {
  const { data: products, error, isLoading } = useGetProductsQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    if ("status" in error) {
      const errMsg = "error" in error ? error.error : JSON.stringify(error.data)

      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      )
    }
    return <div>{error.message}</div>
  }

  if (products) {
    return (
      <>
        <h1>Latest Products</h1>
        <Row>
          {products.map((product) => (
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
      </>
    )
  }
  return null
}

export default HomeScreen
