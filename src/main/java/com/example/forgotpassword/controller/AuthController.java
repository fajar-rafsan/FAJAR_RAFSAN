package com.example.forgotpassword.controller;

import com.example.forgotpassword.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    // Show login page
    @GetMapping("/login")
    public String showLoginPage() {
        return "login";
    }
    
    // Show forgot password form
    @GetMapping("/forgot-password")
    public String showForgotPasswordForm() {
        return "forgot-password";
    }
    
    // Process forgot password request
    @PostMapping("/forgot-password")
    public String processForgotPassword(@RequestParam("email") String email, 
                                      RedirectAttributes redirectAttributes) {
        
        if (userService.existsByEmail(email)) {
            boolean success = userService.initiatePasswordReset(email);
            
            if (success) {
                redirectAttributes.addFlashAttribute("successMessage", 
                    "Link reset password telah dikirim ke email Anda. Silakan cek inbox atau spam folder.");
            } else {
                redirectAttributes.addFlashAttribute("errorMessage", 
                    "Terjadi kesalahan saat mengirim email reset password.");
            }
        } else {
            // For security reasons, don't reveal if email exists or not
            redirectAttributes.addFlashAttribute("successMessage", 
                "Jika email tersebut terdaftar, link reset password akan dikirim ke email Anda.");
        }
        
        return "redirect:/forgot-password";
    }
    
    // Show reset password form
    @GetMapping("/reset-password")
    public String showResetPasswordForm(@RequestParam("token") String token, Model model) {
        
        if (userService.isResetTokenValid(token)) {
            model.addAttribute("token", token);
            return "reset-password";
        } else {
            model.addAttribute("errorMessage", "Token reset password tidak valid atau sudah kadaluarsa.");
            return "error";
        }
    }
    
    // Process reset password
    @PostMapping("/reset-password")
    public String processResetPassword(@RequestParam("token") String token,
                                     @RequestParam("password") String password,
                                     @RequestParam("confirmPassword") String confirmPassword,
                                     RedirectAttributes redirectAttributes) {
        
        // Validate password confirmation
        if (!password.equals(confirmPassword)) {
            redirectAttributes.addFlashAttribute("errorMessage", "Password dan konfirmasi password tidak cocok.");
            return "redirect:/reset-password?token=" + token;
        }
        
        // Validate password length
        if (password.length() < 6) {
            redirectAttributes.addFlashAttribute("errorMessage", "Password harus minimal 6 karakter.");
            return "redirect:/reset-password?token=" + token;
        }
        
        boolean success = userService.resetPassword(token, password);
        
        if (success) {
            redirectAttributes.addFlashAttribute("successMessage", 
                "Password berhasil direset. Silakan login dengan password baru Anda.");
            return "redirect:/login";
        } else {
            redirectAttributes.addFlashAttribute("errorMessage", 
                "Token tidak valid atau sudah kadaluarsa. Silakan minta reset password baru.");
            return "redirect:/forgot-password";
        }
    }
    
    // Home page
    @GetMapping("/")
    public String home() {
        return "redirect:/login";
    }
}