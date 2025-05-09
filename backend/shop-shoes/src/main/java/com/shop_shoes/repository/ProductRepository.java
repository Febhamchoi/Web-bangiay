package com.shop_shoes.repository;

import com.shop_shoes.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    
    // Tìm sản phẩm theo danh mục
    Page<Product> findByCategoryId(Integer categoryId, Pageable pageable);
    
    // Tìm sản phẩm theo thương hiệu
    Page<Product> findByBrandId(Integer brandId, Pageable pageable);
    
    // Tìm kiếm sản phẩm theo tên
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Product> searchByName(@Param("keyword") String keyword, Pageable pageable);
    
    // Tìm sản phẩm theo size
    @Query("SELECT DISTINCT p FROM Product p JOIN p.productSizes ps WHERE ps.value = :size")
    Page<Product> findBySize(@Param("size") Integer size, Pageable pageable);
    
    // Tìm sản phẩm theo khoảng giá
    @Query("SELECT p FROM Product p WHERE p.sellingPrice BETWEEN :minPrice AND :maxPrice")
    Page<Product> findByPriceRange(@Param("minPrice") Integer minPrice, @Param("maxPrice") Integer maxPrice, Pageable pageable);
    
    // Tìm kiếm sản phẩm trong danh mục
    @Query("SELECT p FROM Product p WHERE p.category.id = :categoryId AND LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Product> searchByNameInCategory(@Param("categoryId") Integer categoryId, @Param("keyword") String keyword, Pageable pageable);
    
    // Tìm sản phẩm đang giảm giá
    @Query("SELECT p FROM Product p WHERE p.sellingPrice < p.originalPrice")
    Page<Product> findDiscountedProducts(Pageable pageable);
    
    // Tìm sản phẩm đang giảm giá theo thương hiệu
    @Query("SELECT p FROM Product p WHERE p.brand.id = :brandId AND p.sellingPrice < p.originalPrice")
    Page<Product> findDiscountedProductsByBrand(@Param("brandId") Integer brandId, Pageable pageable);
    
    // Tìm sản phẩm đang giảm giá theo size
    @Query("SELECT DISTINCT p FROM Product p JOIN p.productSizes ps WHERE ps.value = :size AND p.sellingPrice < p.originalPrice")
    Page<Product> findDiscountedProductsBySize(@Param("size") Integer size, Pageable pageable);
    
    // Tìm sản phẩm theo khoảng giảm giá
    @Query("SELECT p FROM Product p WHERE ((p.originalPrice - p.sellingPrice) * 100.0 / p.originalPrice) BETWEEN :minDiscount AND :maxDiscount")
    Page<Product> findProductsByDiscountRange(@Param("minDiscount") Double minDiscount, @Param("maxDiscount") Double maxDiscount, Pageable pageable);
    
    // Tìm sản phẩm đang giảm giá theo thương hiệu và size
    @Query("SELECT DISTINCT p FROM Product p JOIN p.productSizes ps WHERE p.brand.id = :brandId AND ps.value = :size AND p.sellingPrice < p.originalPrice")
    Page<Product> findDiscountedProductsByBrandAndSize(@Param("brandId") Integer brandId, @Param("size") Integer size, Pageable pageable);
} 