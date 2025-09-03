# Setup Google Apps Script untuk Survei Roblox

## Langkah-langkah Setup

### 1. Buat Google Sheets
1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru
3. Beri nama "Survei Genre Game Roblox"
4. Copy ID spreadsheet dari URL (bagian antara `/d/` dan `/edit`)
   
   Contoh URL: `https://docs.google.com/spreadsheets/d/1ABC123XYZ/edit`
   
   ID: `1ABC123XYZ`

### 2. Setup Google Apps Script
1. Buka [Google Apps Script](https://script.google.com)
2. Klik "New Project"
3. Hapus kode default dan paste kode dari `Code.gs`
4. Ganti `YOUR_GOOGLE_SHEETS_ID_HERE` dengan ID spreadsheet Anda
5. Simpan project dengan nama "Roblox Survey API"

### 3. Deploy Web App
1. Di Apps Script, klik "Deploy" → "New deployment"
2. Pilih type: "Web app"
3. Atur konfigurasi:
   - Execute as: Me
   - Who has access: Anyone
4. Klik "Deploy"
5. Copy URL deployment yang diberikan
6. Paste URL tersebut di variabel `googleScript` pada file HTML

### 4. Testing
1. Akses URL deployment di browser untuk test GET request
2. Jalankan fungsi `testSaveData()` di Apps Script editor
3. Cek apakah data muncul di Google Sheets

## Struktur Data di Google Sheets

Sheet akan otomatis dibuat dengan kolom:
- **Timestamp**: Waktu pengisian survei
- **Entry ID**: ID unik untuk setiap sesi survei
- **Genre**: Genre game yang dipilih
- **Waktu Bermain**: Durasi bermain harian
- **IP Address**: Alamat IP (terbatas di Apps Script)
- **User Agent**: Browser information

## Fitur Tambahan

### Export ke CSV
Jalankan fungsi `exportToCSV()` untuk membuat file CSV di Google Drive.

### Statistik Data
Jalankan fungsi `getStats()` untuk mendapatkan ringkasan statistik.

## Troubleshooting

### Error Permission
- Pastikan Apps Script memiliki akses ke Google Sheets
- Berikan permission saat deploy pertama kali

### CORS Error
- Pastikan URL deployment benar
- Cek bahwa web app di-deploy dengan akses "Anyone"

### Data Tidak Tersimpan
- Cek ID spreadsheet sudah benar
- Pastikan sheet tidak di-protect
- Lihat logs di Apps Script untuk error details

## Keamanan

- Web app dengan akses "Anyone" dapat diakses publik
- Untuk production, pertimbangkan autentikasi tambahan
- Monitor usage di Google Cloud Console untuk mencegah abuse

## Alternatif Deployment

Jika menggunakan domain custom:
1. Setup Google Cloud Project
2. Enable Apps Script API
3. Configure OAuth consent screen
4. Deploy dengan domain restrictions
