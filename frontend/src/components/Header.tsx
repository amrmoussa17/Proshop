import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import logo from "../assets/logo.png"
import { LinkContainer } from "react-router-bootstrap"
import { Badge } from "react-bootstrap"
import { useSelector } from "react-redux"
import { CartType } from "../helpers/types"

const Header = () => {
  const { itemsQty } = useSelector((state: { cart: CartType }) => state.cart)
  return (
    <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="proShop" />
            ProShop
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart /> Cart
                {itemsQty > 0 && (
                  <Badge bg="success" style={{ marginLeft: " 0.5rem" }}>
                    {itemsQty}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>
                <FaUser /> Sign In
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
