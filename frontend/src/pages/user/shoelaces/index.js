"use client"

import { memo, useEffect, useState } from "react"
import "./style.scss"
import { Link } from "react-router-dom"
import { formatPrice } from "utils/formatter"

const Shoelaces = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedColor, setSelectedColor] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Mô phỏng dữ liệu sản phẩm dây giày
    const mockProducts = [
      {
        id: 701,
        name: "DÂY GIÀY FLAT ĐEN",
        price: 90000,
        image: "/placeholder.svg?height=300&width=300",
        color: "Đen",
        length: "120cm",
        material: "Cotton",
        rating: 5,
      },
      {
        id: 702,
        name: "DÂY GIÀY FLAT TRẮNG",
        price: 90000,
        image: "/placeholder.svg?height=300&width=300",
        color: "Trắng",
        length: "120cm",
        material: "Cotton",
        rating: 5,
      },
      {
        id: 703,
        name: "DÂY GIÀY OVAL ĐEN",
        price: 110000,
        image: "/placeholder.svg?height=300&width=300",
        color: "Đen",
        length: "120cm",
        material: "Polyester",
        rating: 4,
      },
      {
        id: 704,
        name: "DÂY GIÀY OVAL TRẮNG",
        price: 110000,
        image: "/placeholder.svg?height=300&width=300",
        color: "Trắng",
        length: "120cm",
        material: "Polyester",
        rating: 4,
      },
      {
        id: 705,
        name: "DÂY GIÀY PHẢN QUANG",
        price: 150000,
        image: "/placeholder.svg?height=300&width=300",
        color: "Xám",
        length: "120cm",
        material: "Polyester phản quang",
        rating: 5,
      },
      {
        id: 706,
        name: "DÂY GIÀY JORDAN 1 ĐỎ",
        price: 120000,
        image: "/placeholder.svg?height=300&width=300",
        color: "Đỏ",
        length: "160cm",
        material: "Cotton cao cấp",
        rating: 5,
      },
      {
        id: 707,
        name: "DÂY GIÀY JORDAN 1 XANH",
        price: 120000,
        image: "/placeholder.svg?height=300&width=300",
        color: "Xanh",
        length: "160cm",
        material: "Cotton cao cấp",
        rating: 5,
      },
      {
        id: 708,
        name: "DÂY GIÀY NIKE SB DUNK",
        price: 130000,
        image: "/placeholder.svg?height=300&width=300",
        color: "Đen/Trắng",
        length: "140cm",
        material: "Cotton cao cấp",
        rating: 4,
      },
      {
        id: 709,
        name: "DÂY GIÀY YEEZY 350",
        price: 180000,
        image: "/placeholder.svg?height=300&width=300",
        color: "Xám",
        length: "140cm",
        material: "Polyester đặc biệt",
        rating: 5,
      },
      {
        id: 710,
        name: "DÂY GIÀY ADIDAS SUPERSTAR",
        price: 100000,
        image: "/placeholder.svg?height=300&width=300",
        color: "Trắng",
        length: "120cm",
        material: "Cotton",
        rating: 4,
      },
      {
        id: 711,
        name: "DÂY GIÀY CONVERSE CHUCK TAYLOR",
        price: 95000,
        image: "/placeholder.svg?height=300&width=300",
        color: "Đen",
        length: "140cm",
        material: "Cotton",
        rating: 4,
      },
      {
        id: 712,
        name: "DÂY GIÀY VANS OLD SKOOL",
        price: 95000,
        image: "/placeholder.svg?height=300&width=300",
        color: "Đen/Trắng",
        length: "120cm",
        material: "Cotton",
        rating: 4,
      },
    ]

    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
  }, [])

  useEffect(() => {
    // Lọc sản phẩm dựa trên các bộ lọc
    let results = products

    if (selectedColor !== "all") {
      results = results.filter((product) => product.color.toLowerCase().includes(selectedColor.toLowerCase()))
    }

    if (selectedPrice !== "all") {
      switch (selectedPrice) {
        case "under100":
          results = results.filter((product) => product.price < 100000)
          break
        case "100-130":
          results = results.filter((product) => product.price >= 100000 && product.price <= 130000)
          break
        case "over130":
          results = results.filter((product) => product.price > 130000)
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
          product.material.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredProducts(results)
    setCurrentPage(1) // Reset về trang đầu tiên khi lọc
  }, [selectedColor, selectedPrice, searchTerm, products])

  // Lấy danh sách các màu duy nhất
  const uniqueColors = [
    ...new Set(
      products.map((product) => {
        // Xử lý màu kết hợp như "Đen/Trắng"
        if (product.color.includes("/")) {
          return product.color.split("/")[0]
        }
        return product.color
      }),
    ),
  ].sort()

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
    <div className="shoelaces-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link> &gt; <span>Dây Giày</span>
        </div>

        <div className="shoelaces-header">
          <div className="shoelaces-banner">
            <img src="/placeholder.svg?height=200&width=1200" alt="Shoelaces Banner" />
          </div>
          <div className="shoelaces-description">
            <h1>DÂY GIÀY</h1>
            <p>
              Bộ sưu tập dây giày chất lượng cao với nhiều màu sắc và kiểu dáng khác nhau, phù hợp với mọi loại giày.
              Dây giày của chúng tôi được làm từ các chất liệu bền bỉ, đảm bảo độ bền và thoải mái khi sử dụng. Thay đổi
              diện mạo đôi giày của bạn với những sợi dây mới!
            </p>
          </div>
        </div>

        <div className="filter-bar">
          <div className="filter-item">
            <label htmlFor="color-filter">Màu sắc</label>
            <select id="color-filter" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
              <option value="all">Tất cả</option>
              {uniqueColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="price-filter">Giá</label>
            <select id="price-filter" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="under100">Dưới 100.000đ</option>
              <option value="100-130">100.000đ - 130.000đ</option>
              <option value="over130">Trên 130.000đ</option>
            </select>
          </div>

          <div className="filter-item search-box">
            <input
              type="text"
              placeholder="Tìm kiếm dây giày..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">Tìm Kiếm</button>
          </div>
        </div>

        <div className="shoelaces-content">
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
                      <p className="product-specs">
                        {product.color} | {product.length} | {product.material}
                      </p>
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

export default memo(Shoelaces)

