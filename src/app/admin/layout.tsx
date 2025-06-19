import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import LogoutButton from '@/components/LogoutButton';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authentication is now handled by middleware
  // We can still get the session if needed for UI elements
  let userName = 'Admin User';
  
  try {
    // Create and await the Supabase client
    const supabase = await createServerSupabaseClient();
    
    // Get the session
    const { data } = await supabase.auth.getSession();
    
    if (data.session) {
      // Get user profile for display purposes
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', data.session.user.id)
        .single();
        
      if (profile?.full_name) {
        userName = profile.full_name;
      }
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="text-xl font-bold mb-8">Anlık Plan Admin</div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/admin" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/events" className="block p-2 hover:bg-gray-700 rounded">Events</Link>
            </li>
            <li>
              <Link href="/admin/event-formats" className="block p-2 hover:bg-gray-700 rounded">Etkinlik Formatları</Link>
            </li>
            <li>
              <Link href="/admin/team-members" className="block p-2 hover:bg-gray-700 rounded">Ekip Üyeleri</Link>
            </li>
            <li>
              <Link href="/admin/users" className="block p-2 hover:bg-gray-700 rounded">Users</Link>
            </li>
            <li>
              <Link href="/admin/settings" className="block p-2 hover:bg-gray-700 rounded">Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {userName}</span>
              <LogoutButton />
            </div>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
