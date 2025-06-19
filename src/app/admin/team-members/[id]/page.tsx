"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export default function EditTeamMemberPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  const [formData, setFormData] = useState<TeamMember | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .eq("id", params.id)
          .single();
          
        if (error) {
          throw new Error(`Error fetching team member: ${error.message}`);
        }
        
        if (data) {
          setFormData(data);
          
          // Set image preview if exists
          if (data.image) {
            if (data.image.startsWith("/")) {
              setImagePreview(data.image);
            } else {
              setImagePreview(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/team-images/${data.image}`);
            }
          }
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeamMember();
  }, [params.id, supabase]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    
    const { name, value } = e.target;
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: name === "order_index" ? parseInt(value) || 0 : value,
      };
    });
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
    if (!formData) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      let imagePath = formData.image;
      
      // Upload new image if selected
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
      
      // Update team member data
      const { data, error: updateError } = await supabase
        .from("team_members")
        .update({
          name: formData.name,
          role: formData.role,
          bio: formData.bio,
          image: imagePath,
          order_index: formData.order_index,
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)
        .select();
        
      if (updateError) {
        throw new Error(`Error updating team member: ${updateError.message}`);
      }
      
      // Show success message
      alert("Takım üyesi başarıyla güncellendi!");
      
      // Redirect back to team members list
      window.location.href = "/admin/team-members";
      
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async () => {
    console.log("Delete button clicked");
    console.log("Team member ID:", params.id);
    
    if (!confirm("Bu takım üyesini silmek istediğinizden emin misiniz?")) {
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log("Attempting to delete team member with ID:", params.id);
      
      // Delete the team member
      const deleteResponse = await supabase
        .from("team_members")
        .delete()
        .eq("id", params.id);
      
      console.log("Delete response:", deleteResponse);
      
      if (deleteResponse.error) {
        console.error("Delete error:", deleteResponse.error);
        throw new Error(`Error deleting team member: ${deleteResponse.error.message}`);
      }
      
      // Delete the image if it's in Supabase storage
      if (formData?.image && !formData.image.startsWith("/")) {
        console.log("Attempting to delete image:", formData.image);
        
        const storageResponse = await supabase.storage
          .from("team-images")
          .remove([formData.image]);
          
        console.log("Storage delete response:", storageResponse);
      }
      
      // Show success message
      alert("Takım üyesi başarıyla silindi!");
      
      // Redirect back to team members list using window.location for a full page refresh
      setTimeout(() => {
        console.log("Redirecting to team members list");
        window.location.href = "/admin/team-members";
      }, 500);
      
    } catch (err) {
      console.error("Error in handleDelete:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!formData) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md">
        Team member not found
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Team Member</h1>
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
                  Change Image
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
          
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => {
                console.log("Delete button clicked directly");
                handleDelete();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Delete Team Member
            </button>
            
            <div className="flex space-x-3">
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
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
