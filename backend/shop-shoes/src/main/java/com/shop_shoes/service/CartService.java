package com.shop_shoes.service;

import com.shop_shoes.model.Cart;
import com.shop_shoes.model.CartItem;
import com.shop_shoes.model.User;
import com.shop_shoes.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private CartItemService cartItemService;
    
    public void createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setTotalPrice(0.0);
        cartRepository.save(cart);
    }
    
    public Cart getCartByUserId(Integer userId) {
        return cartRepository.findByUserId(userId);
    }

    public Cart updateCartTotal(Cart cart) {
        cart.setTotalPrice(cartItemService.calculateTotalPrice(cart));
        return cartRepository.save(cart);
    }

    public Map<String, Object> getCartStatistics(Integer userId) {
        Cart cart = getCartByUserId(userId);
        if (cart == null) {
            return Map.of(
                "totalItems", 0,
                "totalValue", 0.0
            );
        }

        int totalItems = 0;
        double totalValue = 0.0;

        for (CartItem item : cart.getCartItems()) {
            totalItems += item.getQuantity();
            totalValue += item.getProduct().getSellingPrice() * item.getQuantity();
        }

        return Map.of(
            "totalItems", totalItems,
            "totalValue", totalValue,
            "cartId", cart.getId()
        );
    }
} 