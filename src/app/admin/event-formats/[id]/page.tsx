'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient, EventFormat } from '@/lib/supabase';
import { use } from 'react';

export default function EditEventFormat({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<EventFormat, 'id' | 'created_at' | 'updated_at'>>({
    title: '',
    description: '',
    image: '',
  });

  // Fetch event format data
  useEffect(() => {
    async function fetchEventFormat() {
      try {
        setLoading(true);
        const supabase = createBrowserClient();
        
        const { data, error } = await supabase
          .from('event_formats')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (!data) {
          throw new Error('Etkinlik formatı bulunamadı.');
        }
        
        setFormData({
          title: data.title,
          description: data.description,
          image: data.image,
        });
      } catch (err) {
        console.error('Error fetching event format:', err);
        setError('Etkinlik formatı yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchEventFormat();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.image) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    
    try {
      setSaving(true);
      setError(null);
      
      const supabase = createBrowserClient();
      
      const { error } = await supabase
        .from('event_formats')
        .update(formData)
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      alert('Etkinlik formatı başarıyla güncellendi!');
      router.push('/admin/event-formats');
    } catch (err) {
      console.error('Error updating event format:', err);
      setError('Etkinlik formatı güncellenirken bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-center py-8">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Etkinlik Formatı Düzenle</h1>
        <p className="text-gray-500">ID: {id}</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Başlık
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Açıklama
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Görsel URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Görsel dosyasını /public/images/ klasörüne ekleyin ve yolunu buraya yazın.
          </p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Önizleme
          </label>
          {formData.image && (
            <div className="mt-2 relative h-40 w-full md:w-1/2 lg:w-1/3 border rounded overflow-hidden">
              <img
                src={formData.image}
                alt="Format önizleme"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => router.push('/admin/event-formats')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
