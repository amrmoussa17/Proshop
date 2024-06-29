import { useEffect, useState } from "react"
import { Row, Col, Form, Button, Alert, Spinner, Table } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../hooks"
import { toast } from "react-toastify"
import { useProfileMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice"
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../helpers/RTKQueryError"
import { FaTimes } from "react-icons/fa"
import { LinkContainer } from "react-router-bootstrap"

const ProfileScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { userInfo } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name)
      setEmail(userInfo.email)
    }
  }, [userInfo])

  const [updateProfile] = useProfileMutation()
  const { data: orders, isLoading, error } = useGetMyOrdersQuery()

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("passwords do not match")
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo?._id,
          name,
          email,
          password,
        }).unwrap()
        dispatch(setCredentials({ ...res }))
        toast.success("Profile updated successfully")
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          const errMsg = "error" in err ? err.error : JSON.stringify(err.data)
          toast.error(errMsg)
        } else if (isErrorWithMessage(err)) {
          toast.error(err.message)
        }
      }
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        {isLoading && <Spinner />}
        {error && <Alert variant="danger">Error Occurred</Alert>}
        {!isLoading && !error && (
          <>
            <h2>My Orders</h2>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
