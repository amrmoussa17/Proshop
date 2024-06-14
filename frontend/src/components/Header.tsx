import { Badge, NavDropdown, Navbar, Nav, Container } from "react-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { LinkContainer } from "react-router-bootstrap"
import logo from "../assets/logo.png"
import { useAppSelector } from "../hooks"

const Header = () => {
  const { itemsQty } = useAppSelector((state) => state.cart)
  const { userInfo } = useAppSelector((state) => state.auth)
  const logoutHandler = () => {
    console.log("logout")
  }
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
            {userInfo ? (
              <NavDropdown title={userInfo.name} id={userInfo._id}>
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
