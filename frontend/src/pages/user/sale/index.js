"use client"

import { memo, useEffect, useState } from "react"
import "./style.scss"
import { Link } from "react-router-dom"
import { formatPrice } from "utils/formatter"

const Sale = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedDiscount, setSelectedDiscount] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Mô phỏng dữ liệu sản phẩm giảm giá
    const mockProducts = [
      {
        id: 601,
        name: "NIKE AIR FORCE 1 '07",
        price: 2800000,
        originalPrice: 3200000,
        discount: 13,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Nike",
        color: "White/White",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 602,
        name: "NIKE DUNK LOW RETRO",
        price: 2300000,
        originalPrice: 2900000,
        discount: 21,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Nike",
        color: "Black/White",
        sizes: [39, 40, 41, 42, 43],
        rating: 4,
      },
      {
        id: 603,
        name: "ADIDAS SUPERSTAR",
        price: 1900000,
        originalPrice: 2500000,
        discount: 24,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Adidas",
        color: "Cloud White/Core Black",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 604,
        name: "ADIDAS STAN SMITH",
        price: 1800000,
        originalPrice: 2300000,
        discount: 22,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Adidas",
        color: "Cloud White/Green",
        sizes: [39, 40, 41, 42, 43],
        rating: 4,
      },
      {
        id: 605,
        name: "PUMA SLIPSTREAM GREEN",
        price: 2100000,
        originalPrice: 2800000,
        discount: 25,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Puma",
        color: "Green/White",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 606,
        name: "PUMA SUEDE CLASSIC XXI",
        price: 1700000,
        originalPrice: 2200000,
        discount: 23,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Puma",
        color: "Black/White",
        sizes: [39, 40, 41, 42, 43],
        rating: 4,
      },
      {
        id: 607,
        name: "CONVERSE CHUCK TAYLOR ALL STAR",
        price: 1200000,
        originalPrice: 1500000,
        discount: 20,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Converse",
        color: "Black/White",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 608,
        name: "VANS OLD SKOOL",
        price: 1400000,
        originalPrice: 1800000,
        discount: 22,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Vans",
        color: "Black/White",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 5,
      },
      {
        id: 609,
        name: "NEW BALANCE 574",
        price: 1900000,
        originalPrice: 2500000,
        discount: 24,
        image: "/placeholder.svg?height=300&width=300",
        brand: "New Balance",
        color: "Grey/Navy",
        sizes: [40, 41, 42, 43, 44, 45],
        rating: 4,
      },
      {
        id: 610,
        name: "JORDAN 1 MID",
        price: 2600000,
        originalPrice: 3200000,
        discount: 19,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Jordan",
        color: "Royal Blue/White",
        sizes: [39, 40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 611,
        name: "YEEZY SLIDE",
        price: 3000000,
        originalPrice: 3800000,
        discount: 21,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Yeezy",
        color: "Pure/Light Brown",
        sizes: [40, 41, 42, 43, 44],
        rating: 4,
      },
      {
        id: 612,
        name: "REEBOK CLASSIC LEATHER",
        price: 1700000,
        originalPrice: 2200000,
        discount: 23,
        image: "/placeholder.svg?height=300&width=300",
        brand: "Reebok",
        color: "White",
        sizes: [39, 40, 41, 42, 43, 44],
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

    if (selectedDiscount !== "all") {
      switch (selectedDiscount) {
        case "under20":
          results = results.filter((product) => product.discount < 20)
          break
        case "20-25":
          results = results.filter((product) => product.discount >= 20 && product.discount <= 25)
          break
        case "over25":
          results = results.filter((product) => product.discount > 25)
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
  }, [selectedBrand, selectedSize, selectedDiscount, searchTerm, products])

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
    <div className="sale-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <span>Sale</span>
        </div>

        <div className="sale-header">
          <div className="sale-banner">
            <img src="/placeholder.svg?height=300&width=1200" alt="Sale Banner" />
          </div>
          <div className="sale-description">
            <h1>KHUYẾN MÃI</h1>
            <p>
              Khám phá bộ sưu tập giày giảm giá hấp dẫn từ các thương hiệu nổi tiếng. Cơ hội để sở hữu những đôi giày
              chất lượng với mức giá ưu đãi nhất. Số lượng có hạn, nhanh tay chọn ngay cho mình một đôi giày ưng ý!
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
            <label htmlFor="discount-filter">Mức giảm giá</label>
            <select id="discount-filter" value={selectedDiscount} onChange={(e) => setSelectedDiscount(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="under20">Dưới 20%</option>
              <option value="20-25">20% - 25%</option>
              <option value="over25">Trên 25%</option>
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

        <div className="sale-content">
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
                      <span className="discount-badge">-{product.discount}%</span>
                      <img src={product.image || "/placeholder.svg"} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-brand">{product.brand}</p>
                      <p className="product-color">{product.color}</p>
                      <div className="product-rating">{renderStars(product.rating)}</div>
                      <div className="product-price-container">
                        <p className="product-price">{formatPrice(product.price)}</p>
                        <p className="product-original-price">{formatPrice(product.originalPrice)}</p>
                      </div>
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

export default memo(Sale)

