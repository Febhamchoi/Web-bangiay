"use client"

import { memo, useEffect, useState } from "react"
import "./style.scss"
import { Link } from "react-router-dom"
import { formatPrice } from "utils/formatter"

const JordanBrand = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Mô phỏng dữ liệu sản phẩm Jordan với màu sắc đặc trưng
    const mockProducts = [
      {
        id: 301,
        name: "AIR JORDAN 1 HIGH OG",
        price: 4500000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Jordan",
        color: "Chicago/Red/White",
        sizes: [40, 41, 42, 43, 44, 45],
        rating: 5,
      },
      {
        id: 302,
        name: "AIR JORDAN 4 RETRO",
        price: 5200000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Jordan",
        color: "Bred/Black/Red",
        sizes: [40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 303,
        name: "AIR JORDAN 11 RETRO",
        price: 5800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Jordan",
        color: "Concord/White/Black",
        sizes: [40, 41, 42, 43, 44, 45],
        rating: 5,
      },
      {
        id: 304,
        name: "AIR JORDAN 3 RETRO",
        price: 4800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Jordan",
        color: "White Cement/Grey",
        sizes: [40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 305,
        name: "AIR JORDAN 6 RETRO",
        price: 5000000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Jordan",
        color: "Infrared/Black",
        sizes: [40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 306,
        name: "AIR JORDAN 5 RETRO",
        price: 4900000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Jordan",
        color: "Fire Red/White",
        sizes: [40, 41, 42, 43, 44, 45],
        rating: 4,
      },
      {
        id: 307,
        name: "AIR JORDAN 12 RETRO",
        price: 5500000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Jordan",
        color: "Flu Game/Black/Red",
        sizes: [40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 308,
        name: "AIR JORDAN 13 RETRO",
        price: 5300000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Jordan",
        color: "Bred/Black/Red",
        sizes: [40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 309,
        name: "AIR JORDAN 1 MID",
        price: 3200000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Jordan",
        color: "Royal Blue/White",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 310,
        name: "AIR JORDAN 1 LOW",
        price: 2900000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Jordan",
        color: "Shadow/Grey/Black",
        sizes: [39, 40, 41, 42, 43, 44, 45],
        rating: 4,
      },
      {
        id: 311,
        name: "JORDAN DELTA 2",
        price: 3800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Jordan",
        color: "Black/University Red",
        sizes: [40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 312,
        name: "JORDAN WHY NOT ZERO.4",
        price: 3600000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Jordan",
        color: "Bred/Black/Red",
        sizes: [40, 41, 42, 43, 44, 45],
        rating: 4,
      },
    ]

    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
  }, [])

  useEffect(() => {
    // Lọc sản phẩm dựa trên các bộ lọc
    let results = products

    if (selectedSize !== "all") {
      results = results.filter((product) => product.sizes.includes(Number(selectedSize)))
    }

    if (selectedPrice !== "all") {
      switch (selectedPrice) {
        case "under3m":
          results = results.filter((product) => product.price < 3000000)
          break
        case "3m-4m":
          results = results.filter((product) => product.price >= 3000000 && product.price <= 4000000)
          break
        case "4m-5m":
          results = results.filter((product) => product.price > 4000000 && product.price <= 5000000)
          break
        case "over5m":
          results = results.filter((product) => product.price > 5000000)
          break
        default:
          break
      }
    }

    if (searchTerm) {
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.color.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredProducts(results)
    setCurrentPage(1) // Reset về trang đầu tiên khi lọc
  }, [selectedSize, selectedPrice, searchTerm, products])

  // Tính toán sản phẩm hiển thị trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
          ★
        </span>
      ))
  }

  return (
    <div className="brand-page jordan-brand">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <span>Jordan</span>
        </div>

        <div className="brand-header">
          <div className="brand-logo">
            <img src="/placeholder.svg?height=100&width=200" alt="Jordan Logo" />
          </div>
          <div className="brand-description">
            <h1>JORDAN</h1>
            <p>
              Jordan Brand là một thương hiệu giày dép, quần áo và phụ kiện thể thao thuộc sở hữu của Nike, được đặt
              theo tên của cựu vận động viên bóng rổ Michael Jordan. Thương hiệu này nổi tiếng với dòng giày Air Jordan,
              ra mắt lần đầu vào năm 1984 và đã trở thành một trong những dòng giày thể thao mang tính biểu tượng nhất
              mọi thời đại.
            </p>
          </div>
        </div>

        <div className="filter-bar">
          <div className="filter-item">
            <label htmlFor="size-filter">Chọn Size Giày</label>
            <select id="size-filter" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
              <option value="all">Tất cả</option>
              {[39, 40, 41, 42, 43, 44, 45].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="price-filter">Giá</label>
            <select id="price-filter" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="under3m">Dưới 3 triệu</option>
              <option value="3m-4m">3 - 4 triệu</option>
              <option value="4m-5m">4 - 5 triệu</option>
              <option value="over5m">Trên 5 triệu</option>
            </select>
          </div>

          <div className="filter-item search-box">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm Jordan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">Tìm Kiếm</button>
          </div>
        </div>

        <div className="brand-content">
          {currentProducts.length === 0 ? (
            <div className="no-products">
              <h2>Không tìm thấy sản phẩm nào</h2>
              <p>Vui lòng thử lại với bộ lọc khác</p>
            </div>
          ) : (
            <div className="products-grid">
              {currentProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <Link to={`/san-pham/${product.id}`}>
                    <div className="product-image">
                      <img src={product.image || "/placeholder.svg"} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-color">{product.color}</p>
                      <div className="product-rating">{renderStars(product.rating)}</div>
                      <p className="product-price">{formatPrice(product.price)}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Phân trang */}
          {filteredProducts.length > productsPerPage && (
            <div className="pagination">
              <button
                className="page-button prev"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                «
              </button>
              {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
                <button
                  key={i}
                  className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="page-button next"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
              >
                »
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(JordanBrand)

