package com.shop_shoes.dto.response;

import com.shop_shoes.model.Product;
import lombok.Data;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ProductResponse {
    private Integer id;
    private String name;
    private String description;
    private Integer quantity;
    private Integer originalPrice;
    private Integer sellingPrice;
    private String imageUrl;
    private BrandResponse brand;
    private CategoryResponse category;
    private List<ProductSizeResponse> sizes;

    public static ProductResponse fromProduct(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setOriginalPrice(product.getOriginalPrice());
        response.setSellingPrice(product.getSellingPrice());
        response.setImageUrl(product.getImageUrl());

        if (product.getBrand() != null) {
            BrandResponse brandResponse = new BrandResponse();
            brandResponse.setId(product.getBrand().getId());
            brandResponse.setName(product.getBrand().getName());
            response.setBrand(brandResponse);
        }

        if (product.getCategory() != null) {
            CategoryResponse categoryResponse = new CategoryResponse();
            categoryResponse.setId(product.getCategory().getId());
            categoryResponse.setCategoryName(product.getCategory().getCategoryName());
            response.setCategory(categoryResponse);
        }

        if (product.getProductSizes() != null) {
            response.setSizes(product.getProductSizes().stream()
                .map(productSize -> {
                    ProductSizeResponse sizeResponse = new ProductSizeResponse();
                    sizeResponse.setValue(productSize.getValue());
                    sizeResponse.setQuantity(productSize.getQuantity());
                    return sizeResponse;
                })
                .collect(Collectors.toList()));
        }

        return response;
    }
} 