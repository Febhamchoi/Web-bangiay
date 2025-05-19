package com.shop_shoes.controller;

import com.shop_shoes.dto.request.OrderRequest;
import com.shop_shoes.dto.response.OrderResponse;
import com.shop_shoes.model.Order;
import com.shop_shoes.model.OrderStatus;
import com.shop_shoes.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/user/orders")
    public ResponseEntity<?> createOrder(
            @RequestAttribute("userId") Integer userId,
            @RequestBody OrderRequest request) {
        try {
            Order order = orderService.createOrder(userId, request);
            return ResponseEntity.ok(OrderResponse.fromOrder(order));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/orders")
    public ResponseEntity<?> getMyOrders(
            @RequestAttribute("userId") Integer userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Order> orders = orderService.getUserOrders(userId, page, size);
            Page<OrderResponse> response = orders.map(OrderResponse::fromOrder);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/orders/{orderId}")
    public ResponseEntity<?> getOrderDetail(
            @RequestAttribute("userId") Integer userId,
            @PathVariable Integer orderId) {
        try {
            Order order = orderService.getOrderById(orderId);
            if (!order.getUser().getId().equals(userId)) {
                return ResponseEntity.badRequest().body("Không có quyền xem đơn hàng này");
            }
            return ResponseEntity.ok(OrderResponse.fromOrder(order));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/user/orders/{orderId}")
    public ResponseEntity<?> cancelOrder(
            @RequestAttribute("userId") Integer userId,
            @PathVariable Integer orderId) {
        try {
            Order order = orderService.getOrderById(orderId);
            if (!order.getUser().getId().equals(userId)) {
                return ResponseEntity.badRequest().body("Không có quyền hủy đơn hàng này");
            }
            order = orderService.updateOrderStatus(orderId, OrderStatus.CANCELLED);
            return ResponseEntity.ok(OrderResponse.fromOrder(order));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/orders/status")
    public ResponseEntity<?> getMyOrdersByStatus(
            @RequestAttribute("userId") Integer userId,
            @RequestParam OrderStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Order> orders = orderService.getUserOrdersByStatus(userId, status, page, size);
            Page<OrderResponse> response = orders.map(OrderResponse::fromOrder);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/admin/orders")
    public ResponseEntity<?> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Order> orders = orderService.getAllOrders(page, size);
            Page<OrderResponse> response = orders.map(OrderResponse::fromOrder);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/admin/orders/search")
    public ResponseEntity<?> searchOrders(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Order> orders = orderService.searchOrders(keyword, page, size);
            Page<OrderResponse> response = orders.map(OrderResponse::fromOrder);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/admin/orders/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable Integer orderId) {
        try {
            orderService.deleteOrder(orderId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/admin/orders/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable Integer orderId,
            @RequestParam OrderStatus status) {
        try {
            Order order = orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok(OrderResponse.fromOrder(order));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/admin/orders/status")
    public ResponseEntity<?> getOrdersByStatus(
            @RequestParam OrderStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Order> orders = orderService.getOrdersByStatus(status, page, size);
            Page<OrderResponse> response = orders.map(OrderResponse::fromOrder);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 