package com.shop_shoes.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PaginationUtil {
    private static final int MIN_PAGE = 0;
    private static final int MIN_SIZE = 1;
    private static final int MAX_SIZE = 100;
    private static final String DEFAULT_SORT = "id";

    public static Pageable getPageable(int page, int size) {
        return getPageable(page, size, DEFAULT_SORT);
    }

    public static Pageable getPageable(int page, int size, String sortBy) {
        if (page < MIN_PAGE) {
            page = MIN_PAGE;
        }
        if (size < MIN_SIZE) {
            size = MIN_SIZE;
        }
        if (size > MAX_SIZE) {
            size = MAX_SIZE;
        }
        return PageRequest.of(page, size, Sort.by(sortBy).descending());
    }
} 