package com.shop_shoes.dto.response;

import com.shop_shoes.model.CartItem;
import lombok.Data;

@Data
public class CartItemResponse {
    private Integer id;
    private Integer quantity;
    private ProductResponse product;
    private Integer size;
    private Integer price;

    public static CartItemResponse fromCartItem(CartItem cartItem) {
        CartItemResponse response = new CartItemResponse();
        response.setId(cartItem.getId());
        response.setQuantity(cartItem.getQuantity());
        response.setProduct(ProductResponse.fromProduct(cartItem.getProductSize().getProduct()));
        response.setSize(cartItem.getProductSize().getValue());
        response.setPrice(cartItem.getProductSize().getProduct().getSellingPrice());
        return response;
    }
} 