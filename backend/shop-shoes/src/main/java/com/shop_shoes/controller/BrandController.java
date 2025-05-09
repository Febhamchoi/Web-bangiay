package com.shop_shoes.controller;

import com.shop_shoes.dto.request.BrandRequest;
import com.shop_shoes.dto.response.BrandResponse;
import com.shop_shoes.model.Brand;
import com.shop_shoes.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BrandController {
    @Autowired
    private BrandService brandService;

    @PostMapping("/admin/brands")
    public ResponseEntity<?> createBrand(@RequestBody BrandRequest request) {
        try {
            BrandResponse brand = brandService.createBrand(request);
            return ResponseEntity.ok(brand);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/admin/brands/{id}")
    public ResponseEntity<?> updateBrand(@PathVariable Integer id, @RequestBody BrandRequest request) {
        try {
            BrandResponse brand = brandService.updateBrand(id, request);
            return ResponseEntity.ok(brand);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/admin/brands/{id}")
    public ResponseEntity<?> deleteBrand(@PathVariable Integer id) {
        try {
            brandService.deleteBrand(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/brands")
    public ResponseEntity<?> getAllBrands() {
        try {
            return ResponseEntity.ok(brandService.getAllBrands());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/brands/{id}")
    public ResponseEntity<?> getBrandById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(brandService.getBrandById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 