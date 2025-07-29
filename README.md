# Spring Boot Forgot Password Application

Aplikasi Spring Boot yang menyediakan fitur **Forgot Password** (Lupa Password) dengan sistem reset password melalui email yang aman dan mudah digunakan.

## 🚀 Fitur Utama

- **Form Lupa Password**: Interface yang user-friendly untuk meminta reset password
- **Email Integration**: Pengiriman link reset password otomatis melalui email
- **Token-based Reset**: Sistem token yang aman dengan waktu kadaluarsa
- **Password Validation**: Validasi kekuatan password dengan indikator visual
- **Responsive Design**: UI yang responsif dengan Bootstrap 5 dan Font Awesome
- **Security**: Password encryption dengan BCrypt dan Spring Security

## 🛠️ Teknologi yang Digunakan

- **Spring Boot 3.2.0**
- **Spring Security** - Untuk autentikasi dan autorisasi
- **Spring Data JPA** - Untuk akses database
- **Spring Mail** - Untuk pengiriman email
- **Thymeleaf** - Template engine untuk UI
- **H2 Database** - Database in-memory untuk development
- **Bootstrap 5** - Framework CSS untuk UI
- **Font Awesome** - Icon library

## 📋 Prerequisites

- Java 17 atau lebih tinggi
- Maven 3.6+
- Akun Gmail dengan App Password (untuk email service)

## ⚙️ Setup dan Instalasi

### 1. Clone Repository
```bash
git clone <repository-url>
cd forgot-password-app
```

### 2. Konfigurasi Email
Edit file `src/main/resources/application.properties`:

```properties
# Email Configuration
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

**Cara mendapatkan App Password Gmail:**
1. Login ke akun Gmail Anda
2. Pergi ke Google Account settings
3. Pilih "Security" → "2-Step Verification"
4. Scroll ke bawah dan pilih "App passwords"
5. Generate password untuk aplikasi ini

### 3. Build dan Run
```bash
# Build aplikasi
mvn clean compile

# Run aplikasi
mvn spring-boot:run
```

Aplikasi akan berjalan di `http://localhost:8080`

## 🎯 Cara Menggunakan

### 1. Akses Aplikasi
- Buka browser dan kunjungi `http://localhost:8080`
- Anda akan diarahkan ke halaman login

### 2. Test Forgot Password
- Klik link "Lupa Password?" di halaman login
- Masukkan email yang valid
- Cek email Anda untuk link reset password
- Klik link di email untuk membuat password baru

### 3. Database Console (Development)
- Akses H2 Console: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (kosong)

## 📁 Struktur Project

```
src/
├── main/
│   ├── java/com/example/forgotpassword/
│   │   ├── ForgotPasswordApplication.java
│   │   ├── config/
│   │   │   └── SecurityConfig.java
│   │   ├── controller/
│   │   │   ├── AuthController.java
│   │   │   └── DashboardController.java
│   │   ├── entity/
│   │   │   └── User.java
│   │   ├── repository/
│   │   │   └── UserRepository.java
│   │   └── service/
│   │       ├── UserService.java
│   │       └── EmailService.java
│   └── resources/
│       ├── application.properties
│       └── templates/
│           ├── login.html
│           ├── forgot-password.html
│           ├── reset-password.html
│           ├── error.html
│           └── dashboard.html
```

## 🔐 Endpoint API

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/login` | Halaman login |
| GET | `/forgot-password` | Form lupa password |
| POST | `/forgot-password` | Proses permintaan reset password |
| GET | `/reset-password?token=xxx` | Form reset password |
| POST | `/reset-password` | Proses reset password |
| GET | `/dashboard` | Dashboard setelah login |

## 🔒 Keamanan

- **Password Encryption**: Menggunakan BCrypt untuk enkripsi password
- **Token Expiration**: Token reset password kadaluarsa dalam 1 jam
- **CSRF Protection**: Dapat diaktifkan untuk production
- **Input Validation**: Validasi email dan password
- **Security Headers**: Menggunakan Spring Security default headers

## 🎨 UI Features

- **Modern Design**: Gradient backgrounds dan card-based layout
- **Responsive**: Mendukung desktop dan mobile devices
- **Interactive Elements**: Hover effects dan smooth transitions
- **Password Strength Indicator**: Visual feedback untuk kekuatan password
- **Real-time Validation**: Validasi form secara real-time
- **Alert Messages**: Feedback yang jelas untuk user actions

## 📧 Email Template

Email reset password berisi:
- Link reset yang aman dengan token unik
- Informasi waktu kadaluarsa (1 jam)
- Instruksi keamanan untuk user

## 🐛 Troubleshooting

### Email tidak terkirim
1. Pastikan Gmail App Password sudah benar
2. Cek apakah 2-Step Verification sudah aktif
3. Periksa log aplikasi untuk error details

### Database error
1. Pastikan H2 dependency sudah ada
2. Cek konfigurasi database di application.properties

### Port sudah digunakan
```bash
# Ganti port di application.properties
server.port=8081
```

## 🚀 Production Deployment

Untuk production, ubah konfigurasi berikut:

1. **Database**: Ganti H2 dengan PostgreSQL/MySQL
2. **Email**: Gunakan SMTP server production
3. **Security**: Aktifkan CSRF protection
4. **HTTPS**: Gunakan SSL certificate
5. **Environment Variables**: Pindahkan sensitive data ke environment variables

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

Dibuat dengan ❤️ menggunakan Spring Boot

---

**Selamat menggunakan aplikasi Forgot Password! 🎉**