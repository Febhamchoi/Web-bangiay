package com.shop_shoes.service;

import com.shop_shoes.model.User;
import com.shop_shoes.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(username);
        if (user.isEmpty()) throw new RuntimeException("User not found - " + username);
        return new org.springframework.security.core.userdetails.User(
                user.get().getEmail(),
                String.valueOf(user.get().getId()),
                new ArrayList<>(Collections.singletonList(new SimpleGrantedAuthority(user.get().getRole()))));
    }
}