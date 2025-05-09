package com.shop_shoes.service;

import com.shop_shoes.dto.request.CategoryRequest;
import com.shop_shoes.dto.response.CategoryResponse;
import com.shop_shoes.model.Category;
import com.shop_shoes.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryResponse createCategory(CategoryRequest request) {
        // Kiểm tra tên danh mục đã tồn tại chưa
        if (categoryRepository.existsByCategoryName(request.getCategoryName())) {
            throw new RuntimeException("Tên danh mục đã tồn tại");
        }

        Category category = new Category();
        category.setCategoryName(request.getCategoryName());
        category.setDescription(request.getDescription());
        
        return CategoryResponse.fromCategory(categoryRepository.save(category));
    }

    public CategoryResponse updateCategory(Integer id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));

        // Kiểm tra tên mới có trùng với danh mục khác không
        if (!category.getCategoryName().equals(request.getCategoryName()) && 
            categoryRepository.existsByCategoryName(request.getCategoryName())) {
            throw new RuntimeException("Tên danh mục đã tồn tại");
        }

        category.setCategoryName(request.getCategoryName());
        category.setDescription(request.getDescription());
        
        return CategoryResponse.fromCategory(categoryRepository.save(category));
    }

    public void deleteCategory(Integer id) {
        Category category = categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));

        // Kiểm tra xem danh mục có sản phẩm nào không
        if (!category.getProducts().isEmpty()) {
            throw new RuntimeException("Không thể xóa danh mục đang có sản phẩm");
        }

        categoryRepository.delete(category);
    }

    // API cho user thông thường
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
            .map(CategoryResponse::fromCategory)
            .collect(Collectors.toList());
    }

    public CategoryResponse getCategoryById(Integer id) {
        return CategoryResponse.fromCategory(
            categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"))
        );
    }
} 