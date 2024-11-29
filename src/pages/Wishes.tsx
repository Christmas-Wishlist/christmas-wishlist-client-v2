import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Gift, Trash2, Edit, UserCog } from 'lucide-react';
import { ChristmasWish } from '../types';
import { useAuthStore } from '../store/authStore';
import WishForm from '../components/WishForm';
import ProfileForm from '../components/ProfileForm';

const API_URL = 'http://localhost:8080/api';

export default function Wishes() {
  const [wishes, setWishes] = useState<ChristmasWish[]>([]);
  const [showWishForm, setShowWishForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [editingWish, setEditingWish] = useState<ChristmasWish | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const response = await axios.get(`${API_URL}/christmaswish`, { withCredentials: true });
      setWishes(response.data);
    } catch (error) {
      console.error('Failed to fetch wishes');
    }
  };

  const handleCreateWish = async (data: { title: string; message: string; recipient: string }) => {
    try {
      await axios.post(
        `${API_URL}/christmaswish`,
        data,
        { withCredentials: true }
      );
      setShowWishForm(false);
      fetchWishes();
    } catch (error) {
      console.error('Failed to create wish');
    }
  };

  const handleUpdateWish = async (data: { title: string; message: string; recipient: string }) => {
    try {
      await axios.put(
        `${API_URL}/christmaswish/${editingWish?._id}`,
        data,
        { withCredentials: true }
      );
      setEditingWish(null);
      fetchWishes();
    } catch (error) {
      console.error('Failed to update wish');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/christmaswish/${id}`, { withCredentials: true });
      fetchWishes();
    } catch (error) {
      console.error('Failed to delete wish');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Christmas Wishes</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowProfileForm(true)}
            className="bg-[#2c4356] hover:bg-[#3a5875] text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
          >
            <UserCog className="w-5 h-5" />
            Edit Profile
          </button>
          <button
            onClick={() => setShowWishForm(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            New Wish
          </button>
        </div>
      </div>

      {showProfileForm && (
        <ProfileForm onClose={() => setShowProfileForm(false)} />
      )}

      {(showWishForm || editingWish) && (
        <WishForm
          onSubmit={editingWish ? handleUpdateWish : handleCreateWish}
          onCancel={() => {
            setShowWishForm(false);
            setEditingWish(null);
          }}
          initialData={editingWish || undefined}
        />
      )}

      <div className="grid gap-6">
        {wishes.map((wish) => (
          <div key={wish._id} className="bg-[#2c4356] p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Gift className="text-red-500 w-6 h-6" />
                <h3 className="text-xl font-semibold text-white">{wish.title}</h3>
              </div>
              {user?._id === wish.owner._id && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingWish(wish)}
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(wish._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            <p className="text-gray-300 mb-4">{wish.message}</p>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>To: {wish.recipient}</span>
              <span>From: {wish.owner.username}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}