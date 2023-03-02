import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedOutView from "./NaBarLoggedOutView";
import NavBarLoggedInView from "./NavBarLoggedInView";

type Props = {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
};

const NavBar = ({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: Props) => {
  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
      <Container>
        <Navbar.Brand>Marsel Notes</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            {loggedInUser ? (
              <NavBarLoggedInView
                user={loggedInUser}
                onLogoutSuccessFul={onLogoutSuccessful}
              />
            ) : (
              <NavBarLoggedOutView
                onLoginClicked={onLoginClicked}
                onSignUpClicked={onSignUpClicked}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
