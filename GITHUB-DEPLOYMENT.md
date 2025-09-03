# 🚀 GitHub Deployment Guide - Survei Genre Game Roblox

## 📁 Repository Structure untuk GitHub
```
Tugas-satistika-Form-1/
├── index.html                    # Main entry point (GitHub Pages)
├── survei-genre-roblox.html     # Original survey form
├── demo.html                    # Demo page
├── README.md                    # Main documentation
├── .gitignore                   # Git ignore rules
├── package.json                 # Root package.json for deployment
├── backend/                     # Node.js backend
│   ├── server.js               # Express server
│   ├── package.json            # Backend dependencies
│   └── vercel.json             # Vercel deployment config
├── google-apps-script/         # Google Sheets integration
│   ├── Code.gs                 # Apps Script code
│   └── README.md               # Setup instructions
└── docs/                       # GitHub Pages documentation
    └── deployment-options.md   # Deployment guides
```

## 🌐 Deployment Options

### 1. GitHub Pages (Frontend Only)
✅ **Recommended for Static Hosting**

**Setup:**
1. Push semua file ke GitHub repository
2. Go to repository Settings → Pages
3. Select source: Deploy from branch `main`
4. Select folder: `/ (root)`
5. Access via: `https://username.github.io/repository-name`

**Configuration:**
- Main file: `index.html` (auto-redirect to survey)
- Survey form akan menggunakan localStorage atau Google Apps Script
- Perfect untuk demo dan testing

### 2. Vercel Deployment (Full Stack)
✅ **Recommended for Production**

**Setup:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: roblox-survey
# - Directory: ./
# - Build command: cd backend && npm install
# - Output directory: ./
```

**Features:**
- Serverless functions untuk backend
- Automatic SSL certificates
- Global CDN
- Easy custom domains

### 3. Heroku Deployment (Backend)
✅ **Traditional Cloud Hosting**

**Setup:**
```bash
# Install Heroku CLI
# Create Procfile in root:
echo "web: cd backend && npm start" > Procfile

# Deploy
heroku create your-app-name
git push heroku main
```

### 4. Netlify (Frontend + Functions)
✅ **JAMstack Approach**

**Setup:**
1. Connect GitHub repository to Netlify
2. Build settings:
   - Build command: `cd backend && npm install`
   - Publish directory: `./`
3. Enable Netlify Functions for backend API

## 🔧 Configuration Files

### Root package.json
```json
{
  "name": "roblox-survey-app",
  "version": "1.0.0",
  "scripts": {
    "start": "cd backend && npm start",
    "build": "cd backend && npm install",
    "dev": "cd backend && npm run dev"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

### Vercel Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "*.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

## 🛠️ Pre-Deployment Checklist

### ✅ Files to Include:
- [x] `index.html` - Main entry point
- [x] `survei-genre-roblox.html` - Survey form
- [x] `demo.html` - Demo page
- [x] `README.md` - Documentation
- [x] `backend/` - Server code
- [x] `google-apps-script/` - Sheets integration
- [x] `.gitignore` - Ignore sensitive files
- [x] `package.json` - Root dependencies

### ✅ Configuration Updates:
- [x] API endpoints configured for production
- [x] CORS settings updated for domain
- [x] Environment variables set
- [x] Security headers enabled
- [x] Rate limiting configured

### ✅ Testing:
- [x] Form validation works
- [x] API endpoints respond
- [x] Data saving functional
- [x] Error handling works
- [x] Mobile responsive

## 🔒 Security Considerations

### Environment Variables
```bash
# For production deployment
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_MAX=100
```

### CORS Configuration
Update `backend/server.js`:
```javascript
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://your-username.github.io',
        'https://your-app.vercel.app',
        'https://yourdomain.com'
    ]
}));
```

## 📊 Analytics & Monitoring

### GitHub Pages Analytics
- Use Google Analytics
- GitHub repository insights
- Traffic monitoring

### Production Monitoring
- Vercel Analytics
- Error tracking (Sentry)
- Performance monitoring
- Uptime monitoring

## 🚀 Quick Deploy Commands

### GitHub Pages:
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### Vercel:
```bash
vercel --prod
```

### Heroku:
```bash
git push heroku main
```

## 🆘 Troubleshooting

### Common Issues:
1. **CORS Errors**: Update allowed origins
2. **Build Failures**: Check Node.js version
3. **API Not Found**: Verify route configuration
4. **Form Not Submitting**: Check API endpoints

### Debug Tips:
- Check browser console for errors
- Verify network requests in DevTools
- Test API endpoints directly
- Check deployment logs

---

**Ready for GitHub! 🚀**
