# 🌤️ CuacaKita - Modern Weather Dashboard (PWA)

**CuacaKita** adalah aplikasi prakiraan cuaca berbasis web yang dibangun menggunakan **Jekyll**. Aplikasi ini menawarkan antarmuka modern dengan efek *Glassmorphism*, fitur deteksi lokasi otomatis, dan sekarang mendukung **PWA (Progressive Web App)** sehingga dapat diinstal di HP/Desktop dan diakses secara offline.

---

## ✨ Fitur Utama

* 📍 **Auto-Location (Geolocation):** Mendeteksi cuaca di lokasi pengguna secara otomatis saat aplikasi dibuka.
* 🔍 **Pencarian Kota:** Cari prakiraan cuaca di berbagai kota di seluruh dunia.
* 📅 **Prakiraan 5 Hari:** Menampilkan prediksi cuaca untuk 5 hari ke depan secara mendetail.
* 🎨 **Tema Dinamis:** Latar belakang aplikasi berubah secara otomatis menyesuaikan kondisi cuaca.
* 📱 **PWA Ready:** Dapat diinstal di Android, iOS, dan Windows (Add to Home Screen).
* 📶 **Offline Support:** Tetap dapat dibuka meskipun tanpa koneksi internet berkat *Service Worker*.
* ✨ **UI/UX Modern:** Desain *Glassmorphism* dengan animasi halus dan responsif.

---

## 🚀 Teknologi yang Digunakan

* **Static Site Generator:** [Jekyll](https://jekyllrb.com/)
* **Data API:** [OpenWeatherMap API](https://openweathermap.org/api)
* **PWA:** Service Workers & Web App Manifest
* **Icons:** [FontAwesome 6](https://fontawesome.com/) & Icons8
* **Styling:** CSS3 (Grid, Flexbox, Glassmorphism)
* **Logic:** Vanilla JavaScript (Fetch API & Geolocation API)

---

## 🛠️ Instalasi & Penggunaan

### 1. Prasyarat
Pastikan Anda sudah menginstal Ruby dan Jekyll. Jika belum, ikuti panduannya [di sini](https://jekyllrb.com/docs/installation/).

### 2. Kloning Proyek

```bash
git clone https://github.com/IshikawaUta/weather.git
cd weather
```

### 3. Konfigurasi API Key

Buka file `assets/js/app.js` dan masukkan API Key [OpenWeatherMap](https://openweathermap.org/) Anda:

```javascript
const apiKey = "MASUKKAN_API_KEY_ANDA_DISINI";
```

### 4. Jalankan Secara Lokal

```bash
bundle exec jekyll serve
```

Akses aplikasi di `http://localhost:4000/weather/`.

---

## 📂 Struktur Folder Terbaru

```text
.
├── _layouts/          # Template layout utama (default.html)
├── assets/
│   ├── css/           # File styling (Glassmorphism & Animations)
│   └── js/            # Logika aplikasi, API, & Registrasi PWA
├── manifest.json      # Konfigurasi instalasi PWA
├── sw.js              # Service Worker (Caching & Offline Logic)
├── index.html         # Halaman utama aplikasi
├── 404.html           # Halaman error kustom (PWA Fallback)
├── _config.yml        # Konfigurasi Jekyll (baseurl, url)
└── README.md          # Dokumentasi proyek
```

---

## 📲 Cara Instalasi (PWA)

1. **Desktop (Chrome/Edge):** Klik ikon "Install" di ujung kanan address bar.
2. **Android (Chrome):** Klik titik tiga di pojok kanan atas, lalu pilih "Tambahkan ke Layar Utama".
3. **iOS (Safari):** Klik ikon "Share", lalu pilih "Add to Home Screen".

---

## 🤝 Kontribusi

Kontribusi, isu, dan permintaan fitur sangat dipersilakan! Silakan buka *Pull Request* atau *Issue* di repository ini.

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License.