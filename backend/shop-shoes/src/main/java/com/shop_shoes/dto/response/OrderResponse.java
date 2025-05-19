package com.shop_shoes.dto.response;

import com.shop_shoes.model.Order;
import com.shop_shoes.model.OrderProduct;
import com.shop_shoes.model.OrderStatus;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class OrderResponse {
    private Integer id;
    private Integer userId;
    private Date orderDate;
    private OrderStatus status;
    private String comments;
    private double totalSale;
    private List<OrderProductResponse> orderProducts;

    public static OrderResponse fromOrder(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setUserId(order.getUser().getId());
        response.setOrderDate(order.getOrderDate());
        response.setStatus(order.getStatus());
        response.setComments(order.getComments());
        response.setTotalSale(order.getTotalSale());
        response.setOrderProducts(order.getOrderProducts().stream()
                .map(OrderProductResponse::fromOrderProduct)
                .collect(Collectors.toList()));
        return response;
    }
} 