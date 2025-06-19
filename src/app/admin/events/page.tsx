import { createServerSupabaseClient } from '@/lib/supabase-server';
import Link from 'next/link';

export default async function EventsPage() {
  // Create and await the Supabase client
  const supabase = await createServerSupabaseClient();
  
  // Get all events
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('start_time', { ascending: false });
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events Management</h1>
        <Link 
          href="/admin/events/new" 
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90"
        >
          Create New Event
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events && events.length > 0 ? (
                events.map((event) => (
                  <tr key={event.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{event.title}</td>
                    <td className="py-3 px-4">{event.event_type}</td>
                    <td className="py-3 px-4">{new Date(event.start_time).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{event.location || '-'}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${event.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {event.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {event.is_featured ? (
                        <span className="text-primary">✓</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-3">
                        <Link href={`/admin/events/${event.id}`} className="text-primary hover:underline">
                          Edit
                        </Link>
                        <Link href={`/admin/events/${event.id}/participants`} className="text-accent hover:underline">
                          Participants
                        </Link>
                        <button 
                          className="text-red-500 hover:underline"
                          // This would need client-side handling
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-500">No events found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
