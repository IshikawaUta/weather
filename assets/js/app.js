const apiKey = "2e828d6cfd738df2af2f9511ef50f06c";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=id";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=id";

// Seleksi Elemen DOM
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-btn");
const loader = document.getElementById("loader");
const errorBox = document.getElementById("error-msg");
const weatherContent = document.getElementById("weather-data");

// 1. Fungsi Utama Ambil Cuaca (Berdasarkan Nama Kota)
async function checkWeather(city) {
    if (!city) return;
    showLoader();
    try {
        const response = await fetch(`${weatherUrl}&q=${city}&appid=${apiKey}`);
        if (response.status == 404) {
            showError("Kota tidak ditemukan!");
        } else {
            const data = await response.json();
            updateUI(data);
            getForecast(city);
        }
    } catch (err) {
        showError("Gagal memuat data. Periksa koneksi internet Anda.");
    }
}

// 2. Fungsi Ambil Cuaca (Berdasarkan Koordinat GPS)
async function checkWeatherByCoords(lat, lon) {
    showLoader();
    try {
        const response = await fetch(`${weatherUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await response.json();
        updateUI(data);
        getForecast(data.name);
    } catch (err) {
        showError("Gagal mendeteksi lokasi.");
    }
}

// 3. Fungsi Ambil Forecast 5 Hari
async function getForecast(city) {
    try {
        const response = await fetch(`${forecastUrl}&q=${city}&appid=${apiKey}`);
        const data = await response.json();
        const container = document.getElementById("forecast-container");
        
        if (!container) return; // Keamanan jika elemen tidak ada di halaman (seperti 404)
        
        container.innerHTML = "";
        // Ambil data setiap interval 24 jam (indeks 7, 15, 23, 31, 39)
        for (let i = 7; i < data.list.length; i += 8) {
            const dayData = data.list[i];
            const date = new Date(dayData.dt * 1000);
            const dayName = date.toLocaleDateString('id-ID', { weekday: 'short' });
            
            container.innerHTML += `
                <div class="forecast-item">
                    <p>${dayName}</p>
                    <img src="https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png" alt="icon">
                    <p><strong>${Math.round(dayData.main.temp)}°</strong></p>
                </div>
            `;
        }
    } catch (err) { 
        console.error("Forecast Error:", err); 
    }
}

// 4. Update Tampilan UI Utama
function updateUI(data) {
    if (!weatherContent) return;

    const cityNameElem = document.getElementById("city-name");
    const tempElem = document.getElementById("temp");
    const descElem = document.getElementById("description");
    const humidityElem = document.getElementById("humidity");
    const windElem = document.getElementById("wind");
    const iconElem = document.getElementById("weather-icon");
    const dateElem = document.getElementById("date");

    if (cityNameElem) cityNameElem.innerText = `${data.name}, ${data.sys.country}`;
    if (tempElem) tempElem.innerText = Math.round(data.main.temp);
    if (descElem) descElem.innerText = data.weather[0].description;
    if (humidityElem) humidityElem.innerText = data.main.humidity + "%";
    if (windElem) windElem.innerText = data.wind.speed + " km/h";
    if (iconElem) iconElem.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    
    const now = new Date();
    if (dateElem) {
        dateElem.innerText = now.toLocaleDateString('id-ID', { 
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
        });
    }

    updateTheme(data.weather[0].main);
    
    weatherContent.classList.remove("hidden");
    if (errorBox) errorBox.classList.add("hidden");
    hideLoader();
}

// 5. Update Background Berdasarkan Kondisi Cuaca
function updateTheme(condition) {
    const themes = {
        Clear: "linear-gradient(135deg, #fceabb, #f8b500)",
        Clouds: "linear-gradient(135deg, #bdc3c7, #2c3e50)",
        Rain: "linear-gradient(135deg, #4b6cb7, #182848)",
        Thunderstorm: "linear-gradient(135deg, #1e130c, #9a8478)",
        Snow: "linear-gradient(135deg, #e6e9f0, #eef1f5)",
        Mist: "linear-gradient(135deg, #606c88, #3f4c6b)"
    };
    document.body.style.background = themes[condition] || "linear-gradient(135deg, #1e3c72, #2a5298)";
}

// 6. Geolocation & Helpers
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (p) => checkWeatherByCoords(p.coords.latitude, p.coords.longitude),
            () => checkWeather("Jakarta")
        );
    } else { 
        checkWeather("Jakarta"); 
    }
}

function showLoader() { 
    if (loader) { 
        loader.style.display = 'flex'; 
        loader.style.opacity = '1'; 
    } 
}

function hideLoader() { 
    if (loader) { 
        loader.style.opacity = '0'; 
        setTimeout(() => loader.style.display = 'none', 500); 
    } 
}

function showError(message) { 
    if (errorBox) {
        errorBox.innerHTML = `<i class="fas fa-circle-exclamation"></i> ${message}`;
        errorBox.classList.remove("hidden"); 
    }
    if (weatherContent) weatherContent.classList.add("hidden"); 
    hideLoader(); 
}

// --- LOGIKA PWA & EVENT LISTENERS ---

// Registrasi Service Worker Dinamis
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Deteksi base path secara otomatis
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const swPath = isLocal ? '/weather/sw.js' : '/weather/sw.js'; 

        navigator.serviceWorker.register(swPath)
            .then(reg => console.log('PWA Service Worker terdaftar!', reg.scope))
            .catch(err => console.warn('PWA Service Worker gagal:', err));
    });
}

// Event Listeners dengan pengecekan elemen (Agar tidak error di halaman selain index)
if (searchBtn && cityInput) {
    searchBtn.addEventListener("click", () => checkWeather(cityInput.value));
    cityInput.addEventListener("keypress", (e) => { 
        if(e.key === "Enter") checkWeather(cityInput.value); 
    });
}

if (locationBtn) {
    locationBtn.addEventListener("click", getLocation);
}

// Jalankan pencarian otomatis hanya jika elemen weather-data ada (Halaman utama)
if (weatherContent) {
    window.addEventListener("load", getLocation);
}