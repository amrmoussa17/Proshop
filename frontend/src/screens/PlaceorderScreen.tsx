import {
  Row,
  Col,
  ListGroup,
  Alert,
  Image,
  Button,
  Card,
  Spinner,
} from "react-bootstrap"
import CheckoutSteps from "../components/CheckoutSteps"
import { useAppDispatch, useAppSelector } from "../hooks"
import { Link, useNavigate } from "react-router-dom"
import { useCreateOrderMutation } from "../slices/ordersApiSlice"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { clearCartItems } from "../slices/cartSlice"
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "../helpers/RTKQueryError"

const PlaceorderScreen = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const cart = useAppSelector((state) => state.cart)

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping")
    } else if (!cart.paymentMethod) {
      navigate("/payment")
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

  const [createOrder, { isLoading }] = useCreateOrderMutation()

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      }).unwrap()
      dispatch(clearCartItems())
      navigate(`/order/${res._id}`)
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = "error" in err ? err.error : JSON.stringify(err.data)
        toast.error(errMsg)
      } else if (isErrorWithMessage(err)) {
        toast.error(err.message)
      }
    }
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong>Address:</strong>
              {` ${cart.shippingAddress.address} ${cart.shippingAddress.city} ${cart.shippingAddress.postalCode} ${cart.shippingAddress.country}`}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <strong>Method:</strong>
              {` ${cart.paymentMethod}`}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Alert variant="info">your cart is empty</Alert>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, key) => (
                    <ListGroup.Item key={key}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            rounded
                            fluid
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} * {item.price}$ = {item.price * item.qty}$
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {isLoading && <Spinner />}
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.itemsQty === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceorderScreen
