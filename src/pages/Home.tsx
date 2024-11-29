import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
      <div className="text-center max-w-3xl">
        <div className="flex justify-center mb-8">
          <Gift className="w-24 h-24 text-red-500" />
        </div>
        <h1 className="text-5xl font-bold mb-6">Make Your Christmas Wishes Come True</h1>
        <p className="text-xl mb-8 text-gray-300">
          Create and share your Christmas wishes with loved ones. Let the magic of Christmas bring joy to everyone!
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/wishes"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors"
          >
            <Star className="w-5 h-5" />
            Make a Wish
          </Link>
          <Link
            to="/register"
            className="bg-[#2c4356] hover:bg-[#3a5875] text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
}