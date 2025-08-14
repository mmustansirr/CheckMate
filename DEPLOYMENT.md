# 🚀 CheckMate Deployment Guide - Open Source & Free Forever

## **🏆 BEST OPTION: Render.com (Truly Free Forever)**

Render.com is the **most loved, open-source friendly, and truly free forever** hosting platform for Python apps!

### **✅ Why Render.com?**
- 🆓 **Truly free forever** (not just trial)
- 🌍 **Globally loved** by developers
- 💳 **No credit card required**
- ⚡ **750 hours/month free** (covers 24/7 usage)
- 🔄 **Auto-sleep after 15min** (wakes up in ~30s)
- 🐍 **Perfect for Python/FastAPI**

---

## **STEP-BY-STEP DEPLOYMENT**

### **STEP 1: Deploy Backend to Render.com**

1. **Go to [render.com](https://render.com)**
2. **Sign up with GitHub** (free account)
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository**
5. **Configure the service:**
   - **Name**: `checkmate-api`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`
6. **Add Environment Variables:**
   - Key: `ALLOWED_ORIGINS`
   - Value: `https://your-frontend-domain.vercel.app,http://localhost:3000`
7. **Click "Create Web Service"**
8. **Wait for deployment** (3-5 minutes)
9. **Copy your Render URL** (e.g., `https://checkmate-api.onrender.com`)

### **STEP 2: Update Frontend Environment**

1. **In your frontend folder, create `.env.local`:**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

2. **For Vercel deployment, you'll set:**
   ```
   NEXT_PUBLIC_API_URL=https://your-render-backend-url.onrender.com
   ```

### **STEP 3: Deploy Frontend to Vercel**

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up with GitHub**
3. **Click "New Project"**
4. **Import your CheckMate repository**
5. **Select the `frontend` folder**
6. **In Environment Variables, add:**
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-render-backend-url.onrender.com`
7. **Click Deploy**
8. **Wait for deployment** (2-3 minutes)

### **STEP 4: Update Backend CORS**

1. **Go back to Render dashboard**
2. **Click on your backend service**
3. **Go to Environment tab**
4. **Update `ALLOWED_ORIGINS` with your Vercel URL:**
   ```
   https://your-actual-vercel-url.vercel.app,http://localhost:3000
   ```
5. **Service will auto-redeploy**

### **STEP 5: Test Everything**

1. **Visit your Vercel frontend URL**
2. **Try the fact-checking feature**
3. **Check that API status shows "Online"**
4. **Test with different headlines**

---

## **🔄 Important Notes**

### **Free Tier Limitations:**
- ⏰ **Auto-sleep**: Backend sleeps after 15min of inactivity
- 🚀 **Wake-up time**: ~30 seconds for first request after sleep
- 💾 **750 hours/month**: More than enough for 24/7 usage
- 🔒 **HTTPS**: Automatic SSL certificates

### **Performance Tips:**
- First request after sleep takes ~30s (normal)
- Subsequent requests are instant
- Consider using a uptime monitor (like UptimeRobot) to keep it awake

---

## **🎯 Alternative Free Options**

### **Backend Deployment:**
- **Render.com** (Recommended) - Truly free forever
- **PythonAnywhere** - Free tier for small apps
- **Fly.io** - $5/month free credits
- **Deta Space** - Free for personal projects

### **Frontend Deployment:**
- **Vercel** (Recommended) - Unlimited free deployments
- **Netlify** - Free tier with good features
- **GitHub Pages** - Free static hosting

---

## **📁 Files Created for You:**

✅ `backend/requirements.txt` - Python dependencies  
✅ `backend/render.yaml` - Render deployment config  
✅ `backend/.env.example` - Environment variables template  
✅ Updated `backend/app.py` - CORS for production  

---

## **🚀 What You Need to Do:**

1. **Create `.env.local` in frontend folder** with your backend URL
2. **Push your code to GitHub**
3. **Follow the deployment steps above**
4. **Update environment variables in both platforms**

**That's it! Your CheckMate app will be live on the internet - FREE FOREVER! 🌍✨**
