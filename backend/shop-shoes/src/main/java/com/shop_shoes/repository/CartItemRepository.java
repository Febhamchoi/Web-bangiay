package com.shop_shoes.repository;

import com.shop_shoes.model.Cart;
import com.shop_shoes.model.CartItem;
import com.shop_shoes.model.Product;
import com.shop_shoes.model.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    CartItem findByCartAndProductSize(Cart cart, ProductSize productSize);
} 