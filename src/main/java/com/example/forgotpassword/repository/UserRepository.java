package com.example.forgotpassword.repository;

import com.example.forgotpassword.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByResetToken(String resetToken);
    
    boolean existsByEmail(String email);
    
    boolean existsByUsername(String username);
}