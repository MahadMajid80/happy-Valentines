# 🚀 Vercel Setup Guide for Image Storage

This guide will help you set up persistent image storage using Vercel Blob Storage.

## 📋 Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your project deployed on Vercel

## 🔧 Setup Steps

### 1. Install Vercel Blob Storage

The package is already installed in your project (`@vercel/blob`).

### 2. Get Your Blob Storage Token

**Option A: If you already have Blob Storage created:**
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on **Storage** in the left sidebar (or go to your project → **Storage** tab)
3. Click on your Blob storage instance
4. Go to the **Settings** tab
5. You'll see **Environment Variables** section with `BLOB_READ_WRITE_TOKEN`
6. Click the **Copy** button next to the token to copy it

**Option B: If you need to create Blob Storage:**
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on **Storage** in the left sidebar
3. Click **Create Database** → Select **Blob**
4. Give it a name (e.g., "valentines-images")
5. After creation, go to the **Settings** tab
6. Find the **Environment Variables** section
7. Copy the `BLOB_READ_WRITE_TOKEN` value

### 3. Add Environment Variable to Your Project

**Important:** The token from Blob Storage settings needs to be added to your **project's** environment variables:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **project** (the Valentine's website project)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add the variable:
   - **Name**: `BLOB_READ_WRITE_TOKEN`
   - **Value**: Paste the token you copied from Blob Storage settings
   - **Environment**: Select all (Production, Preview, Development)
6. Click **Save**

**Note:** The token is automatically available if you use `vercel link` and `vercel env pull` locally, but for production deployment, you must add it manually in the project settings.

### 4. Redeploy Your Project

After adding the environment variable, Vercel will automatically redeploy your project. Alternatively, you can trigger a manual redeploy from the **Deployments** tab.

## 🎯 How It Works

- **Upload Images**: Users can click on the memory gallery to upload images
- **Persistent Storage**: Images are stored in Vercel Blob Storage
- **Shared Access**: All visitors can see uploaded images
- **Remove Images**: Click the X button on any image to remove it

## 🔍 Testing Locally

For local development, you can:

1. Create a `.env.local` file in your project root
2. Add your token:
   ```
   BLOB_READ_WRITE_TOKEN=your_token_here
   ```
3. Restart your development server

## 📝 Notes

- Images are stored permanently until manually removed
- Maximum file size: 10MB per image
- Supported formats: All image formats (JPEG, PNG, GIF, WebP, etc.)
- Images are publicly accessible via their URLs

## 🆘 Troubleshooting

**Images not uploading?**
- Check that `BLOB_READ_WRITE_TOKEN` is set in your Vercel environment variables
- Make sure you've redeployed after adding the token
- Check the browser console for error messages

**Images not showing?**
- Verify the API route `/api/memories` is working
- Check that images were successfully uploaded
- Ensure your Vercel Blob Storage is active

---

**Made with ❤️ for your special someone**

