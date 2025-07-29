package com.example.forgotpassword.service;

import com.example.forgotpassword.entity.User;
import com.example.forgotpassword.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private EmailService emailService;
    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> findByResetToken(String token) {
        return userRepository.findByResetToken(token);
    }
    
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    
    public boolean initiatePasswordReset(String email) {
        Optional<User> userOptional = findByEmail(email);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // Generate reset token
            String resetToken = UUID.randomUUID().toString();
            user.setResetToken(resetToken);
            user.setResetTokenExpiry(LocalDateTime.now().plusHours(1)); // Token valid for 1 hour
            
            userRepository.save(user);
            
            // Send reset email
            String resetUrl = "http://localhost:8080/reset-password?token=" + resetToken;
            emailService.sendPasswordResetEmail(user.getEmail(), resetUrl);
            
            return true;
        }
        
        return false;
    }
    
    public boolean resetPassword(String token, String newPassword) {
        Optional<User> userOptional = findByResetToken(token);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            // Check if token is still valid
            if (user.getResetTokenExpiry().isAfter(LocalDateTime.now())) {
                user.setPassword(passwordEncoder.encode(newPassword));
                user.setResetToken(null);
                user.setResetTokenExpiry(null);
                userRepository.save(user);
                return true;
            }
        }
        
        return false;
    }
    
    public boolean isResetTokenValid(String token) {
        Optional<User> userOptional = findByResetToken(token);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getResetTokenExpiry().isAfter(LocalDateTime.now());
        }
        
        return false;
    }
    
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}