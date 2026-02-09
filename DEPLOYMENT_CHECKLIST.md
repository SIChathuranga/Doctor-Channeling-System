# 🚀 Quick Deployment Checklist

Use this checklist to ensure you complete all deployment steps.

## 📋 Pre-Deployment

- [ ] Code pushed to GitHub repository
- [ ] Firebase project created
- [ ] Firebase Authentication enabled (Email/Password)
- [ ] Firestore Database created
- [ ] Firebase Storage enabled
- [ ] Firestore security rules configured
- [ ] Firebase web config copied
- [ ] Firebase service account key downloaded

## 🔥 Firebase Configuration

- [ ] Web app registered in Firebase
- [ ] Service account private key downloaded
- [ ] Authorized domains will be updated after deployment

## 🖥️ Backend Deployment (Render)

- [ ] Render account created
- [ ] New Web Service created
- [ ] Repository connected
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Environment variables added:
  - [ ] PORT=5000
  - [ ] NODE_ENV=production
  - [ ] FIREBASE_PROJECT_ID
  - [ ] FIREBASE_CLIENT_EMAIL
  - [ ] FIREBASE_PRIVATE_KEY
  - [ ] FRONTEND_URL
  - [ ] PRODUCTION_FRONTEND_URL (will update after Vercel)
- [ ] Service deployed successfully
- [ ] Backend URL copied
- [ ] Health endpoint tested: `/api/health`

## 🌐 Frontend Deployment (Vercel)

- [ ] Vercel account created
- [ ] New Project created
- [ ] Repository imported
- [ ] Root directory set to `frontend`
- [ ] Framework preset: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variables added:
  - [ ] VITE_FIREBASE_API_KEY
  - [ ] VITE_FIREBASE_AUTH_DOMAIN
  - [ ] VITE_FIREBASE_PROJECT_ID
  - [ ] VITE_FIREBASE_STORAGE_BUCKET
  - [ ] VITE_FIREBASE_MESSAGING_SENDER_ID
  - [ ] VITE_FIREBASE_APP_ID
  - [ ] VITE_API_URL (Render backend URL)
- [ ] Project deployed successfully
- [ ] Frontend URL copied

## 🔄 Post-Deployment Updates

- [ ] Updated PRODUCTION_FRONTEND_URL in Render with Vercel URL
- [ ] Backend redeployed with new CORS settings
- [ ] Vercel domain added to Firebase Authorized Domains
- [ ] Firebase configuration verified

## ✅ Testing

- [ ] Homepage loads
- [ ] Navigation works
- [ ] User registration works
- [ ] User login works
- [ ] Doctors list loads
- [ ] Appointment booking works
- [ ] No CORS errors in console
- [ ] No Firebase auth errors
- [ ] Backend API calls successful

## 🎯 Optional

- [ ] Admin user created in Firebase
- [ ] Custom domain configured
- [ ] Analytics added
- [ ] Monitoring set up
- [ ] Backup strategy planned

## 📝 Important URLs

**Frontend:** ___________________________________

**Backend:** ___________________________________

**Firebase Console:** https://console.firebase.google.com/

**Render Dashboard:** https://dashboard.render.com/

**Vercel Dashboard:** https://vercel.com/dashboard

---

## 🆘 If Something Goes Wrong

1. Check deployment logs (Render/Vercel)
2. Verify all environment variables
3. Test backend health endpoint
4. Check browser console for errors
5. Review DEPLOYMENT.md troubleshooting section

---

**Deployment Date:** _____________

**Deployed By:** _____________

**Status:** ⬜ In Progress  ⬜ Completed  ⬜ Issues
