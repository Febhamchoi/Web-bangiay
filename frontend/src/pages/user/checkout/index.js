"use client"

import { memo, useState, useEffect } from "react"
import "./style.scss"
import { FaArrowLeft } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { formatPrice } from "utils/formatter"
import { ROUTERS } from "utils/router"

const Checkout = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [subtotal, setSubtotal] = useState(0)
  const [shippingFee, setShippingFee] = useState(30000)
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    notes: "",
  })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)

    // Lấy dữ liệu giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    if (cart.length === 0) {
      navigate(ROUTERS.USER.CART)
      return
    }

    setCartItems(cart)

    // Tính tổng tiền
    const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setSubtotal(subTotal)
    setTotal(subTotal + shippingFee - discount)

    // Lấy thông tin người dùng từ localStorage nếu có
    const savedUserInfo = JSON.parse(localStorage.getItem("userInfo") || "null")
    if (savedUserInfo) {
      setFormData((prevData) => ({
        ...prevData,
        ...savedUserInfo,
      }))
    }
  }, [navigate])

  useEffect(() => {
    setTotal(subtotal + shippingFee - discount)
  }, [subtotal, shippingFee, discount])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Xóa lỗi khi người dùng nhập lại
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      })
    }
  }

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method)
  }

  const handleShippingMethodChange = (method) => {
    setShippingMethod(method)
    if (method === "express") {
      setShippingFee(50000)
    } else {
      setShippingFee(30000)
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.fullName.trim()) {
      errors.fullName = "Vui lòng nhập họ tên"
    }

    if (!formData.phone.trim()) {
      errors.phone = "Vui lòng nhập số điện thoại"
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      errors.phone = "Số điện thoại không hợp lệ"
    }

    if (!formData.province.trim()) {
      errors.province = "Vui lòng chọn tỉnh/thành phố"
    }

    if (!formData.district.trim()) {
      errors.district = "Vui lòng chọn quận/huyện"
    }

    if (!formData.ward.trim()) {
      errors.ward = "Vui lòng chọn phường/xã"
    }

    if (!formData.address.trim()) {
      errors.address = "Vui lòng nhập địa chỉ cụ thể"
    }

    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Lưu thông tin người dùng vào localStorage
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        fullName: formData.fullName,
        phone: formData.phone,
        province: formData.province,
        district: formData.district,
        ward: formData.ward,
        address: formData.address,
      }),
    )

    // Tạo đơn hàng
    const order = {
      id: Date.now(),
      items: cartItems,
      subtotal: subtotal,
      shippingFee: shippingFee,
      discount: discount,
      total: total,
      paymentMethod: paymentMethod,
      shippingMethod: shippingMethod,
      customerInfo: formData,
      status: "pending",
      orderDate: new Date().toISOString(),
    }

    // Lưu đơn hàng vào localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    orders.push(order)
    localStorage.setItem("orders", JSON.stringify(orders))

    // Xóa giỏ hàng
    localStorage.setItem("cart", JSON.stringify([]))

    // Chuyển hướng đến trang đặt hàng thành công
    navigate(ROUTERS.USER.ORDER_SUCCESS, {
      state: {
        orderId: order.id,
        total: total,
      },
    })
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <Link to="/san-pham/1">AIR FORCE 1</Link> &gt;{" "}
          <Link to="/gio-hang">Giỏ hàng</Link> &gt; <span>Mua hàng</span>
        </div>

        <h1 className="page-title">THÔNG TIN MUA HÀNG</h1>

        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="fullName">HỌ VÀ TÊN</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={formErrors.fullName ? "error" : ""}
                />
                {formErrors.fullName && <div className="error-message">{formErrors.fullName}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">SĐT</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={formErrors.phone ? "error" : ""}
                />
                {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="address">ĐỊA CHỈ CỤ THỂ (Số nhà, đường, thôn, xóm, ấp, bản)</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={formErrors.address ? "error" : ""}
                />
                {formErrors.address && <div className="error-message">{formErrors.address}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="province">Tỉnh/Thành phố</label>
                  <select
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className={formErrors.province ? "error" : ""}
                  >
                    <option value="">Chọn Tỉnh/TP</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                  </select>
                  {formErrors.province && <div className="error-message">{formErrors.province}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="district">Quận/Huyện</label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className={formErrors.district ? "error" : ""}
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    <option value="Hà Đông">Hà Đông</option>
                    <option value="Thanh Xuân">Thanh Xuân</option>
                    <option value="Cầu Giấy">Cầu Giấy</option>
                  </select>
                  {formErrors.district && <div className="error-message">{formErrors.district}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="ward">Phường/Xã</label>
                  <select
                    id="ward"
                    name="ward"
                    value={formData.ward}
                    onChange={handleInputChange}
                    className={formErrors.ward ? "error" : ""}
                  >
                    <option value="">Chọn Phường/Xã</option>
                    <option value="Mộ Lao">Mộ Lao</option>
                    <option value="Văn Quán">Văn Quán</option>
                    <option value="Yên Nghĩa">Yên Nghĩa</option>
                  </select>
                  {formErrors.ward && <div className="error-message">{formErrors.ward}</div>}
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="shippingMethod">Phương thức vận chuyển</label>
                <select
                  id="shippingMethod"
                  name="shippingMethod"
                  value={shippingMethod}
                  onChange={(e) => handleShippingMethodChange(e.target.value)}
                >
                  <option value="standard">Giao hàng tiêu chuẩn (30.000đ)</option>
                  <option value="express">Giao hàng nhanh (50.000đ)</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="paymentMethod">Phương thức thanh toán</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => handlePaymentMethodChange(e.target.value)}
                >
                  <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                  <option value="bank">Chuyển khoản ngân hàng</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="notes">Ghi chú</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Bạn để lại ghi chú tại đây nhé!"
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div className="order-summary">
              <h2>Đơn hàng của bạn</h2>
              <div className="cart-items">
                {cartItems.map((item, index) => (
                  <div className="cart-item" key={`${item.id}-${item.size}-${index}`}>
                    <div className="item-image">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <div className="item-name">{item.name}</div>
                      <div className="item-size">Size: {item.size}</div>
                      <div className="item-price-qty">
                        {formatPrice(item.price)} x {item.quantity}
                      </div>
                    </div>
                    <div className="item-total">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Phí vận chuyển:</span>
                  <span>{formatPrice(shippingFee)}</span>
                </div>
                {discount > 0 && (
                  <div className="summary-row">
                    <span>Giảm giá:</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Tổng tiền:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="checkout-actions">
                <Link to="/gio-hang" className="back-to-cart">
                  <FaArrowLeft /> Quay lại giỏ hàng
                </Link>
                <button type="submit" className="place-order-btn">
                  MUA HÀNG
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default memo(Checkout)

