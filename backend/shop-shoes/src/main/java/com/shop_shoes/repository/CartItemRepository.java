package com.shop_shoes.repository;

import com.shop_shoes.model.Cart;
import com.shop_shoes.model.CartItem;
import com.shop_shoes.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    CartItem findByCartAndProductAndSize(Cart cart, Product product, String size);
} 