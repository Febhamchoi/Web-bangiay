package com.shop_shoes.dto.response;

import com.shop_shoes.model.Category;
import lombok.Data;

@Data
public class CategoryResponse {
    private Integer id;
    private String categoryName;
    private String description;

    public static CategoryResponse fromCategory(Category category) {
        CategoryResponse response = new CategoryResponse();
        response.setId(category.getId());
        response.setCategoryName(category.getCategoryName());
        response.setDescription(category.getDescription());
        return response;
    }
} 