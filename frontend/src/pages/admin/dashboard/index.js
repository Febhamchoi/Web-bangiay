"use client"

import { memo, useState, useEffect } from "react"
import "./style.scss"
import { FaShoppingBag, FaShoppingCart, FaUsers, FaMoneyBillWave } from "react-icons/fa"
import { Link } from "react-router-dom"
import { ROUTERS } from "utils/router"
import { formatPrice } from "utils/formatter"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    pendingOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  })

  const [recentOrders, setRecentOrders] = useState([])
  const [topSellingProducts, setTopSellingProducts] = useState([])

  // Mô phỏng dữ liệu thống kê
  useEffect(() => {
    // Trong thực tế, dữ liệu này sẽ được lấy từ API
    setStats({
      totalProducts: 156,
      pendingOrders: 12,
      totalCustomers: 87,
      totalRevenue: 15680000,
    })

    const mockRecentOrders = [
      {
        id: 1,
        customer: "Nguyễn Văn A",
        date: "15/03/2023",
        total: 3300000,
        status: "completed",
      },
      {
        id: 2,
        customer: "Trần Thị B",
        date: "15/03/2023",
        total: 6600000,
        status: "pending",
      },
      {
        id: 3,
        customer: "Lê Văn C",
        date: "16/03/2023",
        total: 3300000,
        status: "processing",
      },
      {
        id: 4,
        customer: "Phạm Thị D",
        date: "16/03/2023",
        total: 16800000,
        status: "cancelled",
      },
      {
        id: 5,
        customer: "Hoàng Văn E",
        date: "17/03/2023",
        total: 3300000,
        status: "pending",
      },
    ]

    const mockTopSellingProducts = [
      {
        id: 1,
        name: "AIR FORCE 1",
        sold: 125,
        revenue: 412500000,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 2,
        name: "NIKE PEGASUS TRAIL 4",
        sold: 98,
        revenue: 352800000,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 3,
        name: "ADIDAS GRADAS CLOUD WHITE",
        sold: 87,
        revenue: 313200000,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 4,
        name: "PUMA SLIPSTREAM GREEN",
        sold: 76,
        revenue: 212800000,
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 5,
        name: "AIR FORCE 2",
        sold: 65,
        revenue: 1092000000,
        image: "/placeholder.svg?height=60&width=60",
      },
    ]

    setRecentOrders(mockRecentOrders)
    setTopSellingProducts(mockTopSellingProducts)
  }, [])

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "status-completed"
      case "pending":
        return "status-pending"
      case "processing":
        return "status-processing"
      case "cancelled":
        return "status-cancelled"
      default:
        return ""
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Hoàn thành"
      case "pending":
        return "Chờ xác nhận"
      case "processing":
        return "Đang xử lý"
      case "cancelled":
        return "Đã hủy"
      default:
        return status
    }
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-content">
        <div className="admin-header">
          <h1>Dashboard</h1>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">
              <FaShoppingBag />
            </div>
            <div className="stat-content">
              <h3>Tổng số sản phẩm</h3>
              <p>{stats.totalProducts}</p>
            </div>
            <Link to={ROUTERS.ADMIN.PRODUCTS} className="stat-link">
              Quản lý
            </Link>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaShoppingCart />
            </div>
            <div className="stat-content">
              <h3>Đơn hàng chờ xử lý</h3>
              <p>{stats.pendingOrders}</p>
            </div>
            <Link to={ROUTERS.ADMIN.ORDERS} className="stat-link">
              Xem
            </Link>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-content">
              <h3>Khách hàng</h3>
              <p>{stats.totalCustomers}</p>
            </div>
            <Link to={ROUTERS.ADMIN.CUSTOMERS} className="stat-link">
              Xem
            </Link>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>
            <div className="stat-content">
              <h3>Doanh thu</h3>
              <p>{formatPrice(stats.totalRevenue)}</p>
            </div>
            <Link to={ROUTERS.ADMIN.STATISTICS} className="stat-link">
              Chi tiết
            </Link>
          </div>
        </div>

        <div className="dashboard-sections">
          <div className="recent-orders">
            <div className="section-header">
              <h2>Đơn hàng gần đây</h2>
              <Link to={ROUTERS.ADMIN.ORDERS} className="view-all">
                Xem tất cả
              </Link>
            </div>

            <div className="orders-table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Mã đơn</th>
                    <th>Khách hàng</th>
                    <th>Ngày</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>{formatPrice(order.total)}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="top-selling-products">
            <div className="section-header">
              <h2>Sản phẩm bán chạy</h2>
              <Link to={ROUTERS.ADMIN.PRODUCTS} className="view-all">
                Xem tất cả
              </Link>
            </div>

            <div className="products-table-container">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Đã bán</th>
                    <th>Doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  {topSellingProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="product-info">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="product-thumbnail"
                          />
                          <span className="product-name">{product.name}</span>
                        </div>
                      </td>
                      <td>{product.sold}</td>
                      <td>{formatPrice(product.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Dashboard)

