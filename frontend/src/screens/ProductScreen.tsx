import { Link, useParams } from "react-router-dom"
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap"
import Rating from "../components/Rating"
import axios from "axios"
import { useState, useEffect } from "react"
import { ProductType } from "../helpers/types"

const ProductScreen = () => {
  const { id: productId } = useParams()
  const [product, setProduct] = useState<ProductType>()

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get<ProductType>(
        `/api/products/${productId}`
      )
      setProduct(data)
    }
    fetchProduct()
  }, [productId])

  if (!product) return <div>Product Not Found</div>
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>${product.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>
                  {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className="btn-block"
                disabled={product.countInStock === 0}
              >
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen