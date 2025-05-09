package com.shop_shoes.dto;

import lombok.Data;

@Data
public class UpdateProductQuantityRequest {
    private Integer sizeValue;
    private Integer quantity;
} 