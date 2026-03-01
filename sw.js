const CACHE_NAME = 'weather-app-v1';
const ASSETS_TO_CACHE = [
  '/weather/',
  '/weather/index.html',
  '/weather/404.html',
  '/weather/manifest.json',
  '/weather/assets/css/style.css',
  '/weather/assets/js/app.js',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://img.icons8.com/?size=192&id=x8XPvM3P2afA&format=png&color=000000'
];

// 1. Install: Simpan semua aset statis ke cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Menyiapkan Cache...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // Langsung aktifkan SW tanpa menunggu tab ditutup
  self.skipWaiting();
});

// 2. Activate: Bersihkan cache versi lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('SW: Menghapus Cache Lama:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Ambil kendali klien segera
  self.clients.claim();
});

// 3. Fetch: Strategi penanganan permintaan data
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Strategi Khusus API Cuaca: Network First
  // Kita coba ambil data terbaru dari internet, jika gagal (offline) baru cek cache
  if (url.hostname.includes('api.openweathermap.org')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Simpan hasil API terbaru ke cache untuk penggunaan offline nanti
          const resClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, resClone);
          });
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } 
  // Strategi Aset Statis: Cache First
  else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).catch(() => {
          // Jika user offline dan membuka halaman yang tidak ada di cache, arahkan ke 404
          if (event.request.mode === 'navigate') {
            return caches.match('/weather/404.html');
          }
        });
      })
    );
  }
});