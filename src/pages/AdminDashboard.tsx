import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, ChristmasWish } from '../types';
import { Trash2, User as UserIcon } from 'lucide-react';

const API_URL = 'http://localhost:8080/api';

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [wishes, setWishes] = useState<ChristmasWish[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchAllWishes();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, { withCredentials: true });
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users');
    }
  };

  const fetchAllWishes = async () => {
    try {
      const response = await axios.get(`${API_URL}/christmaswish`, { withCredentials: true });
      setWishes(response.data);
    } catch (error) {
      console.error('Failed to fetch wishes');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`${API_URL}/users/${userId}`, { withCredentials: true });
      fetchUsers();
      fetchAllWishes();
    } catch (error) {
      console.error('Failed to delete user');
    }
  };

  const handleDeleteWish = async (wishId: string) => {
    try {
      await axios.delete(`${API_URL}/christmaswish/${wishId}`, { withCredentials: true });
      fetchAllWishes();
    } catch (error) {
      console.error('Failed to delete wish');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Users</h2>
        <div className="grid gap-4">
          {users.map((user) => (
            <div key={user._id} className="bg-[#2c4356] p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserIcon className="text-red-500 w-5 h-5" />
                <div>
                  <p className="text-white font-semibold">{user.username}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">All Wishes</h2>
        <div className="grid gap-4">
          {wishes.map((wish) => (
            <div key={wish._id} className="bg-[#2c4356] p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white">{wish.title}</h3>
                <button
                  onClick={() => handleDeleteWish(wish._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-300 mb-2">{wish.message}</p>
              <div className="text-sm text-gray-400">
                <p>To: {wish.recipient}</p>
                <p>From: {wish.owner.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}