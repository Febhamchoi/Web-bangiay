"use client"

import { memo, useEffect, useState } from "react"
import "./style.scss"
import { Link, useNavigate } from "react-router-dom"
import { FaTrash, FaArrowLeft } from "react-icons/fa"
import { formatPrice } from "utils/formatter"
import { ROUTERS } from "utils/router"

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    loadCartItems()
  }, [])

  const loadCartItems = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(cart)

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotalPrice(total)
  }

  const handleQuantityChange = (id, size, change) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id && item.size === size) {
        const newQuantity = item.quantity + change
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
      }
      return item
    })

    localStorage.setItem("cart", JSON.stringify(updatedCart))
    setCartItems(updatedCart)

    const total = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotalPrice(total)
  }

  const handleRemoveItem = (id, size) => {
    const updatedCart = cartItems.filter((item) => !(item.id === id && item.size === size))
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    setCartItems(updatedCart)

    const total = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotalPrice(total)
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng.")
      return
    }

    navigate(ROUTERS.USER.CHECKOUT)
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <span>Giỏ hàng</span>
        </div>

        <h1 className="page-title">GIỎ HÀNG</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Giỏ hàng trống</h2>
            <p>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
            <Link to={ROUTERS.USER.SHOP} className="continue-shopping-btn">
              <FaArrowLeft /> Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div className="cart-item" key={`${item.id}-${item.size}-${index}`}>
                  <div className="item-image">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <div className="item-info">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-size">Size Giày: {item.size}</p>
                      <p className="item-code">Mã SP: {item.code}</p>
                    </div>
                    <div className="item-price">{formatPrice(item.price)}</div>
                    <div className="item-quantity">
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.size, -1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, item.size, 1)}>
                        +
                      </button>
                    </div>
                    <div className="item-total">{formatPrice(item.price * item.quantity)}</div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id, item.size)}
                      title="Xóa sản phẩm"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row total">
                <span>Tổng tiền:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="cart-actions">
                <Link to="/" className="continue-shopping-btn">
                  <FaArrowLeft /> Tiếp tục mua sắm
                </Link>
                <button className="checkout-btn" onClick={handleCheckout}>
                  ĐẶT HÀNG
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(Cart)

