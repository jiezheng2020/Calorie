import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";

const NavBar = () => {
  return (
    <Navbar collapseOnSelect className="navbar" expand="lg">
      <Navbar.Brand className="navbar-brand" href="/">
        Calorie
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/diary">Diary</Nav.Link>
          {/* <Nav.Link href="/report">Reports</Nav.Link> */}
        </Nav>
        <Nav>
          <LogoutButton />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
