# 🚀 Deployment Guide - Doctor Channeling System

This guide will walk you through deploying your Doctor Channeling System with:
- **Frontend** on Vercel
- **Backend** on Render
- **Database & Auth** on Firebase

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Firebase project created and configured
- [ ] GitHub account (for connecting to Vercel and Render)
- [ ] Your code pushed to a GitHub repository
- [ ] Firebase service account key downloaded
- [ ] All environment variables ready

---

## 🔥 Part 1: Firebase Setup

### 1.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or select existing project
3. Enter project name (e.g., "doctor-channeling-system")
4. Enable Google Analytics (optional)
5. Click **"Create project"**

### 1.2 Enable Firebase Services

#### Enable Authentication
1. In Firebase Console, go to **Build** → **Authentication**
2. Click **"Get started"**
3. Enable **Email/Password** sign-in method
4. Enable **Google** sign-in method (optional)
5. Click **"Save"**

#### Enable Firestore Database
1. Go to **Build** → **Firestore Database**
2. Click **"Create database"**
3. Select **"Start in production mode"**
4. Choose a location (select closest to your users)
5. Click **"Enable"**

#### Enable Storage
1. Go to **Build** → **Storage**
2. Click **"Get started"**
3. Use default security rules for now
4. Click **"Done"**

### 1.3 Configure Firestore Security Rules

1. In Firestore Database, go to **"Rules"** tab
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Appointments collection
    match /appointments/{appointmentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.patientId == request.auth.uid || 
         resource.data.doctorId == request.auth.uid);
    }
    
    // Schedules collection
    match /schedules/{doctorId} {
      allow read: if true;
      allow write: if request.auth.uid == doctorId;
    }
    
    // Reviews collection
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
    }
    
    // Contact messages
    match /contact_messages/{messageId} {
      allow create: if true;
      allow read: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

### 1.4 Get Firebase Configuration

#### For Frontend (Web App Config)
1. Go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"** section
3. Click **Web icon** (</>)
4. Register app with nickname (e.g., "Doctor Channeling Web")
5. Copy the `firebaseConfig` object - you'll need these values:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

#### For Backend (Service Account)
1. Go to **Project Settings** → **Service Accounts**
2. Click **"Generate new private key"**
3. Click **"Generate key"** - a JSON file will download
4. **IMPORTANT**: Keep this file secure! Never commit it to Git
5. You'll use this for backend deployment

---

## 🖥️ Part 2: Backend Deployment on Render

### 2.1 Prepare Backend for Deployment

1. Make sure your backend code is pushed to GitHub
2. Ensure `package.json` has the correct start script:
   ```json
   "scripts": {
     "start": "node src/index.js",
     "dev": "nodemon src/index.js"
   }
   ```

### 2.2 Create Render Account

1. Go to [Render.com](https://render.com/)
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with GitHub (recommended)
4. Authorize Render to access your repositories

### 2.3 Deploy Backend

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your repository (e.g., `Doctor-Channeling-System`)
4. Configure the service:

   **Basic Settings:**
   - **Name**: `doctor-channeling-backend` (or your choice)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

   **Instance Type:**
   - Select **"Free"** (for testing) or **"Starter"** (for production)

5. Click **"Advanced"** to add environment variables

### 2.4 Configure Environment Variables on Render

Click **"Add Environment Variable"** for each of these:

```bash
# Server Configuration
PORT=5000
NODE_ENV=production

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"

# CORS Configuration
FRONTEND_URL=http://localhost:5173
PRODUCTION_FRONTEND_URL=https://your-app.vercel.app
```

**How to get Firebase values:**
1. Open the service account JSON file you downloaded
2. Copy values:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (include the quotes and \n characters)

**Important**: For `FIREBASE_PRIVATE_KEY`, copy the entire key including:
- The opening quotes
- `-----BEGIN PRIVATE KEY-----`
- All the key content
- `-----END PRIVATE KEY-----`
- The closing quotes
- Keep the `\n` characters as-is

6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes)
8. Once deployed, copy your backend URL (e.g., `https://doctor-channeling-backend.onrender.com`)

### 2.5 Test Backend

1. Visit: `https://your-backend-url.onrender.com/api/health`
2. You should see:
   ```json
   {
     "status": "OK",
     "message": "Doctor Channeling API is running",
     "timestamp": "2024-..."
   }
   ```

---

## 🌐 Part 3: Frontend Deployment on Vercel

### 3.1 Prepare Frontend for Deployment

Your frontend is already configured with:
- ✅ `vercel.json` for routing
- ✅ `_redirects` for SPA support
- ✅ Optimized Vite build configuration

### 3.2 Create Vercel Account

1. Go to [Vercel.com](https://vercel.com/)
2. Click **"Sign Up"**
3. Sign up with GitHub (recommended)
4. Authorize Vercel to access your repositories

### 3.3 Deploy Frontend

1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Select your repository (e.g., `Doctor-Channeling-System`)
4. Configure project:

   **Framework Preset:** Vite
   
   **Root Directory:** `frontend` (click "Edit" and select the frontend folder)
   
   **Build Settings:**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Click **"Environment Variables"**

### 3.4 Configure Environment Variables on Vercel

Add these environment variables (click **"Add"** for each):

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend API URL
VITE_API_URL=https://your-backend.onrender.com
```

**Where to get these values:**
- Use the Firebase config you copied in Part 1.4
- For `VITE_API_URL`, use your Render backend URL from Part 2.5

6. Click **"Deploy"**
7. Wait for deployment (2-5 minutes)
8. Once deployed, you'll get a URL like: `https://your-app.vercel.app`

### 3.5 Update Backend CORS

1. Go back to Render dashboard
2. Open your backend service
3. Go to **"Environment"** tab
4. Update `PRODUCTION_FRONTEND_URL` with your Vercel URL:
   ```
   PRODUCTION_FRONTEND_URL=https://your-app.vercel.app
   ```
5. Click **"Save Changes"**
6. Backend will automatically redeploy

---

## ✅ Part 4: Post-Deployment Configuration

### 4.1 Update Firebase Authorized Domains

1. Go to Firebase Console
2. Navigate to **Authentication** → **Settings** → **Authorized domains**
3. Click **"Add domain"**
4. Add your Vercel domain: `your-app.vercel.app`
5. Click **"Add"**

### 4.2 Test Your Deployment

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Test the following:
   - [ ] Homepage loads correctly
   - [ ] Can navigate to different pages
   - [ ] Can register a new account
   - [ ] Can login
   - [ ] Can view doctors list
   - [ ] Can book an appointment
   - [ ] Backend API calls work

### 4.3 Create Admin User (Optional)

To create an admin user for testing:

1. Register a normal user account on your deployed site
2. Go to Firebase Console → **Authentication** → **Users**
3. Find your user and copy the **UID**
4. Go to **Firestore Database**
5. Find the `users` collection
6. Find your user document (by UID)
7. Edit the document and change `role` field to `"admin"`
8. Save changes
9. Logout and login again to see admin dashboard

---

## 🔧 Part 5: Troubleshooting

### Common Issues and Solutions

#### ❌ "CORS Error" in Browser Console

**Solution:**
1. Check that `PRODUCTION_FRONTEND_URL` in Render matches your Vercel URL exactly
2. Make sure there's no trailing slash
3. Redeploy backend after changing environment variables

#### ❌ "Firebase: Error (auth/unauthorized-domain)"

**Solution:**
1. Add your Vercel domain to Firebase Authorized Domains (see 4.1)
2. Wait a few minutes for changes to propagate

#### ❌ Backend shows "Firebase Admin initialization error"

**Solution:**
1. Check that all Firebase environment variables are set correctly
2. Verify `FIREBASE_PRIVATE_KEY` includes the full key with `\n` characters
3. Make sure the key is wrapped in quotes in Render

#### ❌ "Cannot GET /api/..." errors

**Solution:**
1. Check that `VITE_API_URL` in Vercel points to your Render backend URL
2. Make sure the URL doesn't have a trailing slash
3. Verify backend is running by visiting `/api/health`

#### ❌ Build fails on Vercel

**Solution:**
1. Check build logs for specific errors
2. Verify all environment variables are set
3. Make sure `frontend` is set as root directory
4. Try clearing build cache and redeploying

#### ❌ Build fails on Render

**Solution:**
1. Check that `backend` is set as root directory
2. Verify `package.json` has correct scripts
3. Check build logs for missing dependencies
4. Ensure Node version is compatible (18+)

---

## 🔄 Part 6: Updating Your Deployment

### Update Frontend

1. Push changes to GitHub
2. Vercel automatically deploys on push to main branch
3. Or manually redeploy from Vercel dashboard

### Update Backend

1. Push changes to GitHub
2. Render automatically deploys on push to main branch
3. Or manually redeploy from Render dashboard

### Update Environment Variables

**On Vercel:**
1. Go to Project Settings → Environment Variables
2. Update values
3. Redeploy for changes to take effect

**On Render:**
1. Go to Environment tab
2. Update values
3. Service automatically redeploys

---

## 📊 Part 7: Monitoring

### Monitor Backend (Render)

1. Go to Render dashboard
2. Click on your service
3. View:
   - **Logs**: Real-time application logs
   - **Metrics**: CPU, memory usage
   - **Events**: Deployment history

### Monitor Frontend (Vercel)

1. Go to Vercel dashboard
2. Click on your project
3. View:
   - **Deployments**: Deployment history
   - **Analytics**: Page views, performance (paid plans)
   - **Logs**: Function logs

### Monitor Firebase

1. Go to Firebase Console
2. Check:
   - **Authentication**: User sign-ups
   - **Firestore**: Database usage
   - **Storage**: File uploads
   - **Usage**: Quotas and limits

---

## 💰 Part 8: Cost Considerations

### Free Tier Limits

**Render (Free Plan):**
- ✅ 750 hours/month
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ Cold starts (30-60 seconds to wake up)
- 512 MB RAM

**Vercel (Hobby Plan):**
- ✅ Unlimited personal projects
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Global CDN

**Firebase (Spark Plan - Free):**
- ✅ 50K reads/day
- ✅ 20K writes/day
- ✅ 1 GB storage
- ✅ 10 GB/month transfer

### Upgrade Recommendations

For production with real users:
- **Render**: Upgrade to Starter ($7/month) to prevent cold starts
- **Vercel**: Hobby plan is usually sufficient
- **Firebase**: Blaze (Pay as you go) when you exceed free limits

---

## 🎉 Congratulations!

Your Doctor Channeling System is now live! 

**Your URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`
- API Health: `https://your-backend.onrender.com/api/health`

### Next Steps:

1. ✅ Test all features thoroughly
2. ✅ Set up custom domain (optional)
3. ✅ Configure email templates in Firebase
4. ✅ Set up monitoring and alerts
5. ✅ Create backup strategy for Firestore
6. ✅ Add analytics (Google Analytics, etc.)

---

## 📞 Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Review deployment logs on Render/Vercel
3. Check Firebase Console for errors
4. Verify all environment variables are correct
5. Test backend health endpoint
6. Check browser console for frontend errors

---

## 📝 Quick Reference

### Environment Variables Checklist

**Backend (Render):**
```
✓ PORT
✓ NODE_ENV
✓ FIREBASE_PROJECT_ID
✓ FIREBASE_CLIENT_EMAIL
✓ FIREBASE_PRIVATE_KEY
✓ FRONTEND_URL
✓ PRODUCTION_FRONTEND_URL
```

**Frontend (Vercel):**
```
✓ VITE_FIREBASE_API_KEY
✓ VITE_FIREBASE_AUTH_DOMAIN
✓ VITE_FIREBASE_PROJECT_ID
✓ VITE_FIREBASE_STORAGE_BUCKET
✓ VITE_FIREBASE_MESSAGING_SENDER_ID
✓ VITE_FIREBASE_APP_ID
✓ VITE_API_URL
```

---

**Made with ❤️ for better healthcare access**
