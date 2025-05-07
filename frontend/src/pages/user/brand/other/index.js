"use client"

import { memo, useEffect, useState } from "react"
import "./style.scss"
import { Link } from "react-router-dom"
import { formatPrice } from "utils/formatter"

const OtherBrands = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Mô phỏng dữ liệu sản phẩm các thương hiệu khác với màu sắc đặc trưng
    const mockProducts = [
      {
        id: 501,
        name: "PUMA SLIPSTREAM GREEN",
        price: 2800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Puma",
        color: "Green/White",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 502,
        name: "PUMA SUEDE CLASSIC XXI",
        price: 2200000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Puma",
        color: "Black/White",
        sizes: [39, 40, 41, 42, 43],
        rating: 4,
      },
      {
        id: 503,
        name: "PUMA RS-X³ PUZZLE",
        price: 3200000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Puma",
        color: "Multicolor",
        sizes: [40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 504,
        name: "CONVERSE CHUCK TAYLOR ALL STAR",
        price: 1500000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Converse",
        color: "Black/White",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 505,
        name: "CONVERSE CHUCK 70",
        price: 2000000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Converse",
        color: "Parchment/Garnet/Egret",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 506,
        name: "CONVERSE RUN STAR HIKE",
        price: 2500000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Converse",
        color: "Black/White/Gum",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 507,
        name: "VANS OLD SKOOL",
        price: 1800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Vans",
        color: "Black/White",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 508,
        name: "VANS AUTHENTIC",
        price: 1500000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Vans",
        color: "Red",
        sizes: [39, 40, 41, 42, 43],
        rating: 4,
      },
      {
        id: 509,
        name: "VANS SK8-HI",
        price: 2100000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Vans",
        color: "Black/White",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 510,
        name: "NEW BALANCE 574",
        price: 2500000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "New Balance",
        color: "Grey/Navy",
        sizes: [40, 41, 42, 43, 44, 45],
        rating: 4,
      },
      {
        id: 511,
        name: "NEW BALANCE 990v5",
        price: 4500000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "New Balance",
        color: "Grey",
        sizes: [40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 512,
        name: "NEW BALANCE 327",
        price: 2800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "New Balance",
        color: "White/Orange",
        sizes: [40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 513,
        name: "ASICS GEL-KAYANO 28",
        price: 3800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Asics",
        color: "Black/White",
        sizes: [40, 41, 42, 43, 44, 45],
        rating: 5,
      },
      {
        id: 514,
        name: "ASICS GEL-NIMBUS 23",
        price: 4200000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Asics",
        color: "Blue/White",
        sizes: [40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 515,
        name: "REEBOK CLASSIC LEATHER",
        price: 2200000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Reebok",
        color: "White",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 516,
        name: "REEBOK CLUB C 85",
        price: 2000000,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Reebok",
        color: "White/Green",
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

    if (selectedBrand !== "all") {
      results = results.filter((product) => product.brand === selectedBrand)
    }

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
          product.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredProducts(results)
    setCurrentPage(1) // Reset về trang đầu tiên khi lọc
  }, [selectedBrand, selectedSize, selectedPrice, searchTerm, products])

  // Lấy danh sách các thương hiệu duy nhất
  const uniqueBrands = [...new Set(products.map((product) => product.brand))].sort()

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
    <div className="brand-page other-brands">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <span>Thương hiệu khác</span>
        </div>

        <div className="brand-header">
          <div className="brand-description">
            <h1>THƯƠNG HIỆU KHÁC</h1>
            <p>
              Khám phá bộ sưu tập giày từ các thương hiệu nổi tiếng khác như Puma, Converse, Vans, New Balance, Asics,
              Reebok và nhiều hãng khác. Mỗi thương hiệu đều mang đến những thiết kế độc đáo và công nghệ riêng biệt,
              đáp ứng nhu cầu đa dạng của người dùng từ thể thao chuyên nghiệp đến thời trang đường phố.
            </p>
          </div>
        </div>

        <div className="filter-bar">
          <div className="filter-item">
            <label htmlFor="brand-filter">Thương hiệu</label>
            <select id="brand-filter" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
              <option value="all">Tất cả</option>
              {uniqueBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

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
              placeholder="Tìm kiếm sản phẩm..."
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
                      <p className="product-brand">{product.brand}</p>
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

export default memo(OtherBrands)

