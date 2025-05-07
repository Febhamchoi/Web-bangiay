"use client"

import { memo, useState } from "react"
import "./style.scss"
import { useNavigate } from "react-router-dom"
import { ROUTERS } from "utils/router"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    // Basic validation (replace with your actual authentication logic)
    if (username === "admin" && password === "admin") {
      // Simulate successful login
      localStorage.setItem("isAdmin", "true")
      navigate(ROUTERS.ADMIN.DASHBOARD)
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng")
    }
  }

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Phong Nhí Admin</h2>
          <p>Đăng nhập để quản lý hệ thống</p>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Đăng nhập
          </button>
        </form>
        <div className="login-footer">
          <p>© 2023 Phong Nhí. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  )
}

export default memo(Login)

