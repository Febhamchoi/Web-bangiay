package com.shop_shoes.controller;

import com.shop_shoes.dto.request.ProductRequest;
import com.shop_shoes.dto.response.ProductResponse;
import com.shop_shoes.dto.UpdateProductQuantityRequest;
import com.shop_shoes.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("/admin/products")
    public ResponseEntity<?> createProduct(@RequestBody ProductRequest request) {
        try {
            ProductResponse product = productService.createProduct(request);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/admin/products/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Integer id, @RequestBody ProductRequest request) {
        try {
            ProductResponse product = productService.updateProduct(id, request);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/admin/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/products")
    public ResponseEntity<?> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<ProductResponse> products = productService.getProducts(page, size);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/products/category/{categoryId}")
    public ResponseEntity<?> getProductsByCategory(
            @PathVariable Integer categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<ProductResponse> products = productService.getProductsByCategory(categoryId, page, size);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/products/brand/{brandId}")
    public ResponseEntity<?> getProductsByBrand(
            @PathVariable Integer brandId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<ProductResponse> products = productService.getProductsByBrand(brandId, page, size);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/products/search")
    public ResponseEntity<?> searchProducts(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<ProductResponse> products = productService.searchProducts(keyword, page, size);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/products/size/{size}")
    public ResponseEntity<?> getProductsBySize(
            @PathVariable String sizeString,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<ProductResponse> products = productService.getProductsBySize(sizeString, page, size);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/products/price")
    public ResponseEntity<?> getProductsByPriceRange(
            @RequestParam Integer minPrice,
            @RequestParam Integer maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            if (minPrice > maxPrice) {
                return ResponseEntity.badRequest().body("Giá tối thiểu không được lớn hơn giá tối đa");
            }
            Page<ProductResponse> products = productService.getProductsByPriceRange(minPrice, maxPrice, page, size);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/products/category/{categoryId}/search")
    public ResponseEntity<?> searchProductsInCategory(
            @PathVariable Integer categoryId,
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<ProductResponse> products = productService.searchProductsInCategory(categoryId, keyword, page, size);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/products/discounted")
    public ResponseEntity<?> getDiscountedProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<ProductResponse> products = productService.getDiscountedProducts(page, size);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/products/discounted/brand/{brandId}")
    public ResponseEntity<?> getDiscountedProductsByBrand(
            @PathVariable Integer brandId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<ProductResponse> products = productService.getDiscountedProductsByBrand(brandId, page, size);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/products/discounted/size/{size}")
    public ResponseEntity<?> getDiscountedProductsBySize(
            @PathVariable String sizeInput,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<ProductResponse> products = productService.getDiscountedProductsBySize(sizeInput, page, size);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/products/discount-range")
    public ResponseEntity<?> getProductsByDiscountRange(
            @RequestParam Double minDiscount,
            @RequestParam Double maxDiscount,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            if (minDiscount > maxDiscount) {
                return ResponseEntity.badRequest().body("Mức giảm giá tối thiểu không được lớn hơn mức giảm giá tối đa");
            }
            Page<ProductResponse> products = productService.getProductsByDiscountRange(minDiscount, maxDiscount, page, size);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/products/discounted/brand/{brandId}/size/{size}")
    public ResponseEntity<?> getDiscountedProductsByBrandAndSize(
            @PathVariable Integer brandId,
            @PathVariable String sizeInput,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<ProductResponse> products = productService.getDiscountedProductsByBrandAndSize(brandId, sizeInput, page, size);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/admin/products/{id}/quantity")
    public ResponseEntity<?> updateProductQuantity(
            @PathVariable Integer id,
            @RequestBody UpdateProductQuantityRequest request) {
        try {
            productService.updateProductQuantity(id, request.getSizeValue(), request.getQuantity());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 