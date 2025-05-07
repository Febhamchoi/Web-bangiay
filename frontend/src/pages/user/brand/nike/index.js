"use client"

import { memo, useEffect, useState } from "react"
import "./style.scss"
import { Link } from "react-router-dom"
import { formatPrice } from "utils/formatter"

const NikeBrand = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Mô phỏng dữ liệu sản phẩm Nike với màu sắc đặc trưng
    const mockProducts = [
      {
        id: 101,
        name: "NIKE AIR FORCE 1 '07",
        price: 3200000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Nike",
        color: "White/White",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 102,
        name: "NIKE DUNK LOW RETRO",
        price: 2900000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Nike",
        color: "Black/White",
        sizes: [39, 40, 41, 42, 43],
        rating: 4,
      },
      {
        id: 103,
        name: "NIKE AIR MAX 90",
        price: 3800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Nike",
        color: "Infrared/White",
        sizes: [40, 41, 42, 43, 44, 45],
        rating: 5,
      },
      {
        id: 104,
        name: "NIKE BLAZER MID '77 VINTAGE",
        price: 2800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Nike",
        color: "White/Black",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 105,
        name: "NIKE AIR JORDAN 1 LOW",
        price: 3500000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Nike",
        color: "University Blue/White",
        sizes: [40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 106,
        name: "NIKE AIR MAX 270",
        price: 4200000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Nike",
        color: "Black/Anthracite",
        sizes: [39, 40, 41, 42, 43, 44, 45],
        rating: 4,
      },
      {
        id: 107,
        name: "NIKE REACT INFINITY RUN FLYKNIT",
        price: 4500000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Nike",
        color: "Bright Crimson/Black",
        sizes: [40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 108,
        name: "NIKE AIR VAPORMAX 2021 FK",
        price: 5500000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Nike",
        color: "Pure Platinum/White",
        sizes: [40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 109,
        name: "NIKE PEGASUS TRAIL 4",
        price: 3600000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Nike",
        color: "Green/Black",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 110,
        name: "NIKE QUEST 5",
        price: 2500000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Nike",
        color: "Black/White",
        sizes: [39, 40, 41, 42, 43, 44, 45],
        rating: 4,
      },
      {
        id: 111,
        name: "NIKE REVOLUTION 6",
        price: 1900000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Nike",
        color: "Black/Dark Smoke Grey",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 112,
        name: "NIKE SB CHRON 2 CANVAS",
        price: 1800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Nike",
        color: "Black/White",
        sizes: [39, 40, 41, 42, 43],
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
        case "under2m":
          results = results.filter((product) => product.price < 2000000)
          break
        case "2m-3m":
          results = results.filter((product) => product.price >= 2000000 && product.price <= 3000000)
          break
        case "3m-4m":
          results = results.filter((product) => product.price > 3000000 && product.price <= 4000000)
          break
        case "over4m":
          results = results.filter((product) => product.price > 4000000)
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
    <div className="brand-page nike-brand">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <span>Nike</span>
        </div>

        <div className="brand-header">
          <div className="brand-logo">
            <img src="/placeholder.svg?height=100&width=200" alt="Nike Logo" />
          </div>
          <div className="brand-description">
            <h1>NIKE</h1>
            <p>
              Nike, Inc. là một tập đoàn đa quốc gia của Mỹ hoạt động trong lĩnh vực thiết kế, phát triển, sản xuất,
              tiếp thị và bán các loại giày dép, quần áo, thiết bị, phụ kiện và dịch vụ trên toàn thế giới. Với slogan
              "Just Do It" và biểu tượng Swoosh nổi tiếng, Nike đã trở thành một trong những thương hiệu thể thao được
              công nhận rộng rãi nhất trên thế giới.
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
              <option value="under2m">Dưới 2 triệu</option>
              <option value="2m-3m">2 - 3 triệu</option>
              <option value="3m-4m">3 - 4 triệu</option>
              <option value="over4m">Trên 4 triệu</option>
            </select>
          </div>

          <div className="filter-item search-box">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm Nike..."
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

export default memo(NikeBrand)

