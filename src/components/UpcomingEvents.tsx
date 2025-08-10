import Image from 'next/image';
import Link from 'next/link';
import { Event, createServerClient } from '@/lib/supabase';

// Fallback events data if no events are provided via props
const fallbackEvents = [
  {
    id: '1',
    title: 'Quiz Night: Film ve Diziler',
    date: '28 Haziran 2025',
    time: '19:30',
    location: 'Kadıköy Moda - Kafeka',
    images: ['/images/quiz-night-event.jpg'],
    category: 'Quiz Night',
    price: '150 TL',
    spotsLeft: 12,
    totalSpots: 20,
    description: '',
    host: { name: '', image: '', bio: '' },
    includedItems: [],
    requirements: [],
    faq: [],
  },
  {
    id: '2',
    title: 'Yaz Temalı Fake Düğün',
    date: '5 Temmuz 2025',
    time: '20:00',
    location: 'Beşiktaş - Feriye',
    images: ['/images/fake-wedding-event.jpg'],
    category: 'Fake Düğün',
    price: '250 TL',
    spotsLeft: 8,
    totalSpots: 20,
    description: '',
    host: { name: '', image: '', bio: '' },
    includedItems: [],
    requirements: [],
    faq: [],
  },
  {
    id: '3',
    title: '80\'ler Temalı Parti',
    date: '12 Temmuz 2025',
    time: '21:00',
    location: 'Beyoğlu - Babylon',
    images: ['/images/themed-party-event.jpg'],
    category: 'Temalı Partiler',
    price: '200 TL',
    spotsLeft: 15,
    totalSpots: 30,
    description: '',
    host: { name: '', image: '', bio: '' },
    includedItems: [],
    requirements: [],
    faq: [],
  },
  {
    id: '4',
    title: 'Yeni Kariyer Speed Meeting',
    date: '19 Temmuz 2025',
    time: '18:00',
    location: 'Levent - WorkHub',
    images: ['/images/speed-meeting-event.jpg'],
    category: 'Speed Meeting',
    price: '180 TL',
    spotsLeft: 20,
    totalSpots: 40,
    description: '',
    host: { name: '', image: '', bio: '' },
    includedItems: [],
    requirements: [],
    faq: [],
  },
];

async function getUpcomingEvents(): Promise<Event[]> {
  try {
    // Check if we're in a build environment without proper env variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Missing Supabase environment variables, using fallback events');
      return [];
    }
    
    const supabase = createServerClient();
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_published', true)
      .gte('date', today) // Only get events with dates greater than or equal to today
      .order('date', { ascending: true }) // Order by date ascending
      .limit(4); // Limit to 4 events
    
    if (error) {
      console.error('Error fetching upcoming events:', error);
      return [];
    }
    
    // Return events directly as they match the Event type
    return data;
  } catch (error) {
    console.error('Error in getUpcomingEvents:', error);
    return [];
  }
}

const UpcomingEvents = async () => {
  const events = await getUpcomingEvents();
  
  // Use fetched events or fallback to sample data if no events are returned
  const displayEvents = events.length > 0 ? events : fallbackEvents;
  return (
    <section className="section bg-light">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Yaklaşan Etkinlikler</h2>
            <p className="text-gray-600">Yerini şimdiden ayırt!</p>
          </div>
          <Link href="/etkinlikler" className="btn-outline mt-4 md:mt-0">
            Tüm Etkinlikler
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayEvents.map((event) => (
            <div key={event.id} className="card group">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute top-0 left-0 bg-primary text-white z-10 py-1 px-3 rounded-br-lg">
                  {event.category}
                </div>
                <Image
                  src={Array.isArray(event.images) && event.images.length > 0 ? event.images[0] : '/images/event-placeholder.jpg'}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <span className="text-primary font-medium">{event.price}</span>
                </div>
                <div className="flex items-center text-gray-500 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{event.date} - {event.time}</span>
                </div>
                <div className="flex items-center text-gray-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-accent">Son {event.spots_left} kontenjan</span>
                  <Link href={`/etkinlikler/${event.id}`} className="text-primary font-medium hover:underline">
                    Detaylar →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
