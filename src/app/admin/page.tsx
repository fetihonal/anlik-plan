import { createServerSupabaseClient } from '@/lib/supabase-server';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = createServerSupabaseClient();
  
  // Get counts for dashboard
  const { count: eventsCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true });
    
    
  const { count: usersCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });
    
  const { count: participantsCount } = await supabase
    .from('event_participants')
    .select('*', { count: 'exact', head: true });
    
  // Get upcoming events
  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('*')
    .gt('start_time', new Date().toISOString())
    .order('start_time', { ascending: true })
    .limit(5);
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-500 text-sm uppercase">Total Events</h2>
          <p className="text-3xl font-bold text-primary">{eventsCount || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-500 text-sm uppercase">Total Users</h2>
          <p className="text-3xl font-bold text-accent">{usersCount || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-500 text-sm uppercase">Total Participants</h2>
          <p className="text-3xl font-bold text-secondary">{participantsCount || 0}</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          <Link href="/admin/events" className="text-primary hover:underline">View All</Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcomingEvents && upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <tr key={event.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{event.title}</td>
                    <td className="py-3 px-4">{event.event_type}</td>
                    <td className="py-3 px-4">{new Date(event.start_time).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${event.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {event.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Link href={`/admin/events/${event.id}`} className="text-primary hover:underline mr-3">
                        Edit
                      </Link>
                      <Link href={`/admin/events/${event.id}/participants`} className="text-accent hover:underline">
                        Participants
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500">No upcoming events found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
