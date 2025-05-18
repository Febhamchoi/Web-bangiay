package com.shop_shoes.controller;

import com.shop_shoes.dto.request.CartItemRequest;
import com.shop_shoes.dto.response.CartResponse;
import com.shop_shoes.model.Cart;
import com.shop_shoes.model.CartItem;
import com.shop_shoes.model.Product;
import com.shop_shoes.model.ProductSize;
import com.shop_shoes.repository.ProductRepository;
import com.shop_shoes.repository.ProductSizeRepository;
import com.shop_shoes.service.CartService;
import com.shop_shoes.service.CartItemService;
import com.shop_shoes.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user/cart")
public class CartController {
    @Autowired
    private CartService cartService;
    
    @Autowired
    private CartItemService cartItemService;
    
    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductSizeRepository productSizeRepository;

    @PostMapping("/items")
    public ResponseEntity<?> addToCart(
            @RequestAttribute("userId") Integer userId,
            @RequestBody CartItemRequest request) {
        try {
            Cart cart = cartService.getCartByUserId(userId);
            if (cart == null) {
                return ResponseEntity.badRequest().body("Không tìm thấy giỏ hàng");
            }
            Optional<ProductSize> productSize = productSizeRepository.findById(request.getProductSizeId());
            if (productSize.isEmpty()) {
                return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm");
            }
            if (request.getQuantity() <= 0) {
                return ResponseEntity.badRequest().body("Số lượng phải lớn hơn 0");
            }
            CartItem cartItem = cartItemService.addToCart(cart, productSize.get(), request.getQuantity());
            cart = cartService.updateCartTotal(cart);

            return ResponseEntity.ok(CartResponse.fromCart(cart));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<?> removeFromCart(
            @RequestAttribute("userId") Integer userId,
            @PathVariable Integer itemId) {
        try {
            Cart cart = cartService.getCartByUserId(userId);
            if (cart == null) {
                return ResponseEntity.badRequest().body("Không tìm thấy giỏ hàng");
            }

            boolean itemExists = cart.getCartItems().stream()
                .anyMatch(item -> item.getId().equals(itemId));
            
            if (!itemExists) {
                return ResponseEntity.badRequest().body("Sản phẩm không tồn tại trong giỏ hàng");
            }

            cartItemService.removeFromCart(itemId);

            cart = cartService.updateCartTotal(cart);

            return ResponseEntity.ok(CartResponse.fromCart(cart));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<?> updateCartItem(
            @RequestAttribute("userId") Integer userId,
            @PathVariable Integer itemId,
            @RequestBody CartItemRequest request) {
        try {
            Cart cart = cartService.getCartByUserId(userId);
            if (cart == null) {
                return ResponseEntity.badRequest().body("Không tìm thấy giỏ hàng");
            }
            boolean itemExists = cart.getCartItems().stream()
                .anyMatch(item -> item.getId().equals(itemId));
            
            if (!itemExists) {
                return ResponseEntity.badRequest().body("Sản phẩm không tồn tại trong giỏ hàng");
            }
            if (request.getQuantity() <= 0) {
                return ResponseEntity.badRequest().body("Số lượng phải lớn hơn 0");
            }
            cartItemService.updateQuantity(itemId, request.getQuantity());

            cart = cartService.updateCartTotal(cart);

            return ResponseEntity.ok(CartResponse.fromCart(cart));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getCart(@RequestAttribute("userId") Integer userId) {
        try {
            Cart cart = cartService.getCartByUserId(userId);
            if (cart == null) {
                return ResponseEntity.badRequest().body("Không tìm thấy giỏ hàng");
            }
            return ResponseEntity.ok(CartResponse.fromCart(cart));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/statistics")
    public ResponseEntity<?> getCartStatistics(
            @RequestAttribute("userId") Integer userId) {
        try {
            Map<String, Object> statistics = cartService.getCartStatistics(userId);
            return ResponseEntity.ok(statistics);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 