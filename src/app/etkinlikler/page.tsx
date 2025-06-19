import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UpcomingEvents from '@/components/UpcomingEvents';
import EventFormats from '@/components/EventFormats';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { Event } from '@/lib/supabase';

export const metadata = {
  title: 'Etkinlikler | Anlık Plan',
  description: 'Anlık Plan\'ın yaklaşan etkinlikleri ve etkinlik formatları hakkında bilgi edinin.',
};

async function getEvents() {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_published', true)
    .order('date', { ascending: true });
  
  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  
  return data as Event[];
}

export default async function EventsPage() {
  const events = await getEvents();
  
  return (
    <>
      <Navbar />
      <main>
        <div className="pt-24 pb-12 bg-light">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Etkinliklerimiz</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
              Anlık Plan'ın yaklaşan etkinlikleri ve farklı etkinlik formatları hakkında bilgi edinin.
            </p>
          </div>
        </div>
        <UpcomingEvents events={events} />
        <EventFormats />
      </main>
      <Footer />
    </>
  );
}
