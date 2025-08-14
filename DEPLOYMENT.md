# 🚀 CheckMate Deployment Guide

## **STEP-BY-STEP DEPLOYMENT (Free & Open Source)**

### **STEP 1: Deploy Backend to Railway**

1. **Go to [railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Select your CheckMate repository**
5. **Choose the `backend` folder as root directory**
6. **Railway will auto-detect Python and deploy**
7. **Wait for deployment (3-5 minutes)**
8. **Copy your Railway app URL** (e.g., `https://checkmate-backend-production.up.railway.app`)

### **STEP 2: Update Frontend Environment**

1. **In your frontend folder, create `.env.local`:**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

2. **For Vercel deployment, you'll set:**
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-backend-url.railway.app
   ```

### **STEP 3: Deploy Frontend to Vercel**

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up with GitHub**
3. **Click "New Project"**
4. **Import your CheckMate repository**
5. **Select the `frontend` folder**
6. **In Environment Variables, add:**
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-railway-backend-url.railway.app`
7. **Click Deploy**
8. **Wait for deployment (2-3 minutes)**

### **STEP 4: Test Everything**

1. **Visit your Vercel frontend URL**
2. **Try the fact-checking feature**
3. **Check that API status shows "Online"**

## **Alternative Free Options**

### **Backend Deployment:**
- **Railway** (Recommended) - Free tier, easy setup
- **Render.com** - Free tier available
- **Heroku** - Free tier (with limitations)
- **PythonAnywhere** - Free tier for small apps

### **Frontend Deployment:**
- **Vercel** (Recommended) - Unlimited free deployments
- **Netlify** - Free tier with good features
- **GitHub Pages** - Free but requires static export

## **Files I Created for You:**

✅ `backend/requirements.txt` - Python dependencies  
✅ `backend/Procfile` - Railway deployment config  
✅ `backend/runtime.txt` - Python version  
✅ Updated `backend/app.py` - CORS for production  

## **What You Need to Do:**

1. **Create `.env.local` in frontend folder** with your backend URL
2. **Push your code to GitHub**
3. **Follow the deployment steps above**
4. **Update environment variables in Vercel dashboard**

That's it! Your CheckMate app will be live on the internet! 🌍
