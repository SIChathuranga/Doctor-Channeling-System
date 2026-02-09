# 🚀 Quick Deployment Reference Card

## 📱 Platform URLs

| Platform | URL | Purpose |
|----------|-----|---------|
| Vercel | https://vercel.com | Frontend Hosting |
| Render | https://render.com | Backend Hosting |
| Firebase | https://console.firebase.google.com | Database & Auth |

---

## ⚡ Quick Commands

### Frontend Build (Local Test)
```bash
cd frontend
npm install
npm run build
```

### Backend Start (Local Test)
```bash
cd backend
npm install
npm start
```

---

## 🔑 Environment Variables Quick Copy

### Frontend (Vercel)
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_URL=
```

### Backend (Render)
```
PORT=5000
NODE_ENV=production
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
FRONTEND_URL=http://localhost:5173
PRODUCTION_FRONTEND_URL=
```

---

## 📝 Deployment Settings

### Vercel Settings
```
Root Directory: frontend
Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node Version: 18.x
```

### Render Settings
```
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free (or Starter)
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend deployed and health check working
- [ ] Frontend deployed and accessible
- [ ] CORS updated with production URLs
- [ ] Firebase authorized domains updated
- [ ] All features tested
- [ ] Admin user created (if needed)

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS Error | Update PRODUCTION_FRONTEND_URL in Render |
| Auth Error | Add domain to Firebase Authorized Domains |
| Build Fails | Check environment variables are set |
| 404 on Routes | Verify vercel.json and _redirects exist |
| API Not Found | Check VITE_API_URL points to Render URL |

---

## 📞 Important Endpoints

### Health Check
```
GET https://your-backend.onrender.com/api/health
```

### Test Frontend
```
https://your-app.vercel.app
```

---

## 📚 Full Documentation

- **Complete Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Checklist**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- **Summary**: [PRE_DEPLOYMENT_SUMMARY.md](./PRE_DEPLOYMENT_SUMMARY.md)

---

**Print this card and keep it handy during deployment!** 🎯
