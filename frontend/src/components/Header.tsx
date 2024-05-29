import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import logo from "../assets/logo.png"
const Header = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="proShop" />
          ProShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/cart">
              <FaShoppingCart /> Cart
            </Nav.Link>
            <Nav.Link href="/login">
              <FaUser /> Sign In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
