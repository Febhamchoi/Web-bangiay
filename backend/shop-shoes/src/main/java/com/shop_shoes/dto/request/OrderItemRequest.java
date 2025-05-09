package com.shop_shoes.dto.request;

import lombok.Data;

@Data
public class OrderItemRequest {
    private Integer productId;
    private int size;
    private Integer quantity;
}
