'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LogoutButton({ className = '' }: { className?: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      
      // Create a fresh client for each logout request
      const supabase = createClientComponentClient();
      
      // Sign out - this will remove the session cookie
      await supabase.auth.signOut();
      
      // Force a hard navigation to ensure all state is reset
      window.location.href = '/login';
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <button 
      onClick={handleLogout}
      disabled={isLoading}
      className={`text-sm font-medium ${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-red-500'}`}
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
