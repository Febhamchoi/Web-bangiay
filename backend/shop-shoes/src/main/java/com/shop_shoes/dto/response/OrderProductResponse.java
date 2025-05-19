package com.shop_shoes.dto.response;

import com.shop_shoes.model.OrderProduct;
import lombok.Data;

@Data
public class OrderProductResponse {
    private Integer id;
    private Integer productId;
    private String productName;
    private double price;
    private int size;
    private int quantity;

    public static OrderProductResponse fromOrderProduct(OrderProduct orderProduct) {
        OrderProductResponse response = new OrderProductResponse();
        response.setId(orderProduct.getId());
        response.setProductId(orderProduct.getProductSize().getProduct().getId());
        response.setProductName(orderProduct.getProductSize().getProduct().getName());
        response.setPrice(orderProduct.getProductSize().getProduct().getSellingPrice());
        response.setSize(orderProduct.getProductSize().getValue());
        response.setQuantity(orderProduct.getQuantity());
        return response;
    }
} 