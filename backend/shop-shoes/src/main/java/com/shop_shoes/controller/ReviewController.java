package com.shop_shoes.controller;

import com.shop_shoes.dto.request.ReviewRequest;
import com.shop_shoes.model.Review;
import com.shop_shoes.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping("/api/user/reviews")
    public ResponseEntity<?> createReview(
            @RequestParam Integer userId,
            @RequestBody ReviewRequest request) {
        try {
            Review review = reviewService.createReview(userId, request);
            return ResponseEntity.ok(review);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/api/reviews/product/{productId}")
    public ResponseEntity<?> getProductReviews(
            @PathVariable Integer productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Review> reviews = reviewService.getProductReviews(productId, page, size);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 