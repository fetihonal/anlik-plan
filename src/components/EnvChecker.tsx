'use client';

import { useState, useEffect } from 'react';

export default function EnvChecker() {
  const [envStatus, setEnvStatus] = useState<{
    supabaseUrl: boolean;
    supabaseKey: boolean;
  }>({
    supabaseUrl: false,
    supabaseKey: false,
  });

  useEffect(() => {
    // Check if environment variables are defined
    setEnvStatus({
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px', 
      backgroundColor: '#f0f0f0', 
      padding: '10px',
      borderRadius: '5px',
      zIndex: 9999,
      fontSize: '12px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }}>
      <h4 style={{ margin: '0 0 5px 0' }}>Environment Variables:</h4>
      <div>
        SUPABASE_URL: {envStatus.supabaseUrl ? '✅' : '❌'}
      </div>
      <div>
        SUPABASE_KEY: {envStatus.supabaseKey ? '✅' : '❌'}
      </div>
    </div>
  );
}
