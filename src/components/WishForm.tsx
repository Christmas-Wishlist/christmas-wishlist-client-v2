import React, { useState, useEffect } from 'react';
import { ChristmasWish } from '../types';

interface WishFormProps {
  onSubmit: (data: { title: string; message: string; recipient: string }) => Promise<void>;
  onCancel: () => void;
  initialData?: ChristmasWish;
}

export default function WishForm({ onSubmit, onCancel, initialData }: WishFormProps) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setMessage(initialData.message);
      setRecipient(initialData.recipient);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ title, message, recipient });
    setTitle('');
    setMessage('');
    setRecipient('');
  };

  return (
    <div className="bg-[#2c4356] p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-xl font-bold mb-4 text-white">
        {initialData ? 'Edit Wish' : 'Create a New Wish'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-white mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-[#1a2c38] text-white border border-gray-600 focus:border-red-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-white mb-2">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 rounded bg-[#1a2c38] text-white border border-gray-600 focus:border-red-500 focus:outline-none"
            rows={4}
            required
          />
        </div>
        <div>
          <label htmlFor="recipient" className="block text-white mb-2">Recipient</label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-2 rounded bg-[#1a2c38] text-white border border-gray-600 focus:border-red-500 focus:outline-none"
            required
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-white hover:text-red-400 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            {initialData ? 'Update Wish' : 'Create Wish'}
          </button>
        </div>
      </form>
    </div>
  );
}