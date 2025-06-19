"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";

export default function NewTeamMemberPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    order_index: 0,
  });
  
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order_index" ? parseInt(value) || 0 : value,
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      let imagePath = "";
      
      // Upload image if selected
      if (image) {
        const fileExt = image.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        
        // Check if team-images bucket exists, if not create it
        const { data: buckets } = await supabase.storage.listBuckets();
        const bucketExists = buckets?.some(bucket => bucket.name === "team-images");
        
        if (!bucketExists) {
          await supabase.storage.createBucket("team-images", {
            public: true,
            allowedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
            fileSizeLimit: 1024 * 1024 * 2, // 2MB
          });
        }
        
        // Upload the file
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("team-images")
          .upload(fileName, image);
          
        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }
        
        imagePath = fileName;
      }
      
      // Insert team member data
      const { error: insertError } = await supabase
        .from("team_members")
        .insert({
          name: formData.name,
          role: formData.role,
          bio: formData.bio,
          image: imagePath,
          order_index: formData.order_index,
        });
        
      if (insertError) {
        throw new Error(`Error creating team member: ${insertError.message}`);
      }
      
      // Redirect back to team members list
      router.push("/admin/team-members");
      router.refresh();
      
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Team Member</h1>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label htmlFor="order_index" className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  id="order_index"
                  name="order_index"
                  value={formData.order_index}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image
              </label>
              <div className="mt-1 flex flex-col items-center space-y-4">
                {imagePreview ? (
                  <div className="relative h-48 w-48 rounded-full overflow-hidden">
                    <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48 w-48 rounded-full bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                
                <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                  Select Image
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Team Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
