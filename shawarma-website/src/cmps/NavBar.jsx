import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/menu" className="nav-link">Menu</Link>
        <Link to="/reservation" className="nav-link">Reservation</Link>
        <Link to="/about-us" className="nav-link">About Us</Link>
        <Link to="/contact-us" className="nav-link">Contact Us</Link>
        <div className="nav-actions">
          <button className="nav-btn">Sign In</button>
          <button className="nav-btn signup-btn">Sign Up</button>
        </div>
      </div>
    </nav>
  )
}
