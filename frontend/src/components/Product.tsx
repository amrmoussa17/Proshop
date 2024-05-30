import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import Rating from "./Rating"

interface Props {
  product: {
    _id: string
    name: string
    image: string
    price: number
    rating: number
    numReviews: number
  }
}

const Product = ({ product }: Props) => {
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
        <Card.Text>
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
