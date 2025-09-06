# Deployment Guide

This guide covers how to deploy the Exam Application to various platforms.

## 🚀 Frontend Deployment

### Option 1: Netlify (Recommended)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `build` folder
   - Or connect your GitHub repository

3. **Environment Variables:**
   - Add `REACT_APP_API_URL` = `https://your-backend-url.herokuapp.com`

### Option 2: Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Configure environment variables in Vercel dashboard**

## 🔧 Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI**

2. **Create Heroku app:**
   ```bash
   heroku create your-exam-app-api
   ```

3. **Set environment variables:**
   ```bash
   heroku config:set MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/exam-app
   heroku config:set JWT_SECRET=YOUR_SUPER_SECRET_JWT_KEY_HERE
   heroku config:set PORT=5000
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

### Option 2: Railway

1. **Connect GitHub repository to Railway**
2. **Set environment variables in Railway dashboard**
3. **Deploy automatically on push**

### Option 3: Render

1. **Create new Web Service**
2. **Connect GitHub repository**
3. **Set build command:** `cd backend && npm install`
4. **Set start command:** `cd backend && npm start`

## 🗄️ Database Setup

### MongoDB Atlas (Recommended for Production)

1. **Create MongoDB Atlas account**
2. **Create a new cluster**
3. **Create database user**
4. **Whitelist IP addresses** (0.0.0.0/0 for all)
5. **Get connection string**
6. **Update MONGO_URI in environment variables**

### Local MongoDB (Development Only)

1. **Install MongoDB locally**
2. **Start MongoDB service**
3. **Use local connection string**

## 🔒 Security Considerations

### Production Checklist

- [ ] Use strong JWT secrets
- [ ] Enable HTTPS
- [ ] Set up CORS for specific domains
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Use environment variables for all secrets
- [ ] Regular security updates

### Environment Variables

```env
# Production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/exam-app
JWT_SECRET=your-very-strong-secret-key-here
PORT=5000
NODE_ENV=production

# Frontend
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
```

## 📊 Monitoring

### Health Check Endpoint

Add this to your backend for monitoring:

```javascript
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Logging

Consider adding:
- Winston for structured logging
- Morgan for HTTP request logging
- Error tracking with Sentry

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{secrets.HEROKU_API_KEY}}
        heroku_app_name: "your-app-name"
        heroku_email: "your-email@example.com"
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Update CORS settings for production domain
   - Check frontend API URL configuration

2. **Database Connection Issues**
   - Verify MongoDB Atlas IP whitelist
   - Check connection string format
   - Ensure database user has proper permissions

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

4. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names and values
   - Restart application after changes

## 📈 Performance Optimization

### Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement lazy loading
- Optimize images

### Backend
- Enable compression middleware
- Use connection pooling for MongoDB
- Implement caching for frequently accessed data
- Monitor memory usage

## 🔍 Testing in Production

1. **Test all API endpoints**
2. **Verify user registration and login**
3. **Test exam functionality**
4. **Check error handling**
5. **Monitor performance**

## 📞 Support

For deployment issues, contact: support@leadmasters.ai
