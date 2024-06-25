import { Link, useParams } from "react-router-dom"
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice"
import {
  Row,
  Col,
  ListGroup,
  Alert,
  Card,
  Spinner,
  Image,
} from "react-bootstrap"
import { CartItemType } from "../helpers/types"
import { Key } from "react"

const OrderScreen = () => {
  const { id: orderId } = useParams()
  const { data: order, error, isLoading } = useGetOrderDetailsQuery(orderId)

  if (isLoading) {
    return <Spinner />
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

  if (order) {
    return (
      <>
        <h1>order: {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.user.name}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Address:</strong>
                  {` ${order.shippingAddress.address} ${order.shippingAddress.city} ${order.shippingAddress.postalCode} ${order.shippingAddress.country}`}
                </p>
                {order.isDelivered ? (
                  <Alert variant="success">
                    Order Delivered at {order.deliveredAt}
                  </Alert>
                ) : (
                  <Alert variant="danger">Order Not delivered</Alert>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong>
                  {` ${order.paymentMethod}`}
                </p>
                {order.isPaid ? (
                  <Alert variant="success">Order Paid at {order.paidAt}</Alert>
                ) : (
                  <Alert variant="danger">Order Not Paid</Alert>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Alert variant="info">your cart is empty</Alert>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map(
                      (item: CartItemType, key: Key | null | undefined) => (
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
                              <Link to={`/product/${item._id}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} * {item.price}$ ={" "}
                              {item.price * item.qty}$
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )
                    )}
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
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )
  }

  return null
}

export default OrderScreen
