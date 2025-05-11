package com.shop_shoes.service;

import com.shop_shoes.dto.request.ReviewRequest;
import com.shop_shoes.model.Review;
import com.shop_shoes.model.Product;
import com.shop_shoes.model.User;
import com.shop_shoes.repository.ReviewRepository;
import com.shop_shoes.util.PaginationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    public Review createReview(Integer userId, ReviewRequest request) {
        User user = userService.getUserById(userId);
        Product product = productService.getProductById(request.getProductId());
        if (reviewRepository.existsByUserIdAndProductId(userId, request.getProductId())) {
            throw new RuntimeException("Bạn đã đánh giá sản phẩm này rồi");
        }
        if (request.getStar() < 1 || request.getStar() > 5) {
            throw new RuntimeException("Số sao phải từ 1 đến 5");
        }

        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setComment(request.getComment());
        review.setStar(request.getStar());

        return reviewRepository.save(review);
    }

    public Page<Review> getProductReviews(Integer productId, int page, int size) {
        Pageable pageable = PaginationUtil.getPageable(page, size);
        return reviewRepository.findByProductId(productId, pageable);
    }
} 