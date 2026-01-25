# 🌤️ CuacaKita - Modern Weather Dashboard

**CuacaKita** adalah aplikasi prakiraan cuaca berbasis web yang dibangun menggunakan **Jekyll**. Aplikasi ini menawarkan antarmuka modern dengan efek *Glassmorphism*, fitur deteksi lokasi otomatis, dan perubahan tema dinamis yang menyesuaikan dengan kondisi cuaca di lokasi pengguna.

---

## ✨ Fitur Utama

* 📍 **Auto-Location (Geolocation):** Mendeteksi cuaca di lokasi pengguna secara otomatis saat aplikasi dibuka.
* 🔍 **Pencarian Kota:** Cari prakiraan cuaca di berbagai kota di seluruh dunia.
* 📅 **Prakiraan 5 Hari:** Menampilkan prediksi cuaca untuk 5 hari ke depan secara mendetail.
* 🎨 **Tema Dinamis:** Latar belakang aplikasi berubah secara otomatis (misal: biru gelap saat hujan, kuning cerah saat panas).
* ✨ **UI/UX Modern:** Menggunakan desain *Glassmorphism*, animasi floating pada ikon, dan efek loading yang halus.
* 📱 **Responsive Design:** Tampilan optimal baik di desktop maupun perangkat seluler (mobile-friendly).

---

## 🚀 Teknologi yang Digunakan

* **Static Site Generator:** [Jekyll](https://jekyllrb.com/)
* **Data API:** [OpenWeatherMap API](https://openweathermap.org/api)
* **Icons:** [FontAwesome 6](https://fontawesome.com/)
* **Fonts:** [Google Fonts (Poppins)](https://fonts.google.com/)
* **Styling:** CSS3 (Grid, Flexbox, Glassmorphism, Keyframe Animations)
* **Logic:** Vanilla JavaScript (Fetch API & Geolocation API)

---

## 🛠️ Instalasi & Penggunaan

### 1. Prasyarat
Pastikan Anda sudah menginstal Ruby dan Jekyll di perangkat Anda. Jika belum, ikuti panduannya [di sini](https://jekyllrb.com/docs/installation/).

### 2. Kloning Proyek
```bash
git clone https://github.com/IshikawaUta/weather.git
cd weather

```

### 3. Konfigurasi API Key

Dapatkan API Key gratis di [OpenWeatherMap](https://openweathermap.org/).
Buka file `assets/js/app.js` dan ganti bagian berikut:

```javascript
const apiKey = "MASUKKAN_API_KEY_ANDA_DISINI";

```

### 4. Jalankan Secara Lokal

```bash
bundle exec jekyll serve

```

Buka browser dan akses `http://localhost:4000`.

---

## 📂 Struktur Folder

```text
.
├── _layouts/           # Template utama (header, footer, dll)
├── assets/
│   ├── css/            # File styling (Custom Modern Theme)
│   └── js/             # Logika aplikasi & integrasi API
├── index.html          # Halaman utama aplikasi
├── _config.yml         # Konfigurasi Jekyll
└── README.md           # Dokumentasi proyek

```

---

## 🤝 Kontribusi

Kontribusi, isu, dan permintaan fitur sangat dipersilakan! Jangan ragu untuk mengecek [halaman isu](https://www.google.com/search?q=https://github.com/IshikawaUta/weather/issues).

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License.

---