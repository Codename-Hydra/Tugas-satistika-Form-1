# File yang Perlu di-Upload ke GitHub

## ✅ Files untuk GitHub Pages Hosting:

### 🎯 Files Utama (WAJIB):
1. **index.html** - Main survey form (GitHub Pages akan otomatis serve ini)
2. **README-github.md** - Rename jadi README.md untuk GitHub
3. **Screenshot 2025-09-03 171950.png** - Preview image
4. **demo.html** - Demo dashboard (opsional)

### 📁 Folders (PENTING):
1. **google-apps-script/** - Untuk Google Sheets integration
   - Code.gs (sudah dikonfigurasi dengan Spreadsheet ID)
   - README.md

2. **backend/** - Untuk optional local development
   - server.js
   - package.json
   - Folder data/ akan auto-generated

### 🚫 Files yang TIDAK perlu di-upload:
- **node_modules/** (akan di-generate saat npm install)
- **backend/data/** (auto-generated)
- Files temporary atau cache

## 🔧 Steps untuk Upload ke GitHub:

### 1. Persiapan Repository
```bash
# Jika belum ada repo, buat dulu di GitHub.com
# Nama: Tugas-satistika-Form-1

# Clone atau init
git init
git remote add origin https://github.com/Codename-Hydra/Tugas-satistika-Form-1.git
```

### 2. Upload Files
```bash
# Add files
git add index.html
git add README-github.md
git add "Screenshot 2025-09-03 171950.png"
git add demo.html
git add google-apps-script/
git add backend/

# Commit
git commit -m "🎮 Initial upload: Roblox survey form with GitHub Pages support"

# Push
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to repository Settings
2. Scroll to "Pages" section
3. Source: Deploy from a branch
4. Branch: main / root
5. Save

### 4. Update README
```bash
# Rename README untuk GitHub
mv README-github.md README.md
git add README.md
git commit -m "📄 Update README for GitHub Pages"
git push
```

## 🌐 Setelah Upload:

### GitHub Pages URL:
- **Live Site**: https://codename-hydra.github.io/Tugas-satistika-Form-1/
- **Demo**: https://codename-hydra.github.io/Tugas-satistika-Form-1/demo.html

### Google Apps Script Setup:
1. Deploy Google Apps Script dengan ID Spreadsheet yang sudah ada
2. Update URL di index.html jika diperlukan
3. Test form submission

### Monitoring:
- Check GitHub Actions untuk build status
- Test semua functionality di live URL
- Monitor Google Sheets untuk data yang masuk

## 🎯 Priority Upload Order:

1. **HIGHEST**: index.html, README-github.md, Screenshot
2. **HIGH**: google-apps-script/ folder
3. **MEDIUM**: demo.html
4. **LOW**: backend/ folder (untuk development saja)

## 🔗 Links After Upload:
- Repository: https://github.com/Codename-Hydra/Tugas-satistika-Form-1
- Live Demo: https://codename-hydra.github.io/Tugas-satistika-Form-1/
- Google Sheets: [Your spreadsheet URL]
