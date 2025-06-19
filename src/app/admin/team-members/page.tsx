"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from 'next/link';
import Image from 'next/image';
import DeleteTeamMemberButton from '@/components/DeleteTeamMemberButton';

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

export default function TeamMembersPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  
  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index', { ascending: true });
        
      if (error) {
        throw new Error(`Error fetching team members: ${error.message}`);
      }
      
      setTeamMembers(data || []);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTeamMembers();
  }, [supabase]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Members Management</h1>
        <Link 
          href="/admin/team-members/new" 
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90"
        >
          Add New Team Member
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers && teamMembers.length > 0 ? (
                  teamMembers.map((member) => (
                    <tr key={member.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image 
                            src={member.image.startsWith("/") ? member.image : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/team-images/${member.image}`}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{member.name}</td>
                      <td className="py-3 px-4">{member.role}</td>
                      <td className="py-3 px-4">{member.order_index}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-3">
                          <Link href={`/admin/team-members/${member.id}`} className="text-primary hover:underline">
                            Edit
                          </Link>
                          <DeleteTeamMemberButton 
                            memberId={member.id}
                            memberName={member.name}
                            memberImage={member.image}
                            onDelete={fetchTeamMembers}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-500">No team members found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
