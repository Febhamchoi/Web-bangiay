package com.shop_shoes.service;

import com.shop_shoes.dto.request.UserRequest;
import com.shop_shoes.dto.response.UserResponse;
import com.shop_shoes.model.User;
import com.shop_shoes.repository.UserRepository;
import com.shop_shoes.util.PaginationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartService cartService;

    @Autowired
    private JWTService jwtService;

    public Page<UserResponse> getAllUsers(int page, int size) {
        Pageable pageable = PaginationUtil.getPageable(page, size);
        return userRepository.findAll(pageable).map(UserResponse::fromUser);
    }

    public UserResponse createUser(UserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setAddress(request.getAddress());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() != null ? request.getRole() : "ROLE_USER");
        cartService.createCart(user);

        
        return UserResponse.fromUser(userRepository.save(user));
    }

    public UserResponse updateUser(Integer id, UserRequest request) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        if (!user.getEmail().equals(request.getEmail()) && 
            userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setAddress(request.getAddress());
        
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        
        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }
        
        return UserResponse.fromUser(userRepository.save(user));
    }

    public void deleteUser(Integer id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
            
        userRepository.delete(user);
    }

    public Page<UserResponse> searchUsers(String keyword, int page, int size) {
        Pageable pageable = PaginationUtil.getPageable(page, size);
        return userRepository.searchUsers(keyword, pageable).map(UserResponse::fromUser);
    }

    public User getUserById(Integer userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
    }

    public UserDetailsService loadUserDetailsService() {
        return username -> {
            Optional<User> user = userRepository.findByEmail(username);
            if (user.isEmpty()){
                throw new RuntimeException("User not found - " + username);
            }
            return new org.springframework.security.core.userdetails.User(
                    user.get().getEmail(),
                    user.get().getPassword(),
                    new ArrayList<>(Collections.singletonList(new SimpleGrantedAuthority(user.get().getRole())))
            );
        };
    }
} 