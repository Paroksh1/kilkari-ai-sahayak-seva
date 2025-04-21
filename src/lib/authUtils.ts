
import { User } from '@/types';

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 28,
    pregnancyWeek: 24,
    dietaryPreference: 'vegetarian',
    allergies: ['peanuts'],
    location: '110001',
    language: 'hindi',
    moodHistory: [
      { date: '2023-04-15', mood: 'happy', note: 'Felt baby kick today!' },
      { date: '2023-04-14', mood: 'neutral', note: 'Had trouble sleeping' },
      { date: '2023-04-13', mood: 'neutral', note: '' },
    ]
  },
  {
    id: '2',
    name: 'Sneha Patel',
    age: 32,
    babyMonths: 4,
    dietaryPreference: 'vegetarian',
    allergies: [],
    location: '400001',
    language: 'english',
    moodHistory: [
      { date: '2023-04-15', mood: 'happy', note: 'Baby smiled at me!' },
      { date: '2023-04-14', mood: 'neutral', note: '' },
      { date: '2023-04-13', mood: 'sad', note: 'Baby was crying all night' },
    ]
  }
];

// Get user from local storage
export const getUser = (): User | null => {
  const userStr = localStorage.getItem('kilkari-user');
  return userStr ? JSON.parse(userStr) : null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getUser() !== null;
};

// Save user to local storage
export const saveUser = (user: User): void => {
  localStorage.setItem('kilkari-user', JSON.stringify(user));
};

// Login function
export const login = async (email: string, password: string): Promise<User> => {
  // For demo purposes, we'll just use the first mock user
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        // Get the saved language preference or default to 'hindi'
        const savedLang = localStorage.getItem('language') as 'hindi' | 'english' || 'hindi';
        const user = { ...mockUsers[0], language: savedLang };
        saveUser(user);
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

// Signup function
export const signup = async (userData: Partial<User>): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || '',
        age: userData.age || 0,
        pregnancyWeek: userData.pregnancyWeek,
        babyMonths: userData.babyMonths,
        dietaryPreference: userData.dietaryPreference || 'vegetarian',
        allergies: userData.allergies || [],
        location: userData.location || '',
        language: userData.language || 'hindi',
        moodHistory: [],
      };
      
      // Save language preference globally
      localStorage.setItem('language', newUser.language);
      
      resolve(newUser);
    }, 1000);
  });
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem('kilkari-user');
};
