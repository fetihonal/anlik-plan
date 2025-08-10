# Vercel Deployment Guide

This guide explains how to properly deploy the Anlik Plan application to Vercel with the required environment variables.

## Prerequisites

1. A Vercel account
2. Your Supabase project credentials

## Environment Variables

The application requires the following environment variables to be set in Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Setting Up Environment Variables in Vercel

1. Go to your Vercel dashboard and select your project
2. Click on the "Settings" tab
3. Navigate to the "Environment Variables" section
4. Add the following environment variables:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`, Value: Your Supabase URL
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`, Value: Your Supabase anon key
5. Click "Save"

## Deployment

After setting up the environment variables, you can deploy your application using one of these methods:

### Method 1: Vercel CLI

```bash
# Install Vercel CLI if you haven't already
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from the project directory
cd /path/to/anlik-plan
vercel
```

### Method 2: GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure the build settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

## Troubleshooting

If you encounter the "Missing Supabase environment variables" error:

1. Verify that you've added the environment variables correctly in the Vercel dashboard
2. Make sure the variable names match exactly (they are case-sensitive)
3. Try redeploying after adding the environment variables

## Local Development

For local development, create a `.env.local` file in the project root with the following content:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Then run:

```bash
npm run dev
```
