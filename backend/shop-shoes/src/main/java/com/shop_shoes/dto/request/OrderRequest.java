package com.shop_shoes.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    private String comments;
    private List<OrderItemRequest> items;
}

