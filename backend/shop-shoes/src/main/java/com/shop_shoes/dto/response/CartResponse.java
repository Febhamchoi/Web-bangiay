package com.shop_shoes.dto.response;

import com.shop_shoes.model.Cart;
import com.shop_shoes.model.CartItem;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class CartResponse {
    private Integer id;
    private List<CartItemResponse> cartItems;
    private Double totalPrice;

    public static CartResponse fromCart(Cart cart) {
        CartResponse response = new CartResponse();
        response.setId(cart.getId());
        response.setTotalPrice(cart.getTotalPrice());
        response.setCartItems(cart.getCartItems().stream()
            .map(CartItemResponse::fromCartItem)
            .collect(Collectors.toList()));
        return response;
    }
} 