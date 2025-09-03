const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs').promises;
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware keamanan
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500', 'https://your-frontend-domain.com'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 100, // maksimal 100 request per IP per 15 menit
    message: {
        error: 'Terlalu banyak request, coba lagi nanti.',
        retryAfter: '15 menit'
    }
});
app.use('/api/', limiter);

// Parser JSON
app.use(express.json({ limit: '10mb' }));

// Direktori untuk menyimpan data
const DATA_DIR = path.join(__dirname, 'data');

// Pastikan direktori data ada
async function ensureDataDirectory() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

// Fungsi untuk menyimpan data ke JSON
async function saveToJSON(data) {
    const timestamp = new Date().toISOString();
    const filename = `survey-data-${new Date().toISOString().split('T')[0]}.json`;
    const filepath = path.join(DATA_DIR, filename);
    
    const surveyEntry = {
        timestamp: timestamp,
        id: Date.now().toString(),
        data: data
    };
    
    try {
        // Coba baca file yang sudah ada
        let existingData = [];
        try {
            const fileContent = await fs.readFile(filepath, 'utf8');
            existingData = JSON.parse(fileContent);
        } catch {
            // File belum ada, buat array baru
        }
        
        // Tambahkan data baru
        existingData.push(surveyEntry);
        
        // Simpan kembali
        await fs.writeFile(filepath, JSON.stringify(existingData, null, 2));
        return { success: true, id: surveyEntry.id, filepath };
    } catch (error) {
        throw new Error(`Gagal menyimpan ke JSON: ${error.message}`);
    }
}

// Fungsi untuk menyimpan data ke CSV
async function saveToCSV(data) {
    const date = new Date().toISOString().split('T')[0];
    const filename = `survey-data-${date}.csv`;
    const filepath = path.join(DATA_DIR, filename);
    
    // Flatten data untuk CSV
    const flattenedData = data.map((item, index) => ({
        timestamp: new Date().toISOString(),
        entry_id: Date.now().toString() + '_' + index,
        genre: item.genre,
        waktu: item.waktu
    }));
    
    const csvWriter = createCsvWriter({
        path: filepath,
        header: [
            { id: 'timestamp', title: 'Timestamp' },
            { id: 'entry_id', title: 'Entry ID' },
            { id: 'genre', title: 'Genre' },
            { id: 'waktu', title: 'Waktu Bermain' }
        ],
        append: true
    });
    
    try {
        await csvWriter.writeRecords(flattenedData);
        return { success: true, filepath };
    } catch (error) {
        throw new Error(`Gagal menyimpan ke CSV: ${error.message}`);
    }
}

// API Endpoint untuk menerima data survei
app.post('/api/submit-survey', async (req, res) => {
    try {
        const surveyData = req.body;
        
        // Validasi data
        if (!Array.isArray(surveyData) || surveyData.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Data survei tidak valid atau kosong'
            });
        }
        
        // Validasi setiap item dalam array
        for (const item of surveyData) {
            if (!item.genre || !item.waktu) {
                return res.status(400).json({
                    success: false,
                    error: 'Setiap item harus memiliki genre dan waktu'
                });
            }
        }
        
        console.log('Menerima data survei:', surveyData);
        
        // Simpan ke kedua format
        const jsonResult = await saveToJSON(surveyData);
        const csvResult = await saveToCSV(surveyData);
        
        res.json({
            success: true,
            message: 'Data survei berhasil disimpan',
            data: {
                id: jsonResult.id,
                timestamp: new Date().toISOString(),
                entries: surveyData.length
            },
            files: {
                json: path.basename(jsonResult.filepath),
                csv: path.basename(csvResult.filepath)
            }
        });
        
    } catch (error) {
        console.error('Error menyimpan data survei:', error);
        res.status(500).json({
            success: false,
            error: 'Terjadi kesalahan server internal',
            message: error.message
        });
    }
});

// Endpoint untuk mendapatkan statistik data
app.get('/api/stats', async (req, res) => {
    try {
        const files = await fs.readdir(DATA_DIR);
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        
        let totalEntries = 0;
        let genreStats = {};
        
        for (const file of jsonFiles) {
            const filepath = path.join(DATA_DIR, file);
            const content = await fs.readFile(filepath, 'utf8');
            const data = JSON.parse(content);
            
            for (const entry of data) {
                totalEntries++;
                for (const item of entry.data) {
                    genreStats[item.genre] = (genreStats[item.genre] || 0) + 1;
                }
            }
        }
        
        res.json({
            success: true,
            stats: {
                totalEntries,
                genreStats,
                filesCount: jsonFiles.length
            }
        });
        
    } catch (error) {
        console.error('Error mendapatkan statistik:', error);
        res.status(500).json({
            success: false,
            error: 'Gagal mendapatkan statistik'
        });
    }
});

// Endpoint kesehatan server
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server berjalan dengan baik',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Serve static files (untuk testing)
app.use(express.static(path.join(__dirname, '..'), {
    index: 'survei-genre-roblox.html'
}));

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: 'Terjadi kesalahan server internal'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint tidak ditemukan'
    });
});

// Inisialisasi server
async function startServer() {
    try {
        await ensureDataDirectory();
        
        app.listen(PORT, () => {
            console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
            console.log(`📊 API endpoint: http://localhost:${PORT}/api/submit-survey`);
            console.log(`📈 Statistik: http://localhost:${PORT}/api/stats`);
            console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
            console.log(`📁 Data disimpan di: ${DATA_DIR}`);
        });
    } catch (error) {
        console.error('Gagal menjalankan server:', error);
        process.exit(1);
    }
}

startServer();

module.exports = app;
