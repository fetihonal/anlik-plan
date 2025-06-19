'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createBrowserClient, EventFormat } from '@/lib/supabase';

export default function EventFormatsAdmin() {
  const [eventFormats, setEventFormats] = useState<EventFormat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fetch event formats
  useEffect(() => {
    async function fetchEventFormats() {
      try {
        setLoading(true);
        const supabase = createBrowserClient();
        
        const { data, error } = await supabase
          .from('event_formats')
          .select('*')
          .order('title');
        
        if (error) {
          throw error;
        }
        
        setEventFormats(data || []);
      } catch (err) {
        console.error('Error fetching event formats:', err);
        setError('Etkinlik formatları yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchEventFormats();
  }, []);

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Bu etkinlik formatını silmek istediğinize emin misiniz?')) {
      return;
    }
    
    try {
      const supabase = createBrowserClient();
      
      const { error } = await supabase
        .from('event_formats')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Remove from state
      setEventFormats(eventFormats.filter(format => format.id !== id));
      alert('Etkinlik formatı başarıyla silindi.');
    } catch (err) {
      console.error('Error deleting event format:', err);
      alert('Etkinlik formatı silinirken bir hata oluştu.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Etkinlik Formatları Yönetimi</h1>
        <Link href="/admin/event-formats/new" className="btn-primary">
          Yeni Format Ekle
        </Link>
      </div>

      {loading ? (
        <p className="text-center py-8">Yükleniyor...</p>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : eventFormats.length === 0 ? (
        <p className="text-center py-8">Henüz etkinlik formatı bulunmuyor.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Görsel
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlık
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Açıklama
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody>
              {eventFormats.map((format) => (
                <tr key={format.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <div className="relative h-12 w-20">
                      <Image
                        src={format.image}
                        alt={format.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm text-gray-500">
                    {format.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    {format.title}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm">
                    <div className="line-clamp-2">{format.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/event-formats/${format.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Düzenle
                      </Link>
                      <button
                        onClick={() => handleDelete(format.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
