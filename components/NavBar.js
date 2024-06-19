import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Container,
  Nav,
  Button,
  NavDropdown,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <img
              src="/HomeFinderNavbarLogo.webp"
              alt="HomeFinder Logo"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Rooms" id="rooms-dropdown">
              <Link passHref href="/rooms">
                <NavDropdown.Item>View My Rooms</NavDropdown.Item>
              </Link>
              <Link passHref href="/rooms/newRoom">
                <NavDropdown.Item>Create New Room</NavDropdown.Item>
              </Link>
            </NavDropdown>
            <NavDropdown title="Items" id="items-dropdown">
              <Link passHref href="/items/viewAllItems">
                <NavDropdown.Item>View My Items</NavDropdown.Item>
              </Link>
              <Link passHref href="/items/newItem">
                <NavDropdown.Item>Add an Item</NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
