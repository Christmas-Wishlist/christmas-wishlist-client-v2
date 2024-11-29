export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export interface ChristmasWish {
  _id: string;
  title: string;
  message: string;
  recipient: string;
  owner: User;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
  updateProfile: (userId: string, data: { username?: string; email?: string }) => Promise<void>;
}