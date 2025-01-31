import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

import { CartProvider } from './cmps/Cart.jsx'
import { NavBar } from './cmps/NavBar.jsx'
import { Homepage } from './pages/Homepage.jsx'
import { Menu } from './pages/Menu.jsx'
import { Reservation } from './pages/Reservation.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ContactUs } from './pages/ContactUs.jsx'
import { Footer } from './cmps/Footer.jsx'
import { Cart } from './cmps/Cart.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import { ProtectedRoute } from './cmps/ProtectedRoute.jsx'

import './assets/main.css'

export const App = () => {
  return (
    <Provider store={store}>
      <CartProvider>
        <Router>
          <div className="app">
            <NavBar />
            <Cart />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Homepage />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/reservation" element={<Reservation />} />
              </Route>
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </Provider>
  )
}
