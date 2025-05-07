"use client"

import { memo, useState } from "react"
import "./style.scss"
import { ROUTERS } from "utils/router"
import { Link, useNavigate } from "react-router-dom"

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Xóa lỗi khi người dùng nhập lại
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu"
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Mô phỏng đăng nhập thành công
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: formData.email,
        name: "Người dùng",
      }),
    )

    navigate(ROUTERS.USER.HOME)
  }

  return (
    <div className="signin-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <span>Đăng nhập</span>
        </div>

        <div className="signin-container">
          <h1 className="page-title">ĐĂNG NHẬP TÀI KHOẢN</h1>
          <p className="subtitle">Nhập email và mật khẩu của bạn</p>

          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className={errors.email ? "error" : ""}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Mật khẩu"
                className={errors.password ? "error" : ""}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <label htmlFor="rememberMe">Nhớ mật khẩu</label>
              </div>

              <Link to="/quen-mat-khau" className="forgot-password">
                Khôi phục mật khẩu
              </Link>
            </div>

            <button type="submit" className="signin-button">
              ĐĂNG NHẬP
            </button>
          </form>

          <div className="register-link">
            <p>
              Khách hàng mới? <Link to={ROUTERS.USER.SIGNUP}>Tạo tài khoản</Link>
            </p>
          </div>

          <div className="back-link">
            <Link to="/" className="back-to-home">
              ← Quay lại trang đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Signin)

