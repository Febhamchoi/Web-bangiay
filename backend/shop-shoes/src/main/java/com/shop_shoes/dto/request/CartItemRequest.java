package com.shop_shoes.dto.request;

import lombok.Data;

@Data
public class CartItemRequest {
    private Integer productSizeId;
    private String size;
    private Integer quantity;
} 