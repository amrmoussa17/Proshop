import { useEffect, useState } from "react"
import { Form, Button, Spinner, Col, Row } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import { useRegisterMutation } from "../slices/usersApiSlice"
import { toast } from "react-toastify"
import {
  isFetchBaseQueryError,
  isErrorWithMessage,
} from "../helpers/RTKQueryError"
import { setCredentials } from "../slices/authSlice"

const RegisterScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userInfo } = useAppSelector((state) => state.auth)

  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get("redirect") || "/"

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate])

  const [register, { isLoading }] = useRegisterMutation()

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("passwords do not match")
    } else {
      try {
        const res = await register({ name, email, password }).unwrap()
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
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your Name"
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={isLoading}>
          Register
        </Button>
        {isLoading && <Spinner />}
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          <Link to={`/login?redirect=${redirect}`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
