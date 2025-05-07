"use client"

import { memo, useState, useEffect } from "react"
import "./style.scss"
import { FaEdit, FaTrash } from "react-icons/fa"

const Brands = () => {
  const [brands, setBrands] = useState([])
  const [newBrand, setNewBrand] = useState({ name: "", logo: null, logoPreview: null })
  const [editingBrand, setEditingBrand] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // Mô phỏng dữ liệu thương hiệu
    const mockBrands = [
      { id: 1, name: "Nike", logo: "/placeholder.svg?height=60&width=120" },
      { id: 2, name: "Adidas", logo: "/placeholder.svg?height=60&width=120" },
      { id: 3, name: "Jordan", logo: "/placeholder.svg?height=60&width=120" },
      { id: 4, name: "Yeezy", logo: "/placeholder.svg?height=60&width=120" },
      { id: 5, name: "Fila", logo: "/placeholder.svg?height=60&width=120" },
      { id: 6, name: "Puma", logo: "/placeholder.svg?height=60&width=120" },
      { id: 7, name: "Asics", logo: "/placeholder.svg?height=60&width=120" },
      { id: 8, name: "The North Face", logo: "/placeholder.svg?height=60&width=120" },
      { id: 9, name: "Reebok", logo: "/placeholder.svg?height=60&width=120" },
      { id: 10, name: "Converse", logo: "/placeholder.svg?height=60&width=120" },
      { id: 11, name: "Vans", logo: "/placeholder.svg?height=60&width=120" },
      { id: 12, name: "Balenciaga", logo: "/placeholder.svg?height=60&width=120" },
    ]

    setBrands(mockBrands)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (editingBrand) {
      setEditingBrand({
        ...editingBrand,
        [name]: value,
      })
    } else {
      setNewBrand({
        ...newBrand,
        [name]: value,
      })
    }

    // Xóa lỗi khi người dùng nhập lại
    setErrors({
      ...errors,
      [name]: null,
    })
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (editingBrand) {
        setEditingBrand({
          ...editingBrand,
          logo: file,
          logoPreview: URL.createObjectURL(file),
        })
      } else {
        setNewBrand({
          ...newBrand,
          logo: file,
          logoPreview: URL.createObjectURL(file),
        })
      }

      // Xóa lỗi khi người dùng chọn logo
      setErrors({
        ...errors,
        logo: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!editingBrand && !newBrand.name.trim()) {
      newErrors.name = "Vui lòng nhập tên thương hiệu"
    }

    if (!editingBrand && !newBrand.logo && !newBrand.logoPreview) {
      newErrors.logo = "Vui lòng chọn logo thương hiệu"
    }

    if (editingBrand && !editingBrand.name.trim()) {
      newErrors.name = "Vui lòng nhập tên thương hiệu"
    }

    return newErrors
  }

  const handleAddBrand = (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (editingBrand) {
      // Cập nhật thương hiệu
      const updatedBrands = brands.map((brand) =>
        brand.id === editingBrand.id
          ? {
              ...editingBrand,
              logo: editingBrand.logoPreview || editingBrand.logo,
            }
          : brand,
      )
      setBrands(updatedBrands)
      setEditingBrand(null)
    } else {
      // Thêm thương hiệu mới
      const newBrandWithId = {
        id: brands.length > 0 ? Math.max(...brands.map((brand) => brand.id)) + 1 : 1,
        name: newBrand.name,
        logo: newBrand.logoPreview || "/placeholder.svg?height=60&width=120",
      }
      setBrands([...brands, newBrandWithId])
      setNewBrand({ name: "", logo: null, logoPreview: null })
    }
  }

  const handleEditBrand = (brand) => {
    setEditingBrand({
      ...brand,
      logoPreview: null,
    })
  }

  const handleCancelEdit = () => {
    setEditingBrand(null)
    setErrors({})
  }

  const handleDeleteBrand = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này?")) {
      const updatedBrands = brands.filter((brand) => brand.id !== id)
      setBrands(updatedBrands)
    }
  }

  return (
    <div className="admin-brands">
      <div className="admin-content">
        <div className="admin-header">
          <h1>{editingBrand ? "Chỉnh sửa thương hiệu" : "Quản lý thương hiệu"}</h1>
        </div>

        <div className="brands-container">
          <div className="add-brand-form">
            <h2>{editingBrand ? "Chỉnh sửa thương hiệu" : "Thêm thương hiệu mới"}</h2>
            <form onSubmit={handleAddBrand}>
              <div className="form-group">
                <label htmlFor="name">
                  Tên thương hiệu <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editingBrand ? editingBrand.name : newBrand.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên thương hiệu"
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="logo">Logo thương hiệu {!editingBrand && <span className="required">*</span>}</label>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className={errors.logo ? "error" : ""}
                />
                {errors.logo && <div className="error-message">{errors.logo}</div>}
                {(editingBrand?.logoPreview || newBrand.logoPreview) && (
                  <div className="logo-preview">
                    <img src={editingBrand ? editingBrand.logoPreview : newBrand.logoPreview} alt="Preview" />
                  </div>
                )}
                {editingBrand && !editingBrand.logoPreview && (
                  <div className="logo-preview">
                    <img src={editingBrand.logo || "/placeholder.svg"} alt={editingBrand.name} />
                    <p>Logo hiện tại</p>
                  </div>
                )}
              </div>

              <div className="form-actions">
                {editingBrand && (
                  <button type="button" className="cancel-button" onClick={handleCancelEdit}>
                    Hủy
                  </button>
                )}
                <button type="submit" className="save-button">
                  {editingBrand ? "Cập nhật" : "Thêm thương hiệu"}
                </button>
              </div>
            </form>
          </div>

          <div className="brands-list">
            <h2>Danh sách thương hiệu</h2>
            <div className="brands-grid">
              {brands.map((brand) => (
                <div className="brand-card" key={brand.id}>
                  <div className="brand-logo">
                    <img src={brand.logo || "/placeholder.svg"} alt={brand.name} />
                  </div>
                  <div className="brand-info">
                    <h3>{brand.name}</h3>
                  </div>
                  <div className="brand-actions">
                    <button className="edit-button" onClick={() => handleEditBrand(brand)} title="Chỉnh sửa">
                      <FaEdit />
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteBrand(brand.id)} title="Xóa">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Brands)

