import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { CartProvider } from './cmps/Cart.jsx'
import { NavBar } from './cmps/NavBar.jsx'
import { Homepage } from './pages/Homepage.jsx'
import { Menu } from './pages/Menu.jsx'
import { Reservation } from './pages/Reservation.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ContactUs } from './pages/ContactUs.jsx'
import { Footer } from './cmps/Footer.jsx'
import { Cart } from './cmps/Cart.jsx'
import './assets/main.css'

export const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <NavBar />
          <Cart />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}
