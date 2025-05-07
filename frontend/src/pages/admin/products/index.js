"use client"

import { memo, useState, useEffect } from "react"
import "./style.scss"
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter } from "react-icons/fa"
import { Link } from "react-router-dom"
import { ROUTERS } from "utils/router"
import { formatPrice } from "utils/formatter"

const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(10)

  useEffect(() => {
    // Mô phỏng dữ liệu sản phẩm
    const mockProducts = [
      {
        id: 1,
        name: "AIR FORCE 1",
        brand: "Nike",
        category: "Sneakers",
        price: 3800000,
        stock: 45,
        sold: 125,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 2,
        name: "NIKE PEGASUS TRAIL 4",
        brand: "Nike",
        category: "Running",
        price: 3600000,
        stock: 32,
        sold: 98,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 3,
        name: "ADIDAS GRADAS CLOUD WHITE",
        brand: "Adidas",
        category: "Sneakers",
        price: 3600000,
        stock: 28,
        sold: 87,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 4,
        name: "PUMA SLIPSTREAM GREEN",
        brand: "Puma",
        category: "Casual",
        price: 2800000,
        stock: 15,
        sold: 76,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 5,
        name: "AIR FORCE 2",
        brand: "Nike",
        category: "Sneakers",
        price: 16800000,
        stock: 20,
        sold: 65,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 6,
        name: "JUDGMENT SHIRT",
        brand: "Nike",
        category: "Casual",
        price: 280000,
        stock: 18,
        sold: 54,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 7,
        name: "DOBERMAN SHIRT",
        brand: "Adidas",
        category: "Casual",
        price: 350000,
        stock: 50,
        sold: 43,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 8,
        name: "GANGSTA SHIRT",
        brand: "Puma",
        category: "Casual",
        price: 275000,
        stock: 35,
        sold: 38,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 9,
        name: "SIREN SHIRT",
        brand: "Nike",
        category: "Casual",
        price: 320000,
        stock: 25,
        sold: 32,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 10,
        name: "MND BANDANA",
        brand: "Adidas",
        category: "Accessories",
        price: 320000,
        stock: 22,
        sold: 29,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 11,
        name: "MENDE STUDIO SHIRT",
        brand: "Nike",
        category: "Casual",
        price: 320000,
        stock: 30,
        sold: 27,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 12,
        name: "M SIGNATURE SHIRT",
        brand: "Puma",
        category: "Casual",
        price: 320000,
        stock: 18,
        sold: 24,
        image: "/placeholder.svg?height=60&width=40",
      },
    ]

    setProducts(mockProducts)
    setFilteredProducts(mockProducts)

    // Lấy danh sách danh mục từ dữ liệu sản phẩm
    const uniqueCategories = [...new Set(mockProducts.map((product) => product.category))]
    setCategories(uniqueCategories)

    // Lấy danh sách thương hiệu từ dữ liệu sản phẩm
    const uniqueBrands = [...new Set(mockProducts.map((product) => product.brand))]
    setBrands(uniqueBrands)
  }, [])

  useEffect(() => {
    // Lọc sản phẩm dựa trên từ khóa tìm kiếm, danh mục và thương hiệu
    let results = products

    if (searchTerm) {
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      results = results.filter((product) => product.category === selectedCategory)
    }

    if (selectedBrand !== "all") {
      results = results.filter((product) => product.brand === selectedBrand)
    }

    setFilteredProducts(results)
    setCurrentPage(1) // Reset về trang đầu tiên khi lọc
  }, [searchTerm, selectedCategory, selectedBrand, products])

  // Tính toán sản phẩm hiển thị trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleDeleteProduct = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      const updatedProducts = products.filter((product) => product.id !== id)
      setProducts(updatedProducts)
      setFilteredProducts(updatedProducts)
    }
  }

  return (
    <div className="admin-products">
      <div className="admin-content">
        <div className="admin-header">
          <h1>Quản lý sản phẩm</h1>
          <Link to={ROUTERS.ADMIN.ADD_PRODUCT} className="add-product-btn">
            <FaPlus /> Thêm sản phẩm mới
          </Link>
        </div>

        <div className="filter-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên sản phẩm hoặc thương hiệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filter">
            <FaFilter className="filter-icon" />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="all">Tất cả danh mục</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="brand-filter">
            <FaFilter className="filter-icon" />
            <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
              <option value="all">Tất cả thương hiệu</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Thương hiệu</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th>Tồn kho</th>
                <th>Đã bán</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-data">
                    Không tìm thấy sản phẩm nào
                  </td>
                </tr>
              ) : (
                currentProducts.map((product) => (
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
                    <td>{product.brand}</td>
                    <td>{product.category}</td>
                    <td>{formatPrice(product.price)}</td>
                    <td>{product.stock}</td>
                    <td>{product.sold}</td>
                    <td className="action-buttons">
                      <Link
                        to={`${ROUTERS.ADMIN.ADD_PRODUCT}?id=${product.id}`}
                        className="edit-button"
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </Link>
                      <button className="delete-button" onClick={() => handleDeleteProduct(product.id)} title="Xóa">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        {filteredProducts.length > productsPerPage && (
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
              <button
                key={i}
                className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(Products)

