"use client"

import { memo, useState, useEffect } from "react"
import "./style.scss"
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ROUTERS } from "utils/router"

const AddBook = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const bookId = queryParams.get("id")
  const isEditMode = !!bookId

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    originalPrice: "",
    stock: "",
    description: "",
    dimensions: "",
    pages: "",
    weight: "",
    format: "Bìa mềm",
    series: "",
    image: null,
    imagePreview: null,
  })

  const [categories, setCategories] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // Lấy danh sách danh mục
    const mockCategories = ["Manga", "Tiểu thuyết", "Kỹ năng sống", "Tâm lý học", "Văn hóa", "Kinh tế"]
    setCategories(mockCategories)

    // Nếu là chế độ chỉnh sửa, lấy thông tin sách
    if (isEditMode) {
      // Mô phỏng lấy dữ liệu sách từ API
      const mockBooks = [
        {
          id: 1,
          title: "Chú thuật hồi chiến - Tập 1",
          author: "Gege Akutami",
          category: "Manga",
          price: 30000,
          originalPrice: 35000,
          stock: 45,
          description:
            "Itadori Yuji là một học sinh cấp Ba sở hữu năng lực thể chất phi thường. Hàng ngày cậu thường tới bệnh viện chăm sóc ông nội đang ốm liệt giường. Nhưng một ngày nọ, phong ấn của vật thể bị nguyền mà trường cậu đang bảo quản bị phá vỡ, quái vật xuất hiện. Để cứu hai anh chị khóa trên đang gặp nguy hiểm, Itadori đã nuốt vật thể bị nguyền và trở thành chủ nhân của Sukuna, Vua của các nguyền! Số phận của Itadori từ đây sẽ ra sao!?",
          dimensions: "11.3 x 17.6 cm",
          pages: 192,
          weight: "140 gram",
          format: "Bìa mềm",
          series: "Chú thuật hồi chiến",
          image: "/placeholder.svg?height=300&width=200",
        },
      ]

      const book = mockBooks.find((book) => book.id === Number.parseInt(bookId))
      if (book) {
        setBookData({
          ...book,
          price: book.price.toString(),
          originalPrice: book.originalPrice.toString(),
          stock: book.stock.toString(),
          pages: book.pages.toString(),
          imagePreview: book.image,
        })
      }
    }
  }, [isEditMode, bookId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setBookData({
      ...bookData,
      [name]: value,
    })

    // Xóa lỗi khi người dùng nhập lại
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBookData({
        ...bookData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!bookData.title.trim()) {
      newErrors.title = "Vui lòng nhập tên sách"
    }

    if (!bookData.author.trim()) {
      newErrors.author = "Vui lòng nhập tên tác giả"
    }

    if (!bookData.category) {
      newErrors.category = "Vui lòng chọn danh mục"
    }

    if (!bookData.price.trim()) {
      newErrors.price = "Vui lòng nhập giá bán"
    } else if (isNaN(bookData.price) || Number.parseFloat(bookData.price) <= 0) {
      newErrors.price = "Giá bán phải là số dương"
    }

    if (
      bookData.originalPrice.trim() &&
      (isNaN(bookData.originalPrice) || Number.parseFloat(bookData.originalPrice) <= 0)
    ) {
      newErrors.originalPrice = "Giá gốc phải là số dương"
    }

    if (!bookData.stock.trim()) {
      newErrors.stock = "Vui lòng nhập số lượng tồn kho"
    } else if (isNaN(bookData.stock) || Number.parseInt(bookData.stock) < 0) {
      newErrors.stock = "Số lượng tồn kho phải là số không âm"
    }

    if (!bookData.description.trim()) {
      newErrors.description = "Vui lòng nhập mô tả sách"
    }

    if (!isEditMode && !bookData.image) {
      newErrors.image = "Vui lòng chọn hình ảnh sách"
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Mô phỏng lưu dữ liệu
    if (isEditMode) {
      alert("Cập nhật sách thành công!")
    } else {
      alert("Thêm sách mới thành công!")
    }

    navigate(ROUTERS.ADMIN.BOOKS)
  }

  return (
    <div className="admin-add-book">
      <div className="admin-content">
        <div className="admin-header">
          <h1>{isEditMode ? "Chỉnh sửa sách" : "Thêm sách mới"}</h1>
          <Link to={ROUTERS.ADMIN.BOOKS} className="back-button">
            <FaArrowLeft /> Quay lại
          </Link>
        </div>

        <form className="add-book-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-left">
              <div className="form-group">
                <label htmlFor="title">
                  Tên sách <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={bookData.title}
                  onChange={handleChange}
                  placeholder="Nhập tên sách"
                  className={errors.title ? "error" : ""}
                />
                {errors.title && <div className="error-message">{errors.title}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="author">
                  Tác giả <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={bookData.author}
                  onChange={handleChange}
                  placeholder="Nhập tên tác giả"
                  className={errors.author ? "error" : ""}
                />
                {errors.author && <div className="error-message">{errors.author}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="category">
                  Danh mục <span className="required">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={bookData.category}
                  onChange={handleChange}
                  className={errors.category ? "error" : ""}
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && <div className="error-message">{errors.category}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">
                    Giá bán <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={bookData.price}
                    onChange={handleChange}
                    placeholder="Nhập giá bán"
                    className={errors.price ? "error" : ""}
                  />
                  {errors.price && <div className="error-message">{errors.price}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="originalPrice">Giá gốc</label>
                  <input
                    type="text"
                    id="originalPrice"
                    name="originalPrice"
                    value={bookData.originalPrice}
                    onChange={handleChange}
                    placeholder="Nhập giá gốc"
                    className={errors.originalPrice ? "error" : ""}
                  />
                  {errors.originalPrice && <div className="error-message">{errors.originalPrice}</div>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="stock">
                  Số lượng tồn kho <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="stock"
                  name="stock"
                  value={bookData.stock}
                  onChange={handleChange}
                  placeholder="Nhập số lượng tồn kho"
                  className={errors.stock ? "error" : ""}
                />
                {errors.stock && <div className="error-message">{errors.stock}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="description">
                  Mô tả <span className="required">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={bookData.description}
                  onChange={handleChange}
                  placeholder="Nhập mô tả sách"
                  rows="6"
                  className={errors.description ? "error" : ""}
                />
                {errors.description && <div className="error-message">{errors.description}</div>}
              </div>
            </div>

            <div className="form-right">
              <div className="form-group">
                <label htmlFor="image">Hình ảnh sách {!isEditMode && <span className="required">*</span>}</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={errors.image ? "error" : ""}
                />
                {errors.image && <div className="error-message">{errors.image}</div>}
                {bookData.imagePreview && (
                  <div className="image-preview">
                    <img src={bookData.imagePreview || "/placeholder.svg"} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dimensions">Kích thước</label>
                  <input
                    type="text"
                    id="dimensions"
                    name="dimensions"
                    value={bookData.dimensions}
                    onChange={handleChange}
                    placeholder="VD: 11.3 x 17.6 cm"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pages">Số trang</label>
                  <input
                    type="text"
                    id="pages"
                    name="pages"
                    value={bookData.pages}
                    onChange={handleChange}
                    placeholder="VD: 192"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="weight">Trọng lượng</label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={bookData.weight}
                    onChange={handleChange}
                    placeholder="VD: 140 gram"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="format">Định dạng</label>
                  <select id="format" name="format" value={bookData.format} onChange={handleChange}>
                    <option value="Bìa mềm">Bìa mềm</option>
                    <option value="Bìa cứng">Bìa cứng</option>
                    <option value="Bìa gập">Bìa gập</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="series">Bộ sách</label>
                <input
                  type="text"
                  id="series"
                  name="series"
                  value={bookData.series}
                  onChange={handleChange}
                  placeholder="VD: Chú thuật hồi chiến"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <Link to={ROUTERS.ADMIN.BOOKS} className="cancel-button">
              <FaTimes /> Hủy
            </Link>
            <button type="submit" className="save-button">
              <FaSave /> {isEditMode ? "Cập nhật" : "Thêm sách"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default memo(AddBook)

