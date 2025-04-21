import { User } from '@/types';
import { mockUser } from './mockData';

// Save user to localStorage
export const saveUser = (user: User): void => {
  localStorage.setItem('kilkari-user', JSON.stringify(user));
};

// Get user from localStorage
export const getUser = (): User | null => {
  const userStr = localStorage.getItem('kilkari-user');
  return userStr ? JSON.parse(userStr) : null;
};

// Mock login function
export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For demo purposes, accept any non-empty credentials
      if (email && password) {
        // Check if we already have a stored user
        const existingUser = getUser();
        if (existingUser) {
          resolve(existingUser);
        } else {
          // Use mock data for first login
          resolve(mockUser);
        }
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 800); // Simulate network delay
  });
};

// Mock signup function
export const signup = (userData: Omit<User, 'id' | 'moodHistory'>): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        moodHistory: [],
      };
      saveUser(newUser);
      resolve(newUser);
    }, 800); // Simulate network delay
  });
};

// Mock logout function
export const logout = (): void => {
  // In a real app, we might not want to remove the user data on logout
  // But for demo purposes, we'll keep it simple
  localStorage.removeItem('kilkari-auth-token');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getUser();
};
