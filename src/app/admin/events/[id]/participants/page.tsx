'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';
import type { Event } from '@/lib/supabase';

type Participant = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  status: string;
  payment_status: string | null;
  created_at: string;
};

export default function EventParticipantsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const supabase = createBrowserClient();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch event details
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', params.id)
        .single();
        
      if (eventError) {
        console.error('Error fetching event:', eventError);
        return;
      }
      
      setEvent(eventData as Event);
      
      // Fetch participants using the stored function
      const { data: participantsData, error: participantsError } = await supabase
        .rpc('get_event_participants', { event_id: params.id });
        
      if (participantsError) {
        console.error('Error fetching participants:', participantsError);
        return;
      }
      
      setParticipants(participantsData || []);
      setLoading(false);
    }
    
    fetchData();
  }, [params.id, supabase]);

  const handleStatusChange = async (participantId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('event_participants')
        .update({ status: newStatus })
        .eq('id', participantId);
        
      if (error) throw error;
      
      // Update local state
      setParticipants(prev => 
        prev.map(p => p.id === participantId ? { ...p, status: newStatus } : p)
      );
    } catch (error) {
      console.error('Error updating participant status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const handlePaymentStatusChange = async (participantId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('event_participants')
        .update({ payment_status: newStatus })
        .eq('id', participantId);
        
      if (error) throw error;
      
      // Update local state
      setParticipants(prev => 
        prev.map(p => p.id === participantId ? { ...p, payment_status: newStatus } : p)
      );
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Failed to update payment status. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!event) {
    return <div className="text-center py-10">Event not found</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{event.title} - Participants</h1>
          <p className="text-gray-500">
            {new Date(event.start_time).toLocaleDateString()} | {participants.length} participants
          </p>
        </div>
        <button
          onClick={() => router.push(`/admin/events/${params.id}`)}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back to Event
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Registration Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {participants.length > 0 ? (
                participants.map((participant) => (
                  <tr key={participant.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">
                      <div className="flex items-center">
                        {participant.avatar_url && (
                          <img 
                            src={participant.avatar_url} 
                            alt={participant.full_name || 'User'} 
                            className="w-8 h-8 rounded-full mr-3"
                          />
                        )}
                        {participant.full_name || 'Anonymous'}
                      </div>
                    </td>
                    <td className="py-3 px-4">{participant.username || '-'}</td>
                    <td className="py-3 px-4">{new Date(participant.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <select
                        value={participant.status}
                        onChange={(e) => handleStatusChange(participant.id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option value="registered">Registered</option>
                        <option value="attended">Attended</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={participant.payment_status || ''}
                        onChange={(e) => handlePaymentStatusChange(participant.id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option value="">Not Required</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="refunded">Refunded</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        className="text-red-500 hover:underline"
                        onClick={async () => {
                          if (confirm('Are you sure you want to remove this participant?')) {
                            try {
                              const { error } = await supabase
                                .from('event_participants')
                                .delete()
                                .eq('id', participant.id);
                                
                              if (error) throw error;
                              
                              // Update local state
                              setParticipants(prev => prev.filter(p => p.id !== participant.id));
                            } catch (error) {
                              console.error('Error removing participant:', error);
                              alert('Failed to remove participant. Please try again.');
                            }
                          }
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500">No participants found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
