package com.example.forgotpassword.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    public void sendPasswordResetEmail(String to, String resetUrl) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Reset Password Request");
        message.setText("Untuk mereset password Anda, silakan klik link berikut:\n\n" + 
                       resetUrl + "\n\n" +
                       "Link ini akan kadaluarsa dalam 1 jam.\n\n" +
                       "Jika Anda tidak meminta reset password, abaikan email ini.");
        
        mailSender.send(message);
    }
}