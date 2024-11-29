import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const register = useAuthStore(state => state.register);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#2c4356] p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Create an Account</h2>
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
        <div>
          <label htmlFor="password" className="block text-white mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-[#1a2c38] text-white border border-gray-600 focus:border-red-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
}