import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from 'react-router-dom';
import { auth, logout } from '../auth/firebase';

const Layout = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <Container fluid>
      <Row>
        <Navbar bg="light" variant="light">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/countries">
                  <Nav.Link>Countries</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/favourites">
                  <Nav.Link>Favourites</Nav.Link>
                </LinkContainer>
                {user ? (
                  <Navbar.Text className="me-2">
                  <i className="bi-person-circle"></i> {user.displayName} {user.email}
                </Navbar.Text>
                ) : (
                  <><LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer><LinkContainer to="/register">
                      <Nav.Link>Register</Nav.Link>
                    </LinkContainer></>
                  
                )}
              </Nav>
            </Navbar.Collapse>
            { user ? (
              <Button variant="primary" hidden={loading} onClick={logout}>
                Logout</Button>) : (<LinkContainer to="/login"><Button>Login</Button></LinkContainer>)}
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
};

export default Layout;
