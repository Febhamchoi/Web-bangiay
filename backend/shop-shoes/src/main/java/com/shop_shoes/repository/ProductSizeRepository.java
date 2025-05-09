package com.shop_shoes.repository;

import com.shop_shoes.model.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductSizeRepository extends JpaRepository<ProductSize, Integer> {
}