package com.example.sr.service;

import com.example.sr.config.UserDetailsImpl;
import com.example.sr.model.User;
import com.example.sr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String sdt) throws UsernameNotFoundException {
        User user = userRepository.findBySdt(sdt)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + sdt));

        return UserDetailsImpl.build(user);
    }
}
