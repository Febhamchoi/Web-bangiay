package com.shop_shoes.dto.request;

import lombok.Data;

@Data
public class ReviewRequest {
    private Integer productId;
    private String comment;
    private Integer star;
} 