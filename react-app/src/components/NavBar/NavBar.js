import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";

const NavBar = () => {
  return (
    // <nav className="">
    //   <NavLink to="/" exact={true} activeClassName="active">
    //     Home
    //   </NavLink>
    //   <NavLink to="/login" exact={true} activeClassName="active">
    //     Diary
    //   </NavLink>
    //   <NavLink to="/sign-up" exact={true} activeClassName="active">
    //     Report
    //   </NavLink>
    //   <NavLink to="/users" exact={true} activeClassName="active">
    //     Profile
    //   </NavLink>
    //   <LogoutButton />
    // </nav>
    <Navbar collapseOnSelect className="navbar" expand="lg">
      <Navbar.Brand className="navbar-brand" href="/">
        Calorie
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/diary">Diary</Nav.Link>
          <Nav.Link href="/report">Reports</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav>
        <Nav>
          <LogoutButton />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
