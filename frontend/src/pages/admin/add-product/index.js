"use client"

import { memo, useState, useEffect } from "react"
import "./style.scss"
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ROUTERS } from "utils/router"

const AddProduct = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const productId = queryParams.get("id")
  const isEditMode = !!productId

  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    originalPrice: "",
    stock: "",
    description: "",
    sizes: [],
    weight: "",
    material: "",
    color: "",
    image: null,
    imagePreview: null,
  })

  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [errors, setErrors] = useState({})
  const [availableSizes, setAvailableSizes] = useState([39, 40, 41, 42, 43, 44, 45])

  useEffect(() => {
    // Lấy danh sách danh mục
    const mockCategories = ["Sneakers", "Running", "Casual", "Basketball", "Training", "Accessories"]
    setCategories(mockCategories)

    // Lấy danh sách thương hiệu
    const mockBrands = ["Nike", "Adidas", "Puma", "Jordan", "Converse", "Vans", "New Balance"]
    setBrands(mockBrands)

    // Nếu là chế độ chỉnh sửa, lấy thông tin sản phẩm
    if (isEditMode) {
      // Mô phỏng lấy dữ liệu sản phẩm từ API
      const mockProducts = [
        {
          id: 1,
          name: "AIR FORCE 1",
          brand: "Nike",
          category: "Sneakers",
          price: 3800000,
          originalPrice: 4200000,
          stock: 45,
          description:
            "MENDE AIR FORCE 1\nChất liệu: chất dạ mềm mịn, dày\ndễ phối đồ, bắt nên những mảng\nmàu tự đặc biệt cá tính.\nKích cỡ: 1/2/3/4",
          sizes: [40, 41, 42, 43, 44],
          weight: "350 gram",
          material: "Leather, Synthetic",
          color: "White",
          image: "/placeholder.svg?height=300&width=200",
        },
      ]

      const product = mockProducts.find((product) => product.id === Number.parseInt(productId))
      if (product) {
        setProductData({
          ...product,
          price: product.price.toString(),
          originalPrice: product.originalPrice.toString(),
          stock: product.stock.toString(),
          imagePreview: product.image,
        })
      }
    }
  }, [isEditMode, productId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData({
      ...productData,
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

  const handleSizeChange = (size) => {
    const newSizes = [...productData.sizes]
    if (newSizes.includes(size)) {
      // Remove size if already selected
      const index = newSizes.indexOf(size)
      newSizes.splice(index, 1)
    } else {
      // Add size if not selected
      newSizes.push(size)
    }
    setProductData({
      ...productData,
      sizes: newSizes,
    })

    // Xóa lỗi khi người dùng chọn size
    if (errors.sizes) {
      setErrors({
        ...errors,
        sizes: null,
      })
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProductData({
        ...productData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!productData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên sản phẩm"
    }

    if (!productData.brand) {
      newErrors.brand = "Vui lòng chọn thương hiệu"
    }

    if (!productData.category) {
      newErrors.category = "Vui lòng chọn danh mục"
    }

    if (!productData.price.trim()) {
      newErrors.price = "Vui lòng nhập giá bán"
    } else if (isNaN(productData.price) || Number.parseFloat(productData.price) <= 0) {
      newErrors.price = "Giá bán phải là số dương"
    }

    if (
      productData.originalPrice.trim() &&
      (isNaN(productData.originalPrice) || Number.parseFloat(productData.originalPrice) <= 0)
    ) {
      newErrors.originalPrice = "Giá gốc phải là số dương"
    }

    if (!productData.stock.trim()) {
      newErrors.stock = "Vui lòng nhập số lượng tồn kho"
    } else if (isNaN(productData.stock) || Number.parseInt(productData.stock) < 0) {
      newErrors.stock = "Số lượng tồn kho phải là số không âm"
    }

    if (!productData.description.trim()) {
      newErrors.description = "Vui lòng nhập mô tả sản phẩm"
    }

    if (productData.sizes.length === 0) {
      newErrors.sizes = "Vui lòng chọn ít nhất một kích cỡ"
    }

    if (!isEditMode && !productData.image) {
      newErrors.image = "Vui lòng chọn hình ảnh sản phẩm"
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
      alert("Cập nhật sản phẩm thành công!")
    } else {
      alert("Thêm sản phẩm mới thành công!")
    }

    navigate(ROUTERS.ADMIN.PRODUCTS)
  }

  return (
    <div className="admin-add-product">
      <div className="admin-content">
        <div className="admin-header">
          <h1>{isEditMode ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h1>
          <Link to={ROUTERS.ADMIN.PRODUCTS} className="back-button">
            <FaArrowLeft /> Quay lại
          </Link>
        </div>

        <form className="add-product-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-left">
              <div className="form-group">
                <label htmlFor="name">
                  Tên sản phẩm <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  placeholder="Nhập tên sản phẩm"
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="brand">
                  Thương hiệu <span className="required">*</span>
                </label>
                <select
                  id="brand"
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                  className={errors.brand ? "error" : ""}
                >
                  <option value="">Chọn thương hiệu</option>
                  {brands.map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                {errors.brand && <div className="error-message">{errors.brand}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="category">
                  Danh mục <span className="required">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={productData.category}
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
                    value={productData.price}
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
                    value={productData.originalPrice}
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
                  value={productData.stock}
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
                  value={productData.description}
                  onChange={handleChange}
                  placeholder="Nhập mô tả sản phẩm"
                  rows="6"
                  className={errors.description ? "error" : ""}
                />
                {errors.description && <div className="error-message">{errors.description}</div>}
              </div>
            </div>

            <div className="form-right">
              <div className="form-group">
                <label htmlFor="image">Hình ảnh sản phẩm {!isEditMode && <span className="required">*</span>}</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={errors.image ? "error" : ""}
                />
                {errors.image && <div className="error-message">{errors.image}</div>}
                {productData.imagePreview && (
                  <div className="image-preview">
                    <img src={productData.imagePreview || "/placeholder.svg"} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="sizes">
                  Kích cỡ <span className="required">*</span>
                </label>
                <div className="size-options">
                  {availableSizes.map((size) => (
                    <div
                      key={size}
                      className={`size-option ${productData.sizes.includes(size) ? "selected" : ""}`}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
                {errors.sizes && <div className="error-message">{errors.sizes}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="weight">Trọng lượng</label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={productData.weight}
                    onChange={handleChange}
                    placeholder="VD: 350 gram"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="material">Chất liệu</label>
                  <input
                    type="text"
                    id="material"
                    name="material"
                    value={productData.material}
                    onChange={handleChange}
                    placeholder="VD: Leather, Synthetic"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="color">Màu sắc</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={productData.color}
                  onChange={handleChange}
                  placeholder="VD: White, Black, Red"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <Link to={ROUTERS.ADMIN.PRODUCTS} className="cancel-button">
              <FaTimes /> Hủy
            </Link>
            <button type="submit" className="save-button">
              <FaSave /> {isEditMode ? "Cập nhật" : "Thêm sản phẩm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default memo(AddProduct)

