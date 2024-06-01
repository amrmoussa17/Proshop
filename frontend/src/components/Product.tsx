import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "./Rating"
import { ProductType } from "../helpers/types"

const Product = ({ product }: { product: ProductType }) => {
  return (
    <Card className="p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">{product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
