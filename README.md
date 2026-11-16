# Kelompok 10 
Faith Razqy Allefra 057
Muh. Afif Hamka 058
Iman Nugraha 079

# Decantnajah Palu

Website Decantnajah Palu merupakan website yang dibuat untuk menampilkan informasi dan produk Decantnajah.

## CI/CD Pipeline

Proyek ini menggunakan GitHub Actions untuk menjalankan Continuous Integration (CI) secara otomatis.

[![Decantnajah CI Pipeline](https://github.com/afifhamkaa/Decantnajah-Palu/actions/workflows/ci.yml/badge.svg)](https://github.com/afifhamkaa/Decantnajah-Palu/actions)

## Teknologi yang Digunakan

- HTML
- CSS
- JavaScript
- Node.js
- Git dan GitHub
- GitHub Actions

## Proses CI Pipeline

Pipeline dijalankan secara otomatis ketika terdapat:

- Push ke branch main.
- Pull Request menuju branch main.

Tahapan pipeline:

1. Checkout Repository: mengambil kode sumber dari repository.
2. Setup Node.js: menyiapkan lingkungan Node.js versi 22.
3. Install Dependencies: memasang dependensi menggunakan npm ci.
4. Build Website: menjalankan pemeriksaan build melalui npm run build.
5. Run Tests: menjalankan pengujian otomatis menggunakan npm test.

## Menjalankan Proyek Secara Lokal

Pastikan Node.js sudah terinstal.

Install dependencies:

```bash
npm install
```

Menjalankan build:

```bash
npm run build
```

Menjalankan test:

```bash
npm test
```

## Pengujian Otomatis

Pengujian dilakukan menggunakan Node.js Test Runner.

Pengujian meliputi:

1. Memastikan file index.html tersedia.
2. Memastikan file CSS dan JavaScript tersedia.
3. Memastikan data produk memiliki format JSON yang valid.
4. Memastikan file JavaScript tidak memiliki syntax error.

## Bukti Hasil CI Pipeline

Pengujian telah dilakukan dengan tiga hasil berikut:

| Pengujian | Commit | Hasil |
|---|---|---|
| Pipeline awal | 837ef65 | Berhasil |
| Simulasi kegagalan | 9b2bd72 | Gagal |
| Perbaikan pengujian | 525cf16 | Berhasil |

## Repository

GitHub:
https://github.com/afifhamkaa/Decantnajah-Palu

GitHub Actions:
https://github.com/afifhamkaa/Decantnajah-Palu/actions
