import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Gift, LogOut, User, Settings } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Layout() {
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#1a2c38]">
      <nav className="bg-[#2c4356] text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <Gift className="text-red-500" />
            <span>ChristmasWish</span>
          </Link>
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link to="/wishes" className="hover:text-red-400 transition-colors">
                  My Wishes
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="hover:text-red-400 transition-colors">
                    Admin Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{user?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-red-400 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="hover:text-red-400 transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}