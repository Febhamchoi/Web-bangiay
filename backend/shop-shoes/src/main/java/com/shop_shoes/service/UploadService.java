package com.shop_shoes.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public class UploadService {
    @Autowired
    private Cloudinary cloudinary;

    public String uploadImage(MultipartFile file) throws IOException {
        try {
            Map<?, ?> uploadResult = cloudinary.uploader()
                .upload(file.getBytes(), 
                    ObjectUtils.asMap(
                        "public_id", UUID.randomUUID().toString(),
                        "folder", "shop-shoes"
                    )
                );
            return uploadResult.get("url").toString();
        } catch (IOException e) {
            throw new IOException("Không thể upload file: " + e.getMessage());
        }
    }
} 