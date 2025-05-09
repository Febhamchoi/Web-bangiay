package com.shop_shoes.dto.request;

import lombok.Data;

@Data
public class CartItemRequest {
    private Integer productId;
    private String size;
    private Integer quantity;
} 