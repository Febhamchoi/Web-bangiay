package com.shop_shoes.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class ProductRequest {
    private String name;
    private Integer brandId;
    private Integer categoryId;
    private String description;
    private List<SizeRequest> sizes;
    private Integer originalPrice;
    private Integer sellingPrice;
    private String imageUrl;
}
