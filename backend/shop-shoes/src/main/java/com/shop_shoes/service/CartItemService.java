package com.shop_shoes.service;

import com.shop_shoes.model.Cart;
import com.shop_shoes.model.CartItem;
import com.shop_shoes.model.Product;
import com.shop_shoes.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartItemService {
    @Autowired
    private CartItemRepository cartItemRepository;
    
    public CartItem addToCart(Cart cart, Product product, String size, Integer quantity) {
        CartItem existingItem = cartItemRepository.findByCartAndProductAndSize(cart, product, size);
        
        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            return cartItemRepository.save(existingItem);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setSize(size);
            cartItem.setQuantity(quantity);
            return cartItemRepository.save(cartItem);
        }
    }
    
    public void removeFromCart(Integer cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }
    
    public void updateQuantity(Integer cartItemId, Integer quantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy item trong giỏ hàng"));
        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);
    }

    public Double calculateTotalPrice(Cart cart) {
        return cart.getCartItems().stream()
            .mapToDouble(item -> item.getProduct().getSellingPrice() * item.getQuantity())
            .sum();
    }
} 