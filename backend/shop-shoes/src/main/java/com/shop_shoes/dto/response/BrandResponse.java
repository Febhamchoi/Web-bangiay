package com.shop_shoes.dto.response;

import com.shop_shoes.model.Brand;
import lombok.Data;

@Data
public class BrandResponse {
    private Integer id;
    private String name;
    private String logoUrl;

    public static BrandResponse fromBrand(Brand brand) {
        BrandResponse response = new BrandResponse();
        response.setId(brand.getId());
        response.setName(brand.getName());
        response.setLogoUrl(brand.getLogoUrl());
        return response;
    }
} 