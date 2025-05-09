package com.shop_shoes.model;

public enum OrderStatus {
    PENDING(0, "Chờ xác nhận"),
    CONFIRMED(1, "Đã xác nhận"),
    SHIPPING(2, "Đang giao hàng"),
    DELIVERED(3, "Đã giao hàng"),
    CANCELLED(4, "Đã hủy");

    private final int code;
    private final String description;

    OrderStatus(int code, String description) {
        this.code = code;
        this.description = description;
    }

    public int getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }
} 