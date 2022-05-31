import React, {useContext} from 'react'
import UserContext from '../context/UserConext'
import {Navbar, Nav, Container} from 'react-bootstrap'

const Navigation = ({logout}) => {

  const {currentUser} = useContext(UserContext)
  const loggedInNav = () => {
    return (
      <Navbar bg="primary" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand href="/">Culture Bump</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" activeKey="/home">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/directory">Culture Bump Directory</Nav.Link>
              <Nav.Link href="/steps/add">8 Step Tool</Nav.Link>
              <Nav.Link href={`/users/${currentUser.username}`}>Profile</Nav.Link>

              <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }

  const loggedOutNav = () => {
    return (
      <Navbar bg="primary" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand href="/">Culture Bump</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" activeKey="/home">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/users/login">Login</Nav.Link>
              <Nav.Link href="/users/signup">Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }

  return (
    <nav>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  )
}

export default Navigation