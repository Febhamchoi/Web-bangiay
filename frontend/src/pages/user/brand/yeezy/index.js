"use client"

import { memo, useEffect, useState } from "react"
import "./style.scss"
import { Link } from "react-router-dom"
import { formatPrice } from "utils/formatter"

const YeezyBrand = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Mô phỏng dữ liệu sản phẩm Yeezy với màu sắc đặc trưng
    const mockProducts = [
      {
        id: 401,
        name: "YEEZY BOOST 350 V2",
        price: 8500000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Yeezy",
        color: "Zebra/White/Black",
        sizes: [40, 41, 42, 43, 44, 45],
        rating: 5,
      },
      {
        id: 402,
        name: "YEEZY BOOST 700",
        price: 9200000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Yeezy",
        color: "Wave Runner/Grey/Blue",
        sizes: [40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 403,
        name: "YEEZY FOAM RUNNER",
        price: 6800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Yeezy",
        color: "Ararat/Cream White",
        sizes: [40, 41, 42, 43, 44, 45],
        rating: 4,
      },
      {
        id: 404,
        name: "YEEZY SLIDE",
        price: 3800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Yeezy",
        color: "Pure/Light Brown",
        sizes: [40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 405,
        name: "YEEZY 500",
        price: 7500000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Yeezy",
        color: "Blush/Light Pink",
        sizes: [40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 406,
        name: "YEEZY BOOST 380",
        price: 7900000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Yeezy",
        color: "Alien/Grey/Green",
        sizes: [40, 41, 42, 43, 44, 45],
        rating: 4,
      },
      {
        id: 407,
        name: "YEEZY BOOST 350",
        price: 7800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Yeezy",
        color: "Turtle Dove/Grey",
        sizes: [40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 408,
        name: "YEEZY BOOST 700 V2",
        price: 8800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Yeezy",
        color: "Static/Grey",
        sizes: [40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 409,
        name: "YEEZY 700 V3",
        price: 8200000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Yeezy",
        color: "Azael/White/Black",
        sizes: [40, 41, 42, 43, 44, 45],
        rating: 4,
      },
      {
        id: 410,
        name: "YEEZY BOOST 350 V2 CINDER",
        price: 8300000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Yeezy",
        color: "Cinder/Black",
        sizes: [40, 41, 42, 43, 44, 45],
        rating: 5,
      },
      {
        id: 411,
        name: "YEEZY BOOST 350 V2 BELUGA",
        price: 9500000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Yeezy",
        color: "Beluga/Grey/Orange",
        sizes: [40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 412,
        name: "YEEZY BOOST 350 V2 BRED",
        price: 9800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Yeezy",
        color: "Bred/Black/Red",
        sizes: [40, 41, 42, 43, 44, 45],
        rating: 5,
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
        case "under5m":
          results = results.filter((product) => product.price < 5000000)
          break
        case "5m-7m":
          results = results.filter((product) => product.price >= 5000000 && product.price <= 7000000)
          break
        case "7m-9m":
          results = results.filter((product) => product.price > 7000000 && product.price <= 9000000)
          break
        case "over9m":
          results = results.filter((product) => product.price > 9000000)
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
    <div className="brand-page yeezy-brand">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <span>Yeezy</span>
        </div>

        <div className="brand-header">
          <div className="brand-logo">
            <img src="/placeholder.svg?height=100&width=200" alt="Yeezy Logo" />
          </div>
          <div className="brand-description">
            <h1>YEEZY</h1>
            <p>
              Yeezy là một thương hiệu thời trang do rapper và nhà thiết kế Kanye West hợp tác với Adidas phát triển.
              Dòng giày Yeezy nổi tiếng với thiết kế độc đáo, phá cách và thường có giá bán cao trên thị trường thứ cấp.
              Các mẫu giày như Yeezy Boost 350, 700 và Foam Runner đã trở thành biểu tượng thời trang đường phố hiện
              đại.
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
              <option value="under5m">Dưới 5 triệu</option>
              <option value="5m-7m">5 - 7 triệu</option>
              <option value="7m-9m">7 - 9 triệu</option>
              <option value="over9m">Trên 9 triệu</option>
            </select>
          </div>

          <div className="filter-item search-box">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm Yeezy..."
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

export default memo(YeezyBrand)

