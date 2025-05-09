package com.shop_shoes.repository;

import com.shop_shoes.model.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Page<Review> findByProductId(Integer productId, Pageable pageable);
    boolean existsByUserIdAndProductId(Integer userId, Integer productId);
} 