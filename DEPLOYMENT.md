# 🚀 CheckMate Deployment Guide

This guide provides step-by-step instructions for deploying the CheckMate fake news detection application to production using free, open-source friendly platforms.

## Architecture Overview

- **Frontend**: Next.js application deployed on Vercel
- **Backend**: FastAPI application with multiple deployment options (Render.com, Fly.io)
- **Models**: Pre-trained sentence-transformers and scikit-learn models included in the repository

## Prerequisites

- Git repository with your code
- GitHub account (for Vercel deployment)
- Account on chosen backend platform (Render.com or Fly.io)

## Backend Deployment Options

### Option 1: Render.com (Recommended)

#### Step 1: Prepare Backend for Deployment

The backend includes multiple deployment configurations for maximum compatibility:

**Files in `/backend` directory**:
- `requirements.txt` - Python dependencies with pinned versions for Python 3.11
- `render.yaml` - Render.com configuration
- `runtime.txt` - Python version specification (3.11.7)
- `.python-version` - Additional Python version constraint
- `build.sh` - Custom build script for robust deployment
- `Dockerfile` - Container configuration for consistent environments
- `.env.example` - Environment variables template

#### Step 2: Deploy to Render.com

1. **Sign up/Login to Render.com**:
   - Go to [render.com](https://render.com)
   - Create a free account or login

2. **Connect your GitHub repository**:
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select your CheckMate repository

3. **Configure the service**:
   - **Name**: `checkmate-api`
   - **Environment**: `Python`
   - **Build Command**: `chmod +x build.sh && ./build.sh`
   - **Start Command**: `uvicorn app:app --host 0.0.0.0 --port $PORT`
   - **Root Directory**: `backend`

4. **Set environment variables**:
   - `PYTHON_VERSION`: `3.11.7`
   - `ALLOWED_ORIGINS`: `https://your-frontend-domain.vercel.app,http://localhost:3000`

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete (5-10 minutes)
   - Note your backend URL: `https://your-service-name.onrender.com`

### Option 2: Fly.io (Alternative)

If Render.com has issues, Fly.io is an excellent open-source friendly alternative:

#### Step 1: Install Fly CLI

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login to Fly.io
flyctl auth login
```

#### Step 2: Deploy to Fly.io

```bash
# Navigate to backend directory
cd backend

# Launch the app (creates fly.toml if not exists)
flyctl launch

# Set environment variables
flyctl secrets set ALLOWED_ORIGINS="https://your-frontend-domain.vercel.app,http://localhost:3000"

# Deploy
flyctl deploy
```

The `fly.toml` configuration is already included in the backend directory.

### Step 3: Verify Backend Deployment

Test your deployed backend:
```bash
curl https://your-service-name.onrender.com/
# Should return: {"status":"ok","note":"CheckMate API running"}

curl -X POST https://your-service-name.onrender.com/predict \
  -H "Content-Type: application/json" \
  -d '{"headline":"Breaking: Scientists discover new planet"}'
# Should return prediction results
```

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Deployment

1. **Create environment variables file** in `/frontend`:
   
   Create `.env.local`:
   ```bash
   NEXT_PUBLIC_API_URL=https://your-backend-service.onrender.com
   ```

2. **Update the example file** (`.env.example`):
   ```bash
   NEXT_PUBLIC_API_URL=https://your-backend-service.onrender.com
   ```

### Step 2: Deploy to Vercel

1. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your CheckMate repository
   - **Root Directory**: Set to `frontend`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave default (`.next`)

2. **Configure environment variables**:
   - In project settings, add environment variable:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend-service.onrender.com`

3. **Deploy**:
   - Click "Deploy"
   - Wait for deployment (2-3 minutes)
   - Note your frontend URL: `https://your-project.vercel.app`

### Step 3: Update Backend CORS Settings

1. **Update backend environment variables**:
   - **Render.com**: Go to Environment tab, update `ALLOWED_ORIGINS`
   - **Fly.io**: Run `flyctl secrets set ALLOWED_ORIGINS="https://your-project.vercel.app,http://localhost:3000"`

2. **Redeploy backend** to apply CORS changes

## Troubleshooting

### Backend Deployment Issues

#### Python Version Compatibility
If you encounter Python/numpy/scikit-learn compatibility errors:

1. **Check Python version** in deployment logs
2. **Verify requirements.txt** uses pinned versions for Python 3.11
3. **Use Docker deployment** for consistent environment:
   ```bash
   # For Render.com, switch to Docker in service settings
   # Use the included Dockerfile
   ```

#### Model Loading Errors
1. **Verify model files exist**:
   - `/models/embedder_classifier/classifier.joblib`
   - `/models/embedder_classifier/embedder/` (full directory)
2. **Check file paths** in `app.py` match repository structure
3. **Ensure Git LFS** is properly configured for large model files

#### Build Script Issues
The `build.sh` script provides verbose output for debugging:
```bash
# Check build logs for:
# - Python version confirmation
# - Pip upgrade success
# - Dependency installation details
```

### Frontend Issues

1. **API connection errors**:
   - Verify `NEXT_PUBLIC_API_URL` points to correct backend
   - Check backend is deployed and accessible
   - Test backend endpoints manually

2. **CORS errors**:
   - Verify `ALLOWED_ORIGINS` includes your frontend domain
   - Check environment variable is set correctly
   - Redeploy after changing CORS settings

## Production Considerations

### Security
- Use HTTPS for all communications
- Implement rate limiting on API endpoints
- Add authentication if needed
- Regularly update dependencies

### Performance
- Enable caching for model predictions
- Use CDN for static assets
- Monitor API response times
- Consider model optimization for faster inference

### Monitoring
- Set up health checks on both platforms
- Monitor error rates and performance
- Configure alerts for downtime
- Track prediction accuracy and usage

## Deployment File Reference

### Backend Files Created/Modified
- `requirements.txt` - Pinned dependencies for Python 3.11 compatibility
- `runtime.txt` - Python version specification
- `.python-version` - Additional version constraint
- `build.sh` - Custom build script with verbose logging
- `Dockerfile` - Container configuration for consistent deployment
- `fly.toml` - Fly.io deployment configuration
- `render.yaml` - Render.com service configuration

### Key Dependency Versions
```
Python: 3.11.7
FastAPI: 0.104.1
scikit-learn: 1.3.2
numpy: 1.24.4
sentence-transformers: 2.2.2
torch: 2.0.1
```

## Alternative Platforms

### Railway (Backup Option)
- Use included `Procfile` and `runtime.txt`
- Set `ALLOWED_ORIGINS` environment variable
- Deploy from `/backend` directory

### Netlify (Frontend Alternative)
- Build command: `npm run build`
- Publish directory: `frontend/.next`
- Set `NEXT_PUBLIC_API_URL` environment variable

## Support

If you encounter deployment issues:

1. **Check platform-specific logs** for detailed error messages
2. **Verify all environment variables** are set correctly
3. **Test API endpoints manually** using curl or Postman
4. **Review model file integrity** and paths
5. **Try alternative deployment platform** if one fails

---

**Note**: This guide provides multiple deployment strategies to ensure successful deployment regardless of platform-specific issues. Free tier limitations apply to all platforms - consider upgrading for production use.FREE FOREVER! 🌍✨**
