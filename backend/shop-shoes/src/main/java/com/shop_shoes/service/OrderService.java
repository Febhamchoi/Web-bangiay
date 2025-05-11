package com.shop_shoes.service;

import com.shop_shoes.dto.request.OrderItemRequest;
import com.shop_shoes.dto.request.OrderRequest;
import com.shop_shoes.model.*;
import com.shop_shoes.repository.OrderRepository;
import com.shop_shoes.repository.ProductRepository;
import com.shop_shoes.repository.ProductSizeRepository;
import com.shop_shoes.util.PaginationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private ProductService productService;
    
    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductSizeRepository productSizeRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Order createOrder(Integer userId, OrderRequest request) {
        User user = userService.getUserById(userId);
        
        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(new Date());
        order.setStatus(OrderStatus.PENDING);
        order.setComments(request.getComments());

        double totalSale = 0;
        for (OrderItemRequest item : request.getItems()) {
            Product product = productService.getProductById(item.getProductId());

            ProductSize productSize = product.getProductSizes().stream()
                .filter(ps -> ps.getValue() == item.getSize())
                .findFirst()
                .orElseThrow(() -> new RuntimeException(
                    String.format("Không tìm thấy size %d cho sản phẩm %s", 
                        item.getSize(), product.getName())
                ));

            if (productSize.getQuantity() < item.getQuantity()) {
                throw new RuntimeException(
                    String.format("Sản phẩm %s size %d chỉ còn %d sản phẩm", 
                        product.getName(), item.getSize(), productSize.getQuantity())
                );
            }

            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setOrder(order);
            orderProduct.setProduct(product);
            orderProduct.setSize(item.getSize());
            orderProduct.setQuantity(item.getQuantity());
            orderProduct.setPrice(product.getSellingPrice());

            int newQuantity = productSize.getQuantity() - item.getQuantity();
            productSize.setQuantity(newQuantity);
            productSizeRepository.save(productSize);
            productRepository.save(product);
            
            totalSale += product.getSellingPrice() * item.getQuantity();
        }
        
        order.setTotalSale(totalSale);
        return orderRepository.save(order);
    }

    public Page<Order> getAllOrders(int page, int size) {
        Pageable pageable = PaginationUtil.getPageable(page, size);
        return orderRepository.findAll(pageable);
    }

    public Page<Order> getUserOrders(Integer userId, int page, int size) {
        Pageable pageable = PaginationUtil.getPageable(page, size);
        return orderRepository.findByUserId(userId, pageable);
    }

    public Order getOrderById(Integer orderId) {
        return orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
    }

    public Page<Order> searchOrders(String keyword, int page, int size) {
        Pageable pageable = PaginationUtil.getPageable(page, size);
        return orderRepository.searchOrders(keyword, pageable);
    }

    @Transactional
    public void deleteOrder(Integer orderId) {
        Order order = getOrderById(orderId);
        if (order.getStatus() != OrderStatus.PENDING) {
            throw new RuntimeException("Chỉ có thể xóa đơn hàng đang ở trạng thái chờ xác nhận");
        }
        orderRepository.delete(order);
    }

    @Transactional
    public Order updateOrderStatus(Integer orderId, OrderStatus newStatus) {
        Order order = getOrderById(orderId);
        
        // Kiểm tra trạng thái mới có hợp lệ không
        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new RuntimeException("Không thể cập nhật đơn hàng đã hủy");
        }
        
        if (newStatus == OrderStatus.CANCELLED) {
            for (OrderProduct orderProduct : order.getOrderProducts()) {
                Product product = orderProduct.getProduct();

                ProductSize productSize = product.getProductSizes().stream()
                    .filter(ps -> ps.getValue() == orderProduct.getSize())
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException(
                        String.format("Không tìm thấy size %d cho sản phẩm %s", 
                            orderProduct.getSize(), product.getName())
                    ));

                int newQuantity = productSize.getQuantity() + orderProduct.getQuantity();
                productSize.setQuantity(newQuantity);
                productSizeRepository.save(productSize);
                productRepository.save(product);
            }
        }
        
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }

    public Page<Order> getOrdersByStatus(OrderStatus status, int page, int size) {
        Pageable pageable = PaginationUtil.getPageable(page, size);
        return orderRepository.findByStatus(status, pageable);
    }

    public Page<Order> getUserOrdersByStatus(Integer userId, OrderStatus status, int page, int size) {
        Pageable pageable = PaginationUtil.getPageable(page, size);
        return orderRepository.findByUserIdAndStatus(userId, status, pageable);
    }
} 