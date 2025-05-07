"use client"

import { memo, useState } from "react"
import "./style.scss"
import { ROUTERS } from "utils/router"
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    gender: "female",
    birthdate: "",
    agreeTerms: false,
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

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Vui lòng nhập họ"
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Vui lòng nhập tên"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu"
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự"
    }

    if (!formData.birthdate) {
      newErrors.birthdate = "Vui lòng nhập ngày sinh"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản"
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

    // Mô phỏng đăng ký thành công
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: formData.email,
        name: `${formData.lastName} ${formData.firstName}`,
      }),
    )

    navigate(ROUTERS.USER.HOME)
  }

  return (
    <div className="signup-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <Link to="/dang-nhap">Đăng nhập</Link> &gt; <span>Tạo tài khoản</span>
        </div>

        <div className="signup-container">
          <h1 className="page-title">TẠO TÀI KHOẢN</h1>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="lastName">Họ</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Họ"
                className={errors.lastName ? "error" : ""}
              />
              {errors.lastName && <div className="error-message">{errors.lastName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="firstName">Tên</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Tên"
                className={errors.firstName ? "error" : ""}
              />
              {errors.firstName && <div className="error-message">{errors.firstName}</div>}
            </div>

            <div className="form-group gender-group">
              <label>Giới tính</label>
              <div className="gender-options">
                <label className="gender-option">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleInputChange}
                  />
                  <span>Nữ</span>
                </label>
                <label className="gender-option">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleInputChange}
                  />
                  <span>Nam</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="birthdate">Ngày sinh</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                placeholder="mm/dd/yyyy"
                className={errors.birthdate ? "error" : ""}
              />
              {errors.birthdate && <div className="error-message">{errors.birthdate}</div>}
            </div>

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

            <div className="form-group terms-agreement">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
              />
              <label htmlFor="agreeTerms">Tôi đồng ý với các điều khoản</label>
              {errors.agreeTerms && <div className="error-message">{errors.agreeTerms}</div>}
            </div>

            <button type="submit" className="signup-button">
              ĐĂNG KÝ
            </button>
          </form>

          <div className="login-link">
            <p>
              <Link to={ROUTERS.USER.SIGNIN} className="back-to-login">
                ← Quay lại trang đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Signup)

