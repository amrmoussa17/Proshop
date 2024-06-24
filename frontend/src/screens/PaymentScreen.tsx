import { Form, Button } from "react-bootstrap"
import CheckoutSteps from "../components/CheckoutSteps"
import FormContainer from "../components/FormContainer"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import { savePaymentMethod } from "../slices/cartSlice"

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal")
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { shippingAddress } = useAppSelector((state) => state.cart)

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping")
    }
  }, [shippingAddress, navigate])

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder")
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label as="legend">Select Method</Form.Label>
          <Form.Check
            type="radio"
            id="PayPal"
            label={"PayPal or credit card"}
            value="PayPal"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
