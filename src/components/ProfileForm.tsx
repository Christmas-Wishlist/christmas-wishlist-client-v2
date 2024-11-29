import React, { useState } from 'react';
import { User } from '../types';
import { useAuthStore } from '../store/authStore';

interface ProfileFormProps {
  onClose: () => void;
}

export default function ProfileForm({ onClose }: ProfileFormProps) {
  const { user, updateProfile } = useAuthStore();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(user!._id, { username, email });
      onClose();
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  return (
    <div className="bg-[#2c4356] p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Edit Profile</h2>
      {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-white mb-2">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-[#1a2c38] text-white border border-gray-600 focus:border-red-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-white mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-[#1a2c38] text-white border border-gray-600 focus:border-red-500 focus:outline-none"
            required
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-white hover:text-red-400 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}