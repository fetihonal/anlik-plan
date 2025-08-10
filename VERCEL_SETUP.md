# Vercel Environment Variables Setup Guide

## The Problem

Your Vercel deployment is failing with the error:
```
Error: Missing Supabase environment variables
```

This is happening because the Supabase client requires environment variables that aren't available during the build process.

## Solution

We've made the following changes to fix this issue:

1. Updated the Supabase client to use a mock client during build time
2. Added fallback environment variables in `next.config.js`
3. Simplified the `vercel.json` configuration

However, for your application to work correctly in production, you still need to set up the environment variables in Vercel.

## Setting Up Environment Variables in Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (`anlik-plan`)
3. Click on the "Settings" tab
4. In the left sidebar, click on "Environment Variables"
5. Add the following environment variables:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

6. Make sure to click "Save" after adding each variable
7. Redeploy your application by going to the "Deployments" tab and clicking "Redeploy"

## Finding Your Supabase Credentials

If you don't have your Supabase credentials handy:

1. Go to [Supabase Dashboard](https://app.supabase.io/)
2. Select your project
3. Go to Project Settings > API
4. Under "Project URL" you'll find your `NEXT_PUBLIC_SUPABASE_URL`
5. Under "Project API keys" you'll find your `NEXT_PUBLIC_SUPABASE_ANON_KEY` (use the "anon" "public" key)

## Verifying Your Setup

After setting up the environment variables and redeploying:

1. Visit your deployed site
2. Check that authentication and data fetching work correctly
3. If you encounter any issues, check the browser console for errors

## Local Development

For local development, make sure you have a `.env.local` file in your project root with the same environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Then run:

```bash
npm run dev
```
