package com.shop_shoes.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cartitems")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;
    
    private Integer quantity;
    
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    
    private String size;
} 