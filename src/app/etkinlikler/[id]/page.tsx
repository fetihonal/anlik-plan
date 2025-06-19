import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventDetail from '@/components/EventDetail';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { Event } from '@/lib/supabase';

// Fetch event data from Supabase
async function getEventData(id: string): Promise<Event | null> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single();
  
  if (error || !data) {
    console.error('Error fetching event:', error);
    return null;
  }
  
  return data as Event;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const event = await getEventData(params.id);
  
  if (!event) {
    return {
      title: 'Etkinlik Bulunamadı | Anlık Plan',
      description: 'Aradığınız etkinlik bulunamadı.'
    };
  }

  return {
    title: `${event.title} | Anlık Plan`,
    description: event.description.substring(0, 160) + '...',
  };
}

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEventData(params.id);

  if (!event) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Etkinlik Bulunamadı</h1>
            <p className="text-gray-600 mb-6">Aradığınız etkinlik bulunamadı veya kaldırılmış olabilir.</p>
            <a href="/etkinlikler" className="btn-primary">Tüm Etkinliklere Dön</a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Transform snake_case database fields to camelCase for the component
  const transformedEvent = {
    ...event,
    spotsLeft: event.spots_left,
    totalSpots: event.total_spots,
    // Ensure arrays are properly handled
    images: Array.isArray(event.images) ? event.images : [],
    includedItems: Array.isArray(event.included_items) ? event.included_items : [],
    requirements: Array.isArray(event.requirements) ? event.requirements : [],
    faq: Array.isArray(event.faq) ? event.faq : [],
    // Ensure host object is properly structured
    host: typeof event.host === 'object' ? event.host : { name: '', image: '', bio: '' }
  };

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <EventDetail {...transformedEvent} />
      </main>
      <Footer />
    </>
  );
}
