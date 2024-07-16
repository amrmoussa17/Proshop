import { Alert, Carousel, Image, Spinner } from "react-bootstrap"
import { useGetTopProductsQuery } from "../slices/productsApiSlice"
import { Link } from "react-router-dom"

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery()

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

  if (products) {
    return (
      <Carousel className="bg-primary mb-4">
        {products!.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption className="carousel-caption">
                <h2 className="text-white text-right">
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    )
  }
  return null
}

export default ProductCarousel
