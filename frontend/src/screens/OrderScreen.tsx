import { Link, useParams } from "react-router-dom"
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
} from "../slices/ordersApiSlice"
import {
  Row,
  Col,
  ListGroup,
  Alert,
  Card,
  Spinner,
  Image,
  Button,
} from "react-bootstrap"
import { CartItemType } from "../helpers/types"
import { Key, useEffect } from "react"
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js"
import { toast } from "react-toastify"
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../helpers/RTKQueryError"

const OrderScreen = () => {
  const { id: orderId } = useParams()
  const {
    data: order,
    refetch,
    error,
    isLoading,
  } = useGetOrderDetailsQuery(orderId)

  const [payOrder] = usePayOrderMutation()

  const [{ options }, paypalDispatch] = usePayPalScriptReducer()

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery()

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal?.clientId,
            currency: "USD",
          },
        })
      }
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript()
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch])

  function onApprove(_data: any, actions: any) {
    return actions.order.capture().then(async function (details: any) {
      try {
        await payOrder({ orderId, details })
        refetch()
        toast.success("Order is paid")
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          const errMsg = "error" in err ? err.error : JSON.stringify(err.data)
          toast.error(errMsg)
        } else if (isErrorWithMessage(err)) {
          toast.error(err.message)
        }
      }
    })
  }

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } })
    refetch()
    toast.success("Order is paid")
  }

  function onError(err: any) {
    toast.error(err.message)
  }

  function createOrder(_data: any, actions: any) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID: any) => {
        return orderID
      })
  }

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
                {!order.isPaid && (
                  <ListGroup.Item>
                    <div>
                      <Button
                        style={{ marginBottom: "10px" }}
                        onClick={onApproveTest}
                      >
                        Test Pay Order
                      </Button>

                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  </ListGroup.Item>
                )}
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
