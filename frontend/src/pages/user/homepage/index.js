"use client"

import { memo, useEffect, useState } from "react"
import "./style.scss"
import { Link } from "react-router-dom"
import { formatPrice } from "utils/formatter"

const HomePage = () => {
  const [newProducts, setNewProducts] = useState([])
  const [hotProducts, setHotProducts] = useState([])
  const [accessories, setAccessories] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)

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
      { id: 13, name: "Timberland", logo: "/placeholder.svg?height=60&width=120" },
    ]

    // Mô phỏng dữ liệu sản phẩm mới
    const mockNewProducts = [
      {
        id: 1,
        name: "AIR FORCE 1",
        price: 3800000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 5,
      },
      {
        id: 2,
        name: "AIR FORCE 1",
        price: 3800000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4,
      },
      {
        id: 3,
        name: "AIR FORCE 1",
        price: 3800000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 5,
      },
      {
        id: 4,
        name: "AIR FORCE 2",
        price: 16800000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 5,
      },
      {
        id: 5,
        name: "AIR FORCE 1",
        price: 3800000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4,
      },
      {
        id: 6,
        name: "AIR FORCE 1",
        price: 3800000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 5,
      },
      {
        id: 7,
        name: "AIR FORCE 1",
        price: 3800000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 5,
      },
      {
        id: 8,
        name: "AIR FORCE 1",
        price: 3800000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4,
      },
    ]

    // Mô phỏng dữ liệu sản phẩm hot
    const mockHotProducts = [
      {
        id: 101,
        name: "NIKE PEGASUS TRAIL 4",
        price: 3600000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 5,
        sale: true,
      },
      {
        id: 102,
        name: "NIKE QUEST 5",
        price: 2500000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4,
        sale: true,
      },
      {
        id: 103,
        name: "ADIDAS GRADAS CLOUD WHITE",
        price: 3600000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 5,
        sale: true,
      },
      {
        id: 104,
        name: "PUMA SLIPSTREAM GREEN",
        price: 2800000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4,
        sale: true,
      },
    ]

    // Mô phỏng dữ liệu phụ kiện
    const mockAccessories = [
      {
        id: 201,
        name: "DÂY GIÀY FLAT DEN",
        price: 90000,
        image: "/placeholder.svg?height=200&width=200",
        rating: 5,
      },
      {
        id: 202,
        name: "CREP MARK ON | BÚT TÔ ĐẾ GIÀY",
        price: 480000,
        image: "/placeholder.svg?height=200&width=200",
        rating: 4,
      },
      {
        id: 203,
        name: "CREP ERASER | GÔM TẨY VẾT BẨN",
        price: 320000,
        image: "/placeholder.svg?height=200&width=200",
        rating: 5,
      },
      {
        id: 204,
        name: "CREP CURE KIT | BỘ KIT NHỎ",
        price: 490000,
        image: "/placeholder.svg?height=200&width=200",
        rating: 5,
      },
    ]

    setBrands(mockBrands)
    setNewProducts(mockNewProducts)
    setHotProducts(mockHotProducts)
    setAccessories(mockAccessories)
  }, [])

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
    <div className="homepage">
      <section className="brands-section">
        <div className="container">
          <div className="brands-grid">
            {brands.map((brand) => (
              <div className="brand-item" key={brand.id}>
                <Link to={`/thuong-hieu/${brand.name.toLowerCase()}`}>
                  <img src={brand.logo || "/placeholder.svg"} alt={brand.name} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Sản phẩm mới</h2>
          <div className="products-grid">
            {newProducts.map((product) => (
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
          <div className="pagination">
            <button className="page-button prev">«</button>
            <button className="page-button active">1</button>
            <button className="page-button">2</button>
            <button className="page-button">3</button>
            <button className="page-button next">»</button>
          </div>
        </div>
      </section>

      <section className="hot-products-section">
        <div className="container">
          <h2 className="section-title">SẢN PHẨM HOT</h2>
          <div className="hot-products-grid">
            {hotProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <Link to={`/san-pham/${product.id}`}>
                  <div className="product-image">
                    {product.sale && <span className="sale-badge">SALE</span>}
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
        </div>
      </section>

      <section className="accessories-section">
        <div className="container">
          <h2 className="section-title">PHỤ KIỆN</h2>
          <div className="accessories-grid">
            {accessories.map((accessory) => (
              <div className="product-card" key={accessory.id}>
                <Link to={`/san-pham/${accessory.id}`}>
                  <div className="product-image">
                    <img src={accessory.image || "/placeholder.svg"} alt={accessory.name} />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{accessory.name}</h3>
                    <div className="product-rating">{renderStars(accessory.rating)}</div>
                    <p className="product-price">{formatPrice(accessory.price)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default memo(HomePage)

