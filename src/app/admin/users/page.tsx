'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase';
import type { Profile } from '@/lib/supabase';

export default function UsersPage() {
  const supabase = createBrowserClient();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching users:', error);
        return;
      }
      
      setUsers(data || []);
      setLoading(false);
    }
    
    fetchUsers();
  }, [supabase]);

  const filteredUsers = users.filter(user => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      (user.username && user.username.toLowerCase().includes(searchLower)) ||
      (user.full_name && user.full_name.toLowerCase().includes(searchLower)) ||
      (user.email && user.email.toLowerCase().includes(searchLower))
    );
  });

  const handleMakeAdmin = async (userId: string, isAdmin: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: isAdmin })
        .eq('id', userId);
        
      if (error) throw error;
      
      // Update local state
      setUsers(prev => 
        prev.map(user => user.id === userId ? { ...user, is_admin: isAdmin } : user)
      );
      
      alert(`User ${isAdmin ? 'promoted to admin' : 'demoted from admin'} successfully!`);
    } catch (error) {
      console.error('Error updating user admin status:', error);
      alert('Failed to update user admin status. Please try again.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="text-center py-10">Loading users...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Joined</th>
                  <th className="py-3 px-4">Admin</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {user.avatar_url && (
                            <img 
                              src={user.avatar_url} 
                              alt={user.full_name || 'User'} 
                              className="w-8 h-8 rounded-full mr-3"
                            />
                          )}
                          <div>
                            <div className="font-medium">{user.full_name || 'Anonymous'}</div>
                            {user.username && <div className="text-sm text-gray-500">@{user.username}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{user.email || '-'}</td>
                      <td className="py-3 px-4">{new Date(user.created_at).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        {user.is_admin ? (
                          <span className="px-2 py-1 bg-primary bg-opacity-20 text-primary rounded-full text-xs">
                            Admin
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            User
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => handleMakeAdmin(user.id, !user.is_admin)}
                            className={`text-sm ${user.is_admin ? 'text-red-500' : 'text-primary'} hover:underline`}
                          >
                            {user.is_admin ? 'Remove Admin' : 'Make Admin'}
                          </button>
                          <button 
                            className="text-sm text-red-500 hover:underline"
                            onClick={async () => {
                              if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
                                try {
                                  // First delete from auth.users (this will cascade to profiles due to foreign key)
                                  const { error } = await supabase.auth.admin.deleteUser(user.id);
                                  
                                  if (error) throw error;
                                  
                                  // Update local state
                                  setUsers(prev => prev.filter(u => u.id !== user.id));
                                  
                                  alert('User deleted successfully!');
                                } catch (error) {
                                  console.error('Error deleting user:', error);
                                  alert('Failed to delete user. Please try again.');
                                }
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-500">
                      {searchTerm ? 'No users found matching your search' : 'No users found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
