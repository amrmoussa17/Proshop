import {
  Alert,
  Button,
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  Card,
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { addToCart, removeFromCart } from "../slices/cartSlice"
import { CartItemType, CartType } from "../helpers/types"
import { FaTrash } from "react-icons/fa"

const CartScreen = () => {
  const cart = useSelector((state: { cart: CartType }) => state.cart)
  const { cartItems } = cart
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addToCartHandler = (product: CartItemType, qty: number) => {
    dispatch(addToCart({ ...product, qty }))
  }
  const removeFromCartHandler = (productId: string) => {
    dispatch(removeFromCart(productId))
  }
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping")
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Alert variant="info">
            your cart is empty <Link to="/">Go Back</Link>
          </Alert>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid />
                  </Col>
                  <Col md={2}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cart.itemsQty}) items</h2>
              {cart.itemsQty && <p>$ {cart.totalPrice}</p>}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
