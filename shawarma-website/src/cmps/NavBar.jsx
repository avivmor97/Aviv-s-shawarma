import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>☰</button>
          <div className="nav-links">
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
        </div>
      </nav>

      {/* Modal Navigation Menu */}
      {isMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsMenuOpen(false)}>✖</button>
            <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/menu" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Menu</Link>
            <Link to="/reservation" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Reservation</Link>
            <Link to="/about-us" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/contact-us" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
            <button className="nav-btn" onClick={() => setIsMenuOpen(false)}>Sign In</button>
            <button className="nav-btn signup-btn" onClick={() => setIsMenuOpen(false)}>Sign Up</button>
          </div>
        </div>
      )}
    </>
  )
}
