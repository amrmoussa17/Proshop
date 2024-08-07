import { Badge, NavDropdown, Navbar, Nav, Container } from "react-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { LinkContainer } from "react-router-bootstrap"
import logo from "../assets/logo.png"
import { useAppDispatch, useAppSelector } from "../hooks"
import { useLogoutMutation } from "../slices/usersApiSlice"
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "../helpers/RTKQueryError"
import { toast } from "react-toastify"
import { logout } from "../slices/authSlice"
import { useNavigate } from "react-router-dom"
import SearchBox from "./SearchBox"
import { resetCart } from "../slices/cartSlice"

const Header = () => {
  const { itemsQty } = useAppSelector((state) => state.cart)
  const { userInfo } = useAppSelector((state) => state.auth)

  const [logoutApiCall] = useLogoutMutation()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      dispatch(resetCart())
      navigate("/login")
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
            <SearchBox />
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
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default Header
