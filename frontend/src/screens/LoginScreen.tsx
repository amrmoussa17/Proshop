import { useEffect, useState } from "react"
import { Form, Button, Spinner, Col, Row } from "react-bootstrap"
import { useLoginMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import FormContainer from "../components/FormContainer"
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "../helpers/RTKQueryError"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get("redirect") || "/"
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials(res))
      navigate(redirect)
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
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your Email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your Password"
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={isLoading}>
          Sign In
        </Button>
        {isLoading && <Spinner />}
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={`/register?redirect=${redirect}`}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
export default LoginScreen
