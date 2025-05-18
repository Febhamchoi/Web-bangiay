package com.shop_shoes.config;

import com.cloudinary.Cloudinary;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        Dotenv dotenv = Dotenv.load();
        return new Cloudinary("cloudinary://156672583239517:AlF3WC2a6HB-wk8h8vVeDd_gOCQ@dgijyhzgv");
    }
} 