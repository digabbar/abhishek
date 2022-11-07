import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SearchForm from "./SearchForm";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";
import { deleteCartData } from "../../slice/cartSlice";
function NavBar() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  const logoutHandler = () => {
    dispatch(deleteCartData());
    dispatch(logout());
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          meatWallah
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="text-center">
          <Nav className="me-auto">
            {user && user.role === "admin" && (
              <NavDropdown title="Admin" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/admin/product">
                  Add New Product
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/order">
                  All Orders
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/users">
                  All Users
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {user && (
              <NavDropdown
                className="text-uppercase"
                title={user ? user.name : "User"}
                id="collasible-nav-dropdown1"
              >
                <NavDropdown.Item as={Link} to="/me">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orders/me">
                  MY Orders
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          <Nav>
            {!isAuthenticated && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            {isAuthenticated && (
              <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            )}

            <Nav.Link as={Link} to="/cart">
              Cart ({getTotalQuantity()})
            </Nav.Link>
            <SearchForm />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
