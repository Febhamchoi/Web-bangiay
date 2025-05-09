package com.shop_shoes.dto;

import lombok.Data;

@Data
public class OrderItemRequest {
    private Integer productId;
    private Integer size;
    private Integer quantity;
} 