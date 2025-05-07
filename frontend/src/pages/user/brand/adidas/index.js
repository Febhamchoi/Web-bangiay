"use client"

import { memo, useEffect, useState } from "react"
import "./style.scss"
import { Link } from "react-router-dom"
import { formatPrice } from "utils/formatter"

const AdidasBrand = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Mô phỏng dữ liệu sản phẩm Adidas với màu sắc đặc trưng
    const mockProducts = [
      {
        id: 201,
        name: "ADIDAS SUPERSTAR",
        price: 2500000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Adidas",
        color: "Cloud White/Core Black",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 202,
        name: "ADIDAS STAN SMITH",
        price: 2300000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Adidas",
        color: "Cloud White/Green",
        sizes: [39, 40, 41, 42, 43],
        rating: 4,
      },
      {
        id: 203,
        name: "ADIDAS ULTRABOOST 22",
        price: 4800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Adidas",
        color: "Core Black/Core Black",
        sizes: [40, 41, 42, 43, 44, 45],
        rating: 5,
      },
      {
        id: 204,
        name: "ADIDAS NMD_R1",
        price: 3600000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Adidas",
        color: "Grey/Solar Red",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 205,
        name: "ADIDAS FORUM LOW",
        price: 2800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Adidas",
        color: "Cloud White/Blue",
        sizes: [40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 206,
        name: "ADIDAS OZWEEGO",
        price: 3200000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Adidas",
        color: "Grey/Solar Yellow",
        sizes: [39, 40, 41, 42, 43, 44, 45],
        rating: 4,
      },
      {
        id: 207,
        name: "ADIDAS GAZELLE",
        price: 2600000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Adidas",
        color: "Blue/Cloud White",
        sizes: [40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 208,
        name: "ADIDAS 4DFWD",
        price: 5500000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Adidas",
        color: "Core Black/Carbon",
        sizes: [40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 209,
        name: "ADIDAS GRADAS CLOUD WHITE",
        price: 3600000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Adidas",
        color: "Cloud White/Silver Metallic",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 210,
        name: "ADIDAS SAMBA OG",
        price: 2900000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Adidas",
        color: "Core Black/Cloud White",
        sizes: [39, 40, 41, 42, 43, 44, 45],
        rating: 4,
      },
      {
        id: 211,
        name: "ADIDAS CONTINENTAL 80",
        price: 2400000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Adidas",
        color: "Off White/Scarlet",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 212,
        name: "ADIDAS ZX 2K BOOST",
        price: 3800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Adidas",
        color: "Cloud White/Grey",
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
    <div className="brand-page adidas-brand">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <span>Adidas</span>
        </div>

        <div className="brand-header">
          <div className="brand-logo">
            <img src="/placeholder.svg?height=100&width=200" alt="Adidas Logo" />
          </div>
          <div className="brand-description">
            <h1>ADIDAS</h1>
            <p>
              Adidas AG là một công ty đa quốc gia của Đức chuyên thiết kế và sản xuất giày dép, quần áo và phụ kiện.
              Đây là nhà sản xuất đồ thể thao lớn thứ hai trên thế giới. Adidas nổi tiếng với thiết kế ba sọc đặc trưng
              và đã tạo ra nhiều mẫu giày mang tính biểu tượng như Superstar, Stan Smith và Ultraboost.
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
              placeholder="Tìm kiếm sản phẩm Adidas..."
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

export default memo(AdidasBrand)

