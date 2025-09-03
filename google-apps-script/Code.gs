/**
 * Google Apps Script untuk Integrasi Survei Genre Game Roblox
 * 
 * Cara Setup:
 * 1. Buka https://script.google.com
 * 2. Buat project baru
 * 3. Copy paste kode ini ke Code.gs
 * 4. Buat Google Sheets baru dan copy ID-nya
 * 5. Ganti SPREADSHEET_ID dengan ID spreadsheet Anda
 * 6. Deploy sebagai web app dengan akses "Anyone"
 * 7. Copy URL deployment dan gunakan di frontend
 */

// KONFIGURASI - Ganti dengan ID Google Sheets Anda
const SPREADSHEET_ID = '1Eyf-T2a7vh4vRacRFoeOs5Br4u9p-IJTpMqTpH4jLuQ';
const SHEET_NAME = 'Survey Data';

/**
 * Fungsi utama untuk menangani HTTP requests
 */
function doPost(e) {
  try {
    // Parse data JSON dari request
    const requestData = JSON.parse(e.postData.contents);
    
    // Validasi data
    if (!Array.isArray(requestData) || requestData.length === 0) {
      return createResponse(false, 'Data tidak valid atau kosong');
    }
    
    // Proses dan simpan data
    const result = saveToGoogleSheets(requestData);
    
    if (result.success) {
      return createResponse(true, 'Data berhasil disimpan ke Google Sheets', {
        rowsAdded: result.rowsAdded,
        timestamp: new Date().toISOString(),
        sheetUrl: result.sheetUrl
      });
    } else {
      return createResponse(false, result.error);
    }
    
  } catch (error) {
    console.error('Error dalam doPost:', error);
    return createResponse(false, 'Terjadi kesalahan server: ' + error.toString());
  }
}

/**
 * Handle GET requests (untuk testing)
 */
function doGet(e) {
  return createResponse(true, 'Google Apps Script untuk Survei Roblox berjalan dengan baik', {
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}

/**
 * Fungsi untuk menyimpan data ke Google Sheets
 */
function saveToGoogleSheets(surveyData) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet;
    
    // Cek apakah sheet sudah ada
    try {
      sheet = spreadsheet.getSheetByName(SHEET_NAME);
    } catch {
      // Buat sheet baru jika belum ada
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }
    
    // Setup header jika sheet kosong
    if (sheet.getLastRow() === 0) {
      const headers = ['Timestamp', 'Entry ID', 'Genre', 'Waktu Bermain', 'IP Address', 'User Agent'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format header
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }
    
    // Siapkan data untuk disimpan
    const timestamp = new Date();
    const entryId = Utilities.getUuid();
    const ipAddress = getClientIP();
    const userAgent = getUserAgent();
    
    const rowsToAdd = [];
    
    // Buat baris untuk setiap genre yang dipilih
    surveyData.forEach(item => {
      rowsToAdd.push([
        timestamp,
        entryId,
        item.genre,
        item.waktu,
        ipAddress,
        userAgent
      ]);
    });
    
    // Tambahkan data ke sheet
    if (rowsToAdd.length > 0) {
      const startRow = sheet.getLastRow() + 1;
      const range = sheet.getRange(startRow, 1, rowsToAdd.length, 6);
      range.setValues(rowsToAdd);
      
      // Format tanggal
      const timestampRange = sheet.getRange(startRow, 1, rowsToAdd.length, 1);
      timestampRange.setNumberFormat('dd/mm/yyyy hh:mm:ss');
    }
    
    // Auto-resize kolom
    sheet.autoResizeColumns(1, 6);
    
    return {
      success: true,
      rowsAdded: rowsToAdd.length,
      sheetUrl: spreadsheet.getUrl()
    };
    
  } catch (error) {
    console.error('Error menyimpan ke Google Sheets:', error);
    return {
      success: false,
      error: 'Gagal menyimpan ke Google Sheets: ' + error.toString()
    };
  }
}

/**
 * Fungsi untuk membuat response JSON
 */
function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  if (data) {
    response.data = data;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Fungsi helper untuk mendapatkan IP client (terbatas di Apps Script)
 */
function getClientIP() {
  try {
    // Apps Script tidak bisa mendapatkan IP real client
    return 'Unknown (Apps Script limitation)';
  } catch {
    return 'Unknown';
  }
}

/**
 * Fungsi helper untuk mendapatkan User Agent (terbatas di Apps Script)
 */
function getUserAgent() {
  try {
    // Apps Script tidak bisa mendapatkan User Agent real
    return 'Google Apps Script';
  } catch {
    return 'Unknown';
  }
}

/**
 * Fungsi untuk testing (bisa dipanggil dari editor Apps Script)
 */
function testSaveData() {
  const testData = [
    { genre: 'Action', waktu: '60 - 89 Menit' },
    { genre: 'RPG', waktu: '90 - 119 Menit' }
  ];
  
  const result = saveToGoogleSheets(testData);
  console.log('Test result:', result);
  
  return result;
}

/**
 * Fungsi untuk mendapatkan statistik data
 */
function getStats() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return {
        success: true,
        stats: {
          totalEntries: 0,
          genres: {},
          waktuBermain: {}
        }
      };
    }
    
    // Ambil semua data (skip header)
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues();
    
    const stats = {
      totalEntries: data.length,
      genres: {},
      waktuBermain: {},
      lastUpdate: new Date().toISOString()
    };
    
    // Hitung statistik
    data.forEach(row => {
      const genre = row[2]; // Kolom Genre
      const waktu = row[3]; // Kolom Waktu Bermain
      
      // Hitung genre
      stats.genres[genre] = (stats.genres[genre] || 0) + 1;
      
      // Hitung waktu bermain
      stats.waktuBermain[waktu] = (stats.waktuBermain[waktu] || 0) + 1;
    });
    
    return {
      success: true,
      stats: stats
    };
    
  } catch (error) {
    console.error('Error mendapatkan statistik:', error);
    return {
      success: false,
      error: 'Gagal mendapatkan statistik: ' + error.toString()
    };
  }
}

/**
 * Fungsi untuk export data ke CSV (bisa dipanggil manual)
 */
function exportToCSV() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      throw new Error('Sheet tidak ditemukan');
    }
    
    // Ambil semua data
    const data = sheet.getDataRange().getValues();
    
    // Convert ke CSV
    const csv = data.map(row => 
      row.map(cell => 
        typeof cell === 'string' && cell.includes(',') 
          ? `"${cell}"` 
          : cell
      ).join(',')
    ).join('\n');
    
    // Buat file di Google Drive
    const blob = Utilities.newBlob(csv, 'text/csv', `survey-data-${new Date().toISOString().split('T')[0]}.csv`);
    const file = DriveApp.createFile(blob);
    
    return {
      success: true,
      message: 'Data berhasil diekspor ke CSV',
      fileUrl: file.getUrl(),
      fileName: file.getName()
    };
    
  } catch (error) {
    console.error('Error export CSV:', error);
    return {
      success: false,
      error: 'Gagal export CSV: ' + error.toString()
    };
  }
}
