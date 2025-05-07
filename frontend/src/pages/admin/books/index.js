"use client"

import { memo, useState, useEffect } from "react"
import "./style.scss"
import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter } from "react-icons/fa"
import { Link } from "react-router-dom"
import { ROUTERS } from "utils/router"
import { formatPrice } from "utils/formatter"

const Books = () => {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [categories, setCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [booksPerPage] = useState(10)

  useEffect(() => {
    // Mô phỏng dữ liệu sách
    const mockBooks = [
      {
        id: 1,
        title: "Chú thuật hồi chiến - Tập 1",
        author: "Gege Akutami",
        category: "Manga",
        price: 30000,
        stock: 45,
        sold: 125,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 2,
        title: "Naruto - Quyển 20",
        author: "Masashi Kishimoto",
        category: "Manga",
        price: 21000,
        stock: 32,
        sold: 98,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 3,
        title: "One Piece - Tập 101",
        author: "Eiichiro Oda",
        category: "Manga",
        price: 23000,
        stock: 28,
        sold: 87,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 4,
        title: "Dám nghĩ lại",
        author: "Adam Grant",
        category: "Kỹ năng sống",
        price: 179600,
        stock: 15,
        sold: 76,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 5,
        title: "Thay đổi cuộc sống với nhân số học",
        author: "Lê Đỗ Quỳnh Hương",
        category: "Kỹ năng sống",
        price: 181400,
        stock: 20,
        sold: 65,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 6,
        title: "Thiền định mỗi ngày",
        author: "Christophe André",
        category: "Kỹ năng sống",
        price: 118000,
        stock: 18,
        sold: 54,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 7,
        title: "Shin - Cậu bé bút chì - Tập 1",
        author: "Yoshito Usui",
        category: "Manga",
        price: 19500,
        stock: 50,
        sold: 43,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 8,
        title: "Đội quân Doraemon - Tập 4",
        author: "Fujiko F. Fujio",
        category: "Manga",
        price: 19800,
        stock: 35,
        sold: 38,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 9,
        title: "Những ngày tết ta",
        author: "Nhiều tác giả",
        category: "Văn hóa",
        price: 81000,
        stock: 25,
        sold: 32,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 10,
        title: "Những người bạn từ trang sách",
        author: "Nhiều tác giả",
        category: "Tiểu thuyết",
        price: 85500,
        stock: 22,
        sold: 29,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 11,
        title: "Xe buýt dừa em đi",
        author: "Nguyễn Nhật Ánh",
        category: "Tiểu thuyết",
        price: 36000,
        stock: 30,
        sold: 27,
        image: "/placeholder.svg?height=60&width=40",
      },
      {
        id: 12,
        title: "Hạnh phúc và bản tính con người",
        author: "Nguyễn Văn Phú",
        category: "Tâm lý học",
        price: 98000,
        stock: 18,
        sold: 24,
        image: "/placeholder.svg?height=60&width=40",
      },
    ]

    setBooks(mockBooks)
    setFilteredBooks(mockBooks)

    // Lấy danh sách danh mục từ dữ liệu sách
    const uniqueCategories = [...new Set(mockBooks.map((book) => book.category))]
    setCategories(uniqueCategories)
  }, [])

  useEffect(() => {
    // Lọc sách dựa trên từ khóa tìm kiếm và danh mục
    let results = books

    if (searchTerm) {
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      results = results.filter((book) => book.category === selectedCategory)
    }

    setFilteredBooks(results)
    setCurrentPage(1) // Reset về trang đầu tiên khi lọc
  }, [searchTerm, selectedCategory, books])

  // Tính toán sách hiển thị trên trang hiện tại
  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook)

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleDeleteBook = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sách này?")) {
      const updatedBooks = books.filter((book) => book.id !== id)
      setBooks(updatedBooks)
      setFilteredBooks(updatedBooks)
    }
  }

  return (
    <div className="admin-books">
      <div className="admin-content">
        <div className="admin-header">
          <h1>Quản lý sách</h1>
          <Link to={ROUTERS.ADMIN.ADD_BOOK} className="add-book-btn">
            <FaPlus /> Thêm sách mới
          </Link>
        </div>

        <div className="filter-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên sách hoặc tác giả..."
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
        </div>

        <div className="books-table-container">
          <table className="books-table">
            <thead>
              <tr>
                <th>Sách</th>
                <th>Tác giả</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th>Tồn kho</th>
                <th>Đã bán</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-data">
                    Không tìm thấy sách nào
                  </td>
                </tr>
              ) : (
                currentBooks.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <div className="book-info">
                        <img src={book.image || "/placeholder.svg"} alt={book.title} className="book-thumbnail" />
                        <span className="book-title">{book.title}</span>
                      </div>
                    </td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{formatPrice(book.price)}</td>
                    <td>{book.stock}</td>
                    <td>{book.sold}</td>
                    <td className="action-buttons">
                      <Link to={`${ROUTERS.ADMIN.ADD_BOOK}?id=${book.id}`} className="edit-button" title="Chỉnh sửa">
                        <FaEdit />
                      </Link>
                      <button className="delete-button" onClick={() => handleDeleteBook(book.id)} title="Xóa">
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
        {filteredBooks.length > booksPerPage && (
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, i) => (
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

export default memo(Books)

