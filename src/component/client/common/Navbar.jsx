import React from "react";
import logo from "../../../assets/logo.png"
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark py-0 rounded"
      // style={{ backgroundColor: "#eaf1ef7e" }}
    >
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand fw-bold fs-4 text-warning text-decoration-none">
       <img src={logo} alt="GSSS Logo" style={{ width: '150px', height: '70px',borderRadius :"10px" }} />

        </Link>

        {/* Toggler (for mobile) */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-3">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-light">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/gallery" className="nav-link text-light">
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/popular-ngo-program" className="nav-link text-light">
                Programs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/trending-blog" className="nav-link text-light">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact-us" className="nav-link text-light">
                Contact
              </Link>
            </li>
              <li className="nav-item">
              <Link to="/user/dashboard" className="nav-link text-light">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
