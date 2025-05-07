"use client"

import { memo, useState, useEffect } from "react"
import "./style.scss"
import { FaEdit, FaTrash } from "react-icons/fa"

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })
  const [editingCategory, setEditingCategory] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // Mô phỏng dữ liệu danh mục
    const mockCategories = [
      {
        id: 1,
        name: "Sneakers",
        description: "Giày thể thao thời trang, phù hợp cho mọi hoạt động hàng ngày.",
        productCount: 45,
      },
      {
        id: 2,
        name: "Running",
        description: "Giày chạy bộ chuyên dụng, thiết kế để tối ưu hiệu suất chạy.",
        productCount: 32,
      },
      {
        id: 3,
        name: "Basketball",
        description: "Giày bóng rổ với độ bám và hỗ trợ tối đa cho các chuyển động đa hướng.",
        productCount: 28,
      },
      {
        id: 4,
        name: "Training",
        description: "Giày tập luyện đa năng, phù hợp cho các hoạt động thể thao trong nhà.",
        productCount: 15,
      },
      {
        id: 5,
        name: "Casual",
        description: "Giày thời trang hàng ngày, thoải mái và phong cách.",
        productCount: 20,
      },
      {
        id: 6,
        name: "Accessories",
        description: "Phụ kiện giày như dây giày, miếng lót, và sản phẩm chăm sóc giày.",
        productCount: 18,
      },
    ]

    setCategories(mockCategories)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (editingCategory) {
      setEditingCategory({
        ...editingCategory,
        [name]: value,
      })
    } else {
      setNewCategory({
        ...newCategory,
        [name]: value,
      })
    }

    // Xóa lỗi khi người dùng nhập lại
    setErrors({
      ...errors,
      [name]: null,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!editingCategory && !newCategory.name.trim()) {
      newErrors.name = "Vui lòng nhập tên danh mục"
    }

    if (editingCategory && !editingCategory.name.trim()) {
      newErrors.name = "Vui lòng nhập tên danh mục"
    }

    return newErrors
  }

  const handleAddCategory = (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (editingCategory) {
      // Cập nhật danh mục
      const updatedCategories = categories.map((category) =>
        category.id === editingCategory.id ? editingCategory : category,
      )
      setCategories(updatedCategories)
      setEditingCategory(null)
    } else {
      // Thêm danh mục mới
      const newCategoryWithId = {
        id: categories.length > 0 ? Math.max(...categories.map((category) => category.id)) + 1 : 1,
        name: newCategory.name,
        description: newCategory.description,
        productCount: 0,
      }
      setCategories([...categories, newCategoryWithId])
      setNewCategory({ name: "", description: "" })
    }
  }

  const handleEditCategory = (category) => {
    setEditingCategory(category)
  }

  const handleCancelEdit = () => {
    setEditingCategory(null)
    setErrors({})
  }

  const handleDeleteCategory = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      const updatedCategories = categories.filter((category) => category.id !== id)
      setCategories(updatedCategories)
    }
  }

  return (
    <div className="admin-categories">
      <div className="admin-content">
        <div className="admin-header">
          <h1>{editingCategory ? "Chỉnh sửa danh mục" : "Quản lý danh mục"}</h1>
        </div>

        <div className="categories-container">
          <div className="add-category-form">
            <h2>{editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</h2>
            <form onSubmit={handleAddCategory}>
              <div className="form-group">
                <label htmlFor="name">
                  Tên danh mục <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editingCategory ? editingCategory.name : newCategory.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên danh mục"
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="description">Mô tả</label>
                <textarea
                  id="description"
                  name="description"
                  value={editingCategory ? editingCategory.description : newCategory.description}
                  onChange={handleInputChange}
                  placeholder="Nhập mô tả danh mục"
                  rows="4"
                />
              </div>

              <div className="form-actions">
                {editingCategory && (
                  <button type="button" className="cancel-button" onClick={handleCancelEdit}>
                    Hủy
                  </button>
                )}
                <button type="submit" className="save-button">
                  {editingCategory ? "Cập nhật" : "Thêm danh mục"}
                </button>
              </div>
            </form>
          </div>

          <div className="categories-list">
            <h2>Danh sách danh mục</h2>
            <table className="categories-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên danh mục</th>
                  <th>Mô tả</th>
                  <th>Số sản phẩm</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td className="description-cell">{category.description}</td>
                    <td>{category.productCount}</td>
                    <td className="action-buttons">
                      <button className="edit-button" onClick={() => handleEditCategory(category)} title="Chỉnh sửa">
                        <FaEdit />
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteCategory(category.id)} title="Xóa">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Categories)

