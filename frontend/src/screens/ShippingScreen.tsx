import { Form, Button } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { useNavigate } from "react-router-dom"
import { saveShippingAddress } from "../slices/cartSlice"
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingScreen = () => {
  const { shippingAddress } = useAppSelector((state) => state.cart)
  const [address, setAddress] = useState(shippingAddress.address || "")
  const [city, setCity] = useState(shippingAddress.city || "")
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "")
  const [country, setCountry] = useState(shippingAddress.country || "")

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate("/payment")
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Enter your Address"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Enter your City"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="postalCode">
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            type="text"
            placeholder="Enter your PostalCode"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            placeholder="Enter your Country"
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
