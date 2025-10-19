# Deployment Guide

This guide walks you through deploying your devlog website to GitHub and Cloudflare Pages.

## 📋 Prerequisites

- Git installed
- GitHub account
- Cloudflare account (free tier works)

## 🚀 Part 1: Push to GitHub

### Step 1: Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your code
git commit -m "Initial commit - optimized devlog website"
```

### Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository named `devlog-site` (or your preferred name)
3. **Don't** initialize with README, .gitignore, or license (we already have these)

### Step 3: Push to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/devlog-site.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## 🌐 Part 2: Deploy to Cloudflare Pages

### Step 1: Connect to Cloudflare Pages

1. Visit [dash.cloudflare.com](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → **Create Application**
3. Select **Pages** → **Connect to Git**
4. Authorize Cloudflare to access your GitHub account

### Step 2: Select Repository

1. Select your `devlog-site` repository from the list
2. Click **Begin setup**

### Step 3: Configure Build Settings

Use these exact settings:

```
Framework preset: Vite
Production branch: main
Build command: npm run build
Build output directory: dist
Root directory: (leave empty or /)
```

### Step 4: Environment Variables (Optional)

If you want to use a backend API, add:

```
VITE_API_URL=https://your-api-url.com
```

For static-only deployment (recommended), you don't need any environment variables.

### Step 5: Deploy

1. Click **Save and Deploy**
2. Cloudflare will:
   - Install dependencies
   - Build your site
   - Deploy it to their global CDN
3. You'll get a URL like: `https://ray-devlog-site.pages.dev`

---

## 🔄 Updating Your Site

After the initial deployment, updates are automatic:

```bash
# Make your changes, then:
git add .
git commit -m "Update content"
git push
```

Cloudflare Pages will automatically:
- Detect the push
- Rebuild your site
- Deploy the new version
- Usually takes 1-3 minutes

---

## ⚙️ Build Optimizations Applied

Your site has been optimized for production:

✅ **Code Splitting** - Pages load only what they need  
✅ **Lazy Loading** - Routes loaded on-demand  
✅ **Image Optimization** - Lazy loading for images  
✅ **Minification** - Terser removes console.logs and minifies code  
✅ **React.memo** - Prevents unnecessary re-renders  
✅ **Chunk Splitting** - Vendor code separated for better caching  
✅ **Animation Variants** - Moved outside components to prevent recreation

---

## 🎯 Custom Domain (Optional)

### Step 1: Add Domain in Cloudflare Pages

1. In your Cloudflare Pages project dashboard
2. Go to **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain name

### Step 2: Configure DNS

If your domain is on Cloudflare:
- DNS records are automatically configured

If your domain is elsewhere:
- Add the CNAME record provided by Cloudflare
- Point it to your `.pages.dev` URL

---

## 📊 Performance Tips

### Current Optimizations

1. **Lazy Routes**: Each page loads independently
2. **Image Loading**: Images use native lazy loading
3. **API Fallback**: Gracefully handles missing backend
4. **Memoization**: Expensive calculations cached

### Monitor Performance

- Use **Lighthouse** in Chrome DevTools
- Check **PageSpeed Insights**: https://pagespeed.web.dev/
- Monitor in Cloudflare Pages dashboard

---

## 🔧 Troubleshooting

### Build Fails on Cloudflare

**Issue**: Build command not found  
**Solution**: Make sure `npm run build` is in package.json scripts

**Issue**: Import errors  
**Solution**: Check all file paths use relative imports

### API Not Working

**Issue**: Backend API calls fail  
**Solution**: This is expected! The site works without the backend. If you need the backend:
- Deploy it separately (e.g., Cloudflare Workers, Railway, Render)
- Update `VITE_API_URL` environment variable in Cloudflare Pages

### Images Not Loading

**Issue**: Images show broken  
**Solution**: 
- Make sure images are in `public/` or properly imported
- Check image paths in your code
- Verify images are committed to git

---

## 📱 Mobile Optimization

Your site is already mobile-responsive with:
- Responsive grid layouts
- Touch-friendly navigation
- Optimized animations for mobile

Test on:
- Chrome DevTools mobile emulation
- Real devices
- [BrowserStack](https://www.browserstack.com/) (optional)

---

## 🎉 You're Done!

Your optimized devlog site is now live on Cloudflare's global CDN with:
- Automatic HTTPS
- Global edge caching
- Automatic deployments
- DDoS protection (free)

Share your URL: `https://your-site.pages.dev` 🚀

---

## 📚 Additional Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vite Production Build Guide](https://vitejs.dev/guide/build.html)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)

