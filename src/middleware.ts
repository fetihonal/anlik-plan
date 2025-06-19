import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Create a response object
  const res = NextResponse.next();
  
  try {
    // Create a Supabase client specifically for middleware
    const supabase = createMiddlewareClient({ req, res });
    
    // This refreshes the session if needed and returns the session
    await supabase.auth.getSession();
    
    // For protected routes (admin routes)
    if (req.nextUrl.pathname.startsWith('/admin')) {
      const { data: { session } } = await supabase.auth.getSession();
      
      // If no valid session exists, redirect to login
      if (!session) {
        const redirectUrl = new URL('/login', req.url);
        // Add the original URL as a query parameter to redirect back after login
        redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
      }
    }
    
    // For login page - redirect to admin if already logged in
    if (req.nextUrl.pathname === '/login') {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Get the redirectTo parameter or default to admin
        const redirectTo = req.nextUrl.searchParams.get('redirectTo') || '/admin';
        return NextResponse.redirect(new URL(redirectTo, req.url));
      }
    }
    
    return res;
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    // If there's an error in protected routes, redirect to login
    if (req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    
    return res;
  }
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    '/admin/:path*',  // Protected admin routes
    '/login',         // Login page for redirection if already logged in
  ],
};
