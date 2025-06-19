"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createBrowserClient, EventFormat } from "@/lib/supabase";

const EventFormats = () => {
  const [eventFormats, setEventFormats] = useState<EventFormat[]>([]);
  const [activeFormat, setActiveFormat] = useState<EventFormat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch event formats from Supabase
    async function fetchEventFormats() {
      try {
        setIsLoading(true);
        setError(null);
        
        const supabase = createBrowserClient();
        
        const { data, error } = await supabase
          .from('event_formats')
          .select('*')
          .order('title');
        
        if (error) {
          console.error('Error fetching event formats:', error);
          setError('Etkinlik formatları yüklenirken bir hata oluştu.');
          return;
        }
        
        if (data && data.length > 0) {
          setEventFormats(data);
          setActiveFormat(data[0]);
        } else {
          setError('Henüz etkinlik formatı bulunmuyor.');
        }
      } catch (error) {
        console.error('Error in fetchEventFormats:', error);
        setError('Beklenmeyen bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchEventFormats();
  }, []);

  // If still loading, show loading state
  if (isLoading) {
    return (
      <section className="section bg-light">
        <div className="container-custom text-center py-12">
          <p>Etkinlik formatları yükleniyor...</p>
        </div>
      </section>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <section className="section bg-light">
        <div className="container-custom text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  // If no formats or active format, show message
  if (eventFormats.length === 0 || !activeFormat) {
    return (
      <section className="section bg-light">
        <div className="container-custom text-center py-12">
          <p>Henüz etkinlik formatı bulunmuyor.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Etkinlik Formatlarımız
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Her hafta farklı formatlarda düzenlediğimiz etkinliklerle yeni
            insanlarla tanışın ve eğlenceli vakit geçirin.
          </p>
        </div>

        {/* Event Format Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {eventFormats.map((format) => (
            <button
              key={format.id}
              onClick={() => setActiveFormat(format)}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${
                activeFormat && activeFormat.id === format.id
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}>
              {format.title}
            </button>
          ))}
        </div>

        {/* Active Format Display */}
        {activeFormat && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative h-[300px]">
                <Image
                  src={activeFormat.image}
                  alt={activeFormat.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">
                  {activeFormat.title}
                </h3>
                <p className="text-gray-600 mb-6">{activeFormat.description}</p>
                <Link
                  href={`/etkinlikler#${activeFormat.id}`}
                  className="btn-primary self-start">
                  Detaylı Bilgi
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventFormats;
