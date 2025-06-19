'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';
import type { Event } from '@/lib/supabase';

export default function EventEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const supabase = createBrowserClient();
  const isNewEvent = params.id === 'new';
  
  // Define proper types for the event object
  interface EventHost {
    name: string;
    image: string;
    bio: string;
  }

  interface FaqItem {
    question: string;
    answer: string;
  }

  interface EventData {
    id?: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    price: string;
    category: string;
    spots_left: number;
    total_spots: number;
    images: string[];
    host: EventHost;
    included_items: string[];
    requirements: string[];
    faq: FaqItem[];
    is_featured: boolean;
    is_published: boolean;
  }

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [event, setEvent] = useState<EventData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    category: '',
    spots_left: 0,
    total_spots: 0,
    images: [],
    host: {
      name: '',
      image: '',
      bio: ''
    },
    included_items: [],
    requirements: [],
    faq: [],
    is_featured: false,
    is_published: true,
  });

  useEffect(() => {
    async function fetchEvent() {
      if (isNewEvent) {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', params.id)
        .single();
        
      if (error) {
        console.error('Error fetching event:', error);
        setLoading(false);
        return;
      }
      
      if (data) {
        try {
          // Parse JSON fields if they're strings
          const parsedData = {
            id: data.id,
            title: data.title || '',
            description: data.description || '',
            date: data.date || '',
            time: data.time || '',
            location: data.location || '',
            price: data.price || '',
            category: data.category || '',
            spots_left: data.spots_left || 0,
            total_spots: data.total_spots || 0,
            is_featured: data.is_featured || false,
            is_published: data.is_published || false,
            images: Array.isArray(data.images) ? data.images : JSON.parse(data.images || '[]'),
            host: typeof data.host === 'object' ? data.host : JSON.parse(data.host || '{}'),
            included_items: Array.isArray(data.included_items) ? data.included_items : JSON.parse(data.included_items || '[]'),
            requirements: Array.isArray(data.requirements) ? data.requirements : JSON.parse(data.requirements || '[]'),
            faq: Array.isArray(data.faq) ? data.faq : JSON.parse(data.faq || '[]')
          } as EventData;
          
          setEvent(parsedData);
        } catch (error) {
          console.error('Error parsing event data:', error);
        }
      }
      
      setLoading(false);
    }
    
    fetchEvent();
  }, [params.id, isNewEvent, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEvent(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'spots_left' || name === 'total_spots') {
      setEvent(prev => ({ ...prev, [name]: value === '' ? 0 : Number(value) }));
    } else if (name.includes('.')) {
      // Handle nested properties like host.name
      const [parent, child] = name.split('.');
      setEvent(prev => {
        if (parent === 'host') {
          return {
            ...prev,
            host: {
              ...prev.host,
              [child]: value
            }
          };
        }
        return prev;
      });
    } else {
      setEvent(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Ensure all JSON fields are properly formatted
      const eventData = {
        ...event,
        // Make sure these are arrays/objects, not strings
        images: Array.isArray(event.images) ? event.images : [],
        host: typeof event.host === 'object' ? event.host : { name: '', image: '', bio: '' },
        included_items: Array.isArray(event.included_items) ? event.included_items : [],
        requirements: Array.isArray(event.requirements) ? event.requirements : [],
        faq: Array.isArray(event.faq) ? event.faq : []
      };
      
      if (isNewEvent) {
        const { data, error } = await supabase
          .from('events')
          .insert([eventData])
          .select();
          
        if (error) {
          console.error('Error creating event:', error);
          throw error;
        }
        
        if (data && data[0]) {
          alert('Etkinlik başarıyla oluşturuldu!');
          router.push(`/admin/events/${data[0].id}`);
        }
      } else {
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', params.id);
          
        if (error) {
          console.error('Error updating event:', error);
          throw error;
        }
        
        alert('Etkinlik başarıyla güncellendi!');
        router.push('/admin/events');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Etkinlik kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {isNewEvent ? 'Create New Event' : 'Edit Event'}
      </h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={event.title || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={event.description || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="text"
              name="date"
              value={event.date || ''}
              onChange={handleChange}
              placeholder="15 Haziran 2024"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="text"
              name="time"
              value={event.time || ''}
              onChange={handleChange}
              placeholder="14:00 - 16:30"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={event.location || ''}
              onChange={handleChange}
              placeholder="Brew Coffeeworks, Kadıköy"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={event.price || ''}
              onChange={handleChange}
              placeholder="75 ₺"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={event.category || ''}
              onChange={handleChange}
              placeholder="Kahve, Müzik, Spor, vb."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Spots Left
            </label>
            <input
              type="number"
              name="spots_left"
              value={event.spots_left || 0}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Spots
            </label>
            <input
              type="number"
              name="total_spots"
              value={event.total_spots || 0}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Images
            </label>
            <div className="border border-gray-300 rounded-md p-3 space-y-2">
              {event.images.map((imageUrl, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => {
                      const newImages = [...event.images];
                      newImages[index] = e.target.value;
                      setEvent(prev => ({ ...prev, images: newImages }));
                    }}
                    placeholder="/images/event-image.jpg"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = [...event.images];
                      newImages.splice(index, 1);
                      setEvent(prev => ({ ...prev, images: newImages }));
                    }}
                    className="ml-2 p-2 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setEvent(prev => ({
                    ...prev,
                    images: [...prev.images, '']
                  }));
                }}
                className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-500 focus:outline-none"
              >
                + Yeni Görsel Ekle
              </button>
            </div>
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Host Information
            </label>
            <div className="grid grid-cols-1 gap-3 border border-gray-300 rounded-md p-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Host Name
                </label>
                <input
                  type="text"
                  name="host.name"
                  value={event.host?.name || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Host Image URL
                </label>
                <input
                  type="text"
                  name="host.image"
                  value={event.host?.image || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Host Bio
                </label>
                <textarea
                  name="host.bio"
                  value={event.host?.bio || ''}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Included Items
            </label>
            <div className="border border-gray-300 rounded-md p-3 space-y-2">
              {event.included_items.map((item, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...event.included_items];
                      newItems[index] = e.target.value;
                      setEvent(prev => ({ ...prev, included_items: newItems }));
                    }}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newItems = [...event.included_items];
                      newItems.splice(index, 1);
                      setEvent(prev => ({ ...prev, included_items: newItems }));
                    }}
                    className="ml-2 p-2 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setEvent(prev => ({
                    ...prev,
                    included_items: [...prev.included_items, '']
                  }));
                }}
                className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-500 focus:outline-none"
              >
                + Yeni Öğe Ekle
              </button>
            </div>
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requirements
            </label>
            <div className="border border-gray-300 rounded-md p-3 space-y-2">
              {event.requirements.map((item, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...event.requirements];
                      newItems[index] = e.target.value;
                      setEvent(prev => ({ ...prev, requirements: newItems }));
                    }}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newItems = [...event.requirements];
                      newItems.splice(index, 1);
                      setEvent(prev => ({ ...prev, requirements: newItems }));
                    }}
                    className="ml-2 p-2 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setEvent(prev => ({
                    ...prev,
                    requirements: [...prev.requirements, '']
                  }));
                }}
                className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-500 focus:outline-none"
              >
                + Yeni Gereksinim Ekle
              </button>
            </div>
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              FAQ (Sık Sorulan Sorular)
            </label>
            <div className="border border-gray-300 rounded-md p-3 space-y-4">
              {event.faq.map((item, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-md bg-gray-50">
                  <div className="mb-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Soru
                    </label>
                    <input
                      type="text"
                      value={item.question}
                      onChange={(e) => {
                        const newFaq = [...event.faq];
                        newFaq[index] = { ...newFaq[index], question: e.target.value };
                        setEvent(prev => ({ ...prev, faq: newFaq }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Cevap
                    </label>
                    <textarea
                      value={item.answer}
                      onChange={(e) => {
                        const newFaq = [...event.faq];
                        newFaq[index] = { ...newFaq[index], answer: e.target.value };
                        setEvent(prev => ({ ...prev, faq: newFaq }));
                      }}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        const newFaq = [...event.faq];
                        newFaq.splice(index, 1);
                        setEvent(prev => ({ ...prev, faq: newFaq }));
                      }}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setEvent(prev => ({
                    ...prev,
                    faq: [...prev.faq, { question: '', answer: '' }]
                  }));
                }}
                className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-500 focus:outline-none"
              >
                + Yeni Soru/Cevap Ekle
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              checked={event.is_featured || false}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-700">
              Featured Event
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_published"
              name="is_published"
              checked={event.is_published || false}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="is_published" className="ml-2 block text-sm text-gray-700">
              Published
            </label>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/admin/events')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Event'}
          </button>
        </div>
      </form>
    </div>
  );
}
