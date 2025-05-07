"use client"

import { memo, useEffect, useState } from "react"
import "./style.scss"
import { Link } from "react-router-dom"
import { formatPrice } from "utils/formatter"

const Shop = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Mô phỏng dữ liệu thương hiệu
    const mockBrands = [
      { id: 1, name: "Nike" },
      { id: 2, name: "Adidas" },
      { id: 3, name: "Jordan" },
      { id: 4, name: "Yeezy" },
      { id: 5, name: "Puma" },
      { id: 6, name: "Converse" },
    ]

    // Mô phỏng dữ liệu sản phẩm
    const mockProducts = Array(24)
      .fill(0)
      .map((_, index) => ({
        id: index + 1,
        name: `AIR FORCE ${index % 2 === 0 ? "1" : "2"}`,
        price: index % 2 === 0 ? 3800000 : 16800000,
        image: "/placeholder.svg?height=300&width=300",
        brand: mockBrands[index % mockBrands.length].name,
        sizes: [39, 40, 41, 42, 43, 44],
        rating: Math.floor(Math.random() * 2) + 4, // Random rating between 4-5
      }))

    setBrands(mockBrands)
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
        case "2m-5m":
          results = results.filter((product) => product.price >= 2000000 && product.price <= 5000000)
          break
        case "5m-10m":
          results = results.filter((product) => product.price > 5000000 && product.price <= 10000000)
          break
        case "over10m":
          results = results.filter((product) => product.price > 10000000)
          break
        default:
          break
      }
    }

    if (searchTerm) {
      results = results.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    setFilteredProducts(results)
    setCurrentPage(1) // Reset về trang đầu tiên khi lọc
  }, [selectedBrand, selectedSize, selectedPrice, searchTerm, products])

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
    <div className="shop-page">
      <div className="container">
        <div className="shop-header">
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
              <label htmlFor="brand-filter">Thương hiệu</label>
              <select id="brand-filter" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                <option value="all">Tất cả</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-item">
              <label htmlFor="price-filter">Giá thấp đến cao</label>
              <select id="price-filter" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
                <option value="all">Tất cả</option>
                <option value="under2m">Dưới 2 triệu</option>
                <option value="2m-5m">2 - 5 triệu</option>
                <option value="5m-10m">5 - 10 triệu</option>
                <option value="over10m">Trên 10 triệu</option>
              </select>
            </div>

            <div className="filter-item search-box">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-button">Tìm Giày Ngay</button>
            </div>
          </div>
        </div>

        <div className="shop-content">
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

export default memo(Shop)

