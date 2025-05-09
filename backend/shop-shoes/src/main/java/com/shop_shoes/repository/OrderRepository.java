package com.shop_shoes.repository;

import com.shop_shoes.model.Order;
import com.shop_shoes.model.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    Page<Order> findByUserId(Integer userId, Pageable pageable);
    
    @Query("SELECT o FROM Order o WHERE o.status = :status")
    Page<Order> findByStatus(@Param("status") OrderStatus status, Pageable pageable);
    
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND o.status = :status")
    Page<Order> findByUserIdAndStatus(@Param("userId") Integer userId, @Param("status") OrderStatus status, Pageable pageable);
    
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND " +
           "(o.comments LIKE %:keyword% OR " +
           "CONCAT(o.user.firstName, ' ', o.user.lastName) LIKE %:keyword%)")
    Page<Order> searchOrders(@Param("keyword") String keyword, Pageable pageable);
} 