#!/bin/bash

# 🚀 Deploy Script untuk GitHub Pages
# Script untuk upload semua files penting ke GitHub

echo "🎮 Deploying Roblox Survey to GitHub Pages..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_status "Initializing git repository..."
    git init
    
    # Set remote origin (change this to your GitHub repo URL)
    echo "Enter your GitHub repository URL (e.g., https://github.com/username/repo-name.git):"
    read repo_url
    git remote add origin "$repo_url"
fi

# Create/update README for GitHub
print_status "Preparing README for GitHub..."
if [ -f "README-github.md" ]; then
    cp README-github.md README.md
    print_success "README.md updated for GitHub Pages"
fi

# Add essential files
print_status "Adding files to git..."

# Essential files for GitHub Pages
essential_files=(
    "index.html"
    "README.md"
    "Screenshot 2025-09-03 171950.png"
    ".gitignore"
)

# Optional files
optional_files=(
    "demo.html"
    "google-apps-script/"
    "backend/server.js"
    "backend/package.json"
    "UPLOAD-GUIDE.md"
)

# Add essential files
for file in "${essential_files[@]}"; do
    if [ -e "$file" ]; then
        git add "$file"
        print_success "Added: $file"
    else
        print_warning "File not found: $file"
    fi
done

# Add optional files
print_status "Adding optional files..."
for file in "${optional_files[@]}"; do
    if [ -e "$file" ]; then
        git add "$file"
        print_success "Added: $file"
    else
        print_warning "Optional file not found: $file"
    fi
done

# Check git status
print_status "Git status:"
git status --short

# Commit changes
print_status "Committing changes..."
timestamp=$(date '+%Y-%m-%d %H:%M:%S')
git commit -m "🎮 Deploy Roblox Survey Form - $timestamp

- ✅ GitHub Pages ready
- ✅ Google Sheets integration  
- ✅ Responsive design
- ✅ Error handling & loading states
- ✅ LocalStorage fallback"

# Push to GitHub
print_status "Pushing to GitHub..."
if git push -u origin main; then
    print_success "Successfully pushed to GitHub!"
else
    print_error "Failed to push to GitHub. Please check your remote URL and credentials."
    exit 1
fi

# Instructions for GitHub Pages
echo ""
print_success "🎉 Deployment completed!"
echo ""
print_status "Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Navigate to Settings > Pages"
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'main' branch and '/ (root)'"
echo "5. Click Save"
echo ""
print_status "Your site will be available at:"
echo "https://your-username.github.io/repository-name/"
echo ""
print_status "Don't forget to:"
echo "1. Deploy your Google Apps Script"
echo "2. Update the Google Apps Script URL in index.html if needed"
echo "3. Test the live form"
echo ""
print_success "Happy coding! 🚀"
