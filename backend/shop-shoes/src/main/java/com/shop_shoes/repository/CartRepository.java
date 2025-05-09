package com.shop_shoes.repository;

import com.shop_shoes.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    Cart findByUserId(Integer userId);
} 