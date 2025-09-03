# 🎮 Survei Genre Game Roblox - Implementation Guide

## 📋 Deskripsi Project
Website survei interaktif untuk mengumpulkan data preferensi genre game Roblox dari pengguna, dengan sistem pengumpulan data yang komprehensif dan multiple deployment options.

## 🌟 Fitur
- ✅ Form survei interaktif dengan validasi real-time
- ✅ Multiple opsi penyimpanan data (Backend API, Google Sheets, Local Storage)
- ✅ Responsive design dengan animasi smooth
- ✅ Loading states dan error handling
- ✅ Notifikasi user-friendly
- ✅ Auto-export ke JSON dan CSV
- ✅ Statistics dashboard
- ✅ Form reset setelah submission

## 🗂️ Struktur Project
```
Tugas-satistika-Form-1/
├── survei-genre-roblox.html          # Frontend utama
├── backend/                          # Node.js API Server
│   ├── server.js                     # Express server
│   ├── package.json                  # Dependencies
│   └── data/                         # Generated data folder
├── google-apps-script/               # Google Sheets integration
│   ├── Code.gs                       # Apps Script code
│   └── README.md                     # Setup instructions
└── README.md                         # Documentation
```

## 🚀 Quick Start

### Option 1: Node.js Backend (Recommended)

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Start Server**
   ```bash
   npm start
   # atau untuk development:
   npm run dev
   ```

3. **Open Frontend**
   - Buka `survei-genre-roblox.html` di browser
   - Atau akses via http://localhost:3000

### Option 2: Google Sheets Integration

1. Follow instructions in `google-apps-script/README.md`
2. Update `CURRENT_API` di HTML ke `API_CONFIG.googleScript`
3. Ganti URL dengan deployment URL Anda

### Option 3: Local Storage Only

1. Buka `survei-genre-roblox.html` langsung di browser
2. Data akan tersimpan di localStorage browser

## 🔧 Konfigurasi

### Backend API Configuration
Edit `backend/server.js`:
- **Port**: Default 3000, ubah via `process.env.PORT`
- **CORS**: Tambahkan domain Anda di `cors.origin`
- **Rate Limiting**: Adjust di `rateLimit` settings
- **Data Directory**: Default `./data`

### Frontend Configuration
Edit `survei-genre-roblox.html`:
```javascript
const API_CONFIG = {
    local: 'http://localhost:3000/api/submit-survey',
    googleScript: 'YOUR_GOOGLE_APPS_SCRIPT_URL',
    powerAutomate: 'YOUR_POWER_AUTOMATE_URL'
};

// Pilih endpoint yang aktif
const CURRENT_API = API_CONFIG.local; // Ubah sesuai kebutuhan
```

## 📊 Data Format

### Input Data
```json
[
  {
    "genre": "Action",
    "waktu": "60 - 89 Menit"
  },
  {
    "genre": "RPG", 
    "waktu": "90 - 119 Menit"
  }
]
```

### Output Data (Backend)
```json
{
  "success": true,
  "message": "Data survei berhasil disimpan",
  "data": {
    "id": "1638360000000",
    "timestamp": "2024-01-01T10:00:00.000Z",
    "entries": 2
  },
  "files": {
    "json": "survey-data-2024-01-01.json",
    "csv": "survey-data-2024-01-01.csv"
  }
}
```

## 🛠️ API Endpoints

### Backend Server

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/submit-survey` | Submit survey data |
| GET | `/api/stats` | Get statistics |
| GET | `/api/health` | Health check |

### Usage Examples

```javascript
// Submit data
fetch('/api/submit-survey', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(surveyData)
});

// Get statistics
fetch('/api/stats')
  .then(response => response.json())
  .then(stats => console.log(stats));
```

## 📈 Deployment Options

### 1. Local Development
```bash
cd backend
npm install
npm start
```

### 2. Cloud Deployment

#### Heroku
```bash
# Install Heroku CLI
heroku create your-app-name
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

#### Vercel
```bash
# Install Vercel CLI
vercel
# Follow prompts
```

#### DigitalOcean/AWS/GCP
- Upload ke server
- Install Node.js dan npm
- Run `npm install && npm start`
- Setup reverse proxy (Nginx) jika perlu

### 3. Static Hosting (Frontend Only)
- Upload `survei-genre-roblox.html` ke:
  - GitHub Pages
  - Netlify
  - Vercel
  - Firebase Hosting
- Set `CURRENT_API` ke Google Apps Script URL

## 🔒 Security Considerations

### Backend Security
- ✅ Helmet.js untuk security headers
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Input validation
- ✅ Error handling

### Additional Recommendations
- Implement authentication untuk production
- Add HTTPS/SSL certificates
- Monitor dan log requests
- Setup backup untuk data
- Implement data retention policies

## 🎨 Customization

### UI/UX Modifications
- **Colors**: Edit CSS custom properties
- **Fonts**: Ganti Google Fonts URL
- **Animations**: Modify CSS animations
- **Layout**: Adjust responsive breakpoints

### Functionality Extensions
- Add more genre options
- Implement user demographics
- Add data visualization
- Multi-language support
- Email notifications

## 📊 Data Analysis

### Generated Files
- **JSON**: Raw structured data untuk programmatic analysis
- **CSV**: Compatible dengan Excel, Google Sheets, SPSS, R, Python
- **Local Storage**: Browser-based temporary storage

### Analysis Tools
- **Excel/Google Sheets**: Basic statistics dan charts
- **Python**: pandas, matplotlib, seaborn
- **R**: Data analysis dan visualization
- **Power BI/Tableau**: Advanced dashboards

## 🐛 Troubleshooting

### Common Issues

1. **CORS Error**
   - Cek CORS configuration di backend
   - Pastikan frontend domain di-whitelist

2. **Connection Refused**
   - Pastikan backend server running
   - Cek port yang benar

3. **Data Not Saving**
   - Cek network tab di developer tools
   - Verify API endpoint URLs
   - Check server logs

4. **Google Sheets Issues**
   - Verify spreadsheet ID
   - Check Apps Script permissions
   - Ensure proper deployment settings

### Debug Tips
- Buka Developer Tools → Console untuk error logs
- Check Network tab untuk failed requests
- Verify JSON format di request/response
- Test API endpoints dengan Postman/curl

## 📝 License
MIT License - Feel free to use and modify for your projects.

## 🤝 Contributing
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support
- Open issue di GitHub repository
- Check documentation di wiki
- Review existing issues untuk solutions

---

**Happy Coding! 🚀**
Form 1 untuk mencari pemain roblox
