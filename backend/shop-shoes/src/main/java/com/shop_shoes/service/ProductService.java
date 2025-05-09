package com.shop_shoes.service;

import com.shop_shoes.dto.request.ProductRequest;
import com.shop_shoes.dto.request.SizeRequest;
import com.shop_shoes.dto.response.ProductResponse;
import com.shop_shoes.model.*;
import com.shop_shoes.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductSizeRepository productSizeRepository;

    public ProductResponse createProduct(ProductRequest request) {
        Product product = new Product();
        updateProductFromRequest(product, request);
        return ProductResponse.fromProduct(productRepository.save(product));
    }

    public ProductResponse updateProduct(Integer id, ProductRequest request) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
        
        updateProductFromRequest(product, request);
        return ProductResponse.fromProduct(productRepository.save(product));
    }

    public void deleteProduct(Integer id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy sản phẩm");
        }
        productRepository.deleteById(id);
    }

    public Page<ProductResponse> getProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return productRepository.findAll(pageable).map(ProductResponse::fromProduct);
    }

    public Page<ProductResponse> getProductsByCategory(Integer categoryId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return productRepository.findByCategoryId(categoryId, pageable)
            .map(ProductResponse::fromProduct);
    }

    public Page<ProductResponse> getProductsByBrand(Integer brandId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return productRepository.findByBrandId(brandId, pageable)
            .map(ProductResponse::fromProduct);
    }

    public Page<ProductResponse> searchProducts(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return productRepository.searchByName(keyword, pageable)
            .map(ProductResponse::fromProduct);
    }

    public Page<ProductResponse> getProductsBySize(String sizeInput, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return productRepository.findBySize(Integer.valueOf(sizeInput), pageable)
            .map(ProductResponse::fromProduct);
    }

    public Page<ProductResponse> getProductsByPriceRange(Integer minPrice, Integer maxPrice, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return productRepository.findByPriceRange(minPrice, maxPrice, pageable)
            .map(ProductResponse::fromProduct);
    }

    public Page<ProductResponse> searchProductsInCategory(Integer categoryId, String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return productRepository.searchByNameInCategory(categoryId, keyword, pageable)
            .map(ProductResponse::fromProduct);
    }

    public Page<ProductResponse> getDiscountedProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return productRepository.findDiscountedProducts(pageable)
            .map(ProductResponse::fromProduct);
    }

    public Page<ProductResponse> getDiscountedProductsByBrand(Integer brandId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return productRepository.findDiscountedProductsByBrand(brandId, pageable)
            .map(ProductResponse::fromProduct);
    }

    public Page<ProductResponse> getDiscountedProductsBySize(String sizeInput, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return productRepository.findDiscountedProductsBySize(Integer.valueOf(sizeInput), pageable)
            .map(ProductResponse::fromProduct);
    }

    public Page<ProductResponse> getProductsByDiscountRange(Double minDiscount, Double maxDiscount, int page, int size) {
        if (minDiscount < 0 || maxDiscount > 100) {
            throw new RuntimeException("Mức giảm giá phải từ 0 đến 100%");
        }
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return productRepository.findProductsByDiscountRange(minDiscount, maxDiscount, pageable)
            .map(ProductResponse::fromProduct);
    }

    public Page<ProductResponse> getDiscountedProductsByBrandAndSize(Integer brandId, String sizeInput, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        return productRepository.findDiscountedProductsByBrandAndSize(brandId, Integer.valueOf(sizeInput), pageable)
            .map(ProductResponse::fromProduct);
    }

    public Product getProductById(Integer id) {
        return
            productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
    }

    public void updateProductQuantity(Integer productId, Integer sizeValue, Integer newQuantity) {
        Product product = getProductById(productId);

        ProductSize productSize = product.getProductSizes().stream()
            .filter(ps -> ps.getValue() == sizeValue)
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Không tìm thấy size " + sizeValue + " cho sản phẩm này"));

        productSize.setQuantity(newQuantity);
        productSizeRepository.save(productSize);
        productRepository.save(product);
    }

    private void updateProductFromRequest(Product product, ProductRequest request) {
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setOriginalPrice(request.getOriginalPrice());
        product.setSellingPrice(request.getSellingPrice());
        product.setImageUrl(request.getImageUrl());

        Brand brand = brandRepository.findById(request.getBrandId())
            .orElseThrow(() -> new RuntimeException("Không tìm thấy thương hiệu"));
        Category category = categoryRepository.findById(request.getCategoryId())
            .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));
        
        product.setBrand(brand);
        product.setCategory(category);
        productRepository.save(product);

        for (SizeRequest sizeRequest : request.getSizes()) {
            ProductSize productSize = new ProductSize(null, product, sizeRequest.getQuantity(), sizeRequest.getValue());
            productSizeRepository.save(productSize);
        }
        productRepository.save(product);
    }
} 