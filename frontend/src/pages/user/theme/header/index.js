"use client"

import { memo, useState, useEffect, useRef } from "react"
import "./style.scss"
import { ROUTERS } from "utils/router"
import { Link, useLocation } from "react-router-dom"
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa"

const Header = () => {
  const location = useLocation()
  const [menu] = useState([
    { name: "TRANG CHỦ", path: ROUTERS.USER.HOME },
    { name: "NIKE", path: "/thuong-hieu/nike" },
    { name: "ADIDAS", path: "/thuong-hieu/adidas" },
    { name: "JORDAN", path: "/thuong-hieu/jordan" },
    { name: "YEEZY", path: "/thuong-hieu/yeezy" },
    { name: "OTHER BRANDS", path: "/thuong-hieu/khac" },
    { name: "SALE", path: "/khuyen-mai" },
    { name: "DÂY GIÀY", path: "/day-giay" },
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const headerRef = useRef(null)

  // Lấy số lượng sản phẩm trong giỏ hàng từ localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartCount(cart.length)
  }, [location])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="header-top">
          <div className="header-logo">
            <Link to={ROUTERS.USER.HOME}>
              <h1 className="logo">PHONG NHÍ</h1>
            </Link>
          </div>
          <div className="header-search">
            <input type="text" placeholder="Tìm kiếm..." />
            <button className="search-button">
              <FaSearch />
            </button>
          </div>
          <div className="header-actions">
            <Link to={ROUTERS.USER.SIGNIN} className="user-icon">
              <FaUser />
            </Link>
            <Link to={ROUTERS.USER.CART} className="cart-icon">
              <FaShoppingCart />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </div>
        </div>
        <nav className="header-menu">
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Mở menu">
            ☰
          </button>
          <ul className={`menu-list ${isOpen ? "open" : ""}`}>
            {menu?.map((menuItem, menuKey) => (
              <li key={menuKey} className={location.pathname === menuItem.path ? "active" : ""}>
                <Link to={menuItem?.path}>{menuItem?.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
export default memo(Header)

