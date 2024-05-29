import { Card } from "react-bootstrap"

interface Props {
  product: {
    _id: string
    name: string
    image: string
    price: number
  }
}

const Product = ({ product }: Props) => {
  return (
    <Card className="p-3 rounded">
      <a href={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as="h3">{product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
