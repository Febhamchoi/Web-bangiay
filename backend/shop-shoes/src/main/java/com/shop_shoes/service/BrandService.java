package com.shop_shoes.service;

import com.shop_shoes.dto.request.BrandRequest;
import com.shop_shoes.dto.response.BrandResponse;
import com.shop_shoes.model.Brand;
import com.shop_shoes.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BrandService {
    @Autowired
    private BrandRepository brandRepository;

    public BrandResponse createBrand(BrandRequest request) {
        if (brandRepository.existsByName(request.getName())) {
            throw new RuntimeException("Tên thương hiệu đã tồn tại");
        }

        Brand brand = new Brand();
        brand.setName(request.getName());
        brand.setLogoUrl(request.getLogoUrl());
        
        return BrandResponse.fromBrand(brandRepository.save(brand));
    }

    public BrandResponse updateBrand(Integer id, BrandRequest request) {
        Brand brand = brandRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy thương hiệu"));

        if (!brand.getName().equals(request.getName()) && 
            brandRepository.existsByName(request.getName())) {
            throw new RuntimeException("Tên thương hiệu đã tồn tại");
        }

        brand.setName(request.getName());
        brand.setLogoUrl(request.getLogoUrl());
        
        return BrandResponse.fromBrand(brandRepository.save(brand));
    }

    public void deleteBrand(Integer id) {
        Brand brand = brandRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy thương hiệu"));

        if (!brand.getProducts().isEmpty()) {
            throw new RuntimeException("Không thể xóa thương hiệu đang có sản phẩm");
        }

        brandRepository.delete(brand);
    }

    public List<BrandResponse> getAllBrands() {
        return brandRepository.findAll().stream()
            .map(BrandResponse::fromBrand)
            .collect(Collectors.toList());
    }

    public BrandResponse getBrandById(Integer id) {
        return BrandResponse.fromBrand(
            brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thương hiệu"))
        );
    }
} 