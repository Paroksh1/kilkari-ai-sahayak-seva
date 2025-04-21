
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

// Store for user credentials
interface UserCredential {
  email: string; // or contact info
  password: string;
  userId: string;
}

// Get stored credentials
const getStoredCredentials = (): UserCredential[] => {
  const credentialsStr = localStorage.getItem('kilkari-credentials');
  return credentialsStr ? JSON.parse(credentialsStr) : [];
};

// Save credentials
const saveCredentials = (credentials: UserCredential[]): void => {
  localStorage.setItem('kilkari-credentials', JSON.stringify(credentials));
};

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
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check credentials against stored credentials
      const credentials = getStoredCredentials();
      const userCredential = credentials.find(
        cred => cred.email === email && cred.password === password
      );
      
      if (userCredential) {
        // Get the user with matching ID
        const users = JSON.parse(localStorage.getItem('kilkari-users') || '[]');
        const user = users.find((u: User) => u.id === userCredential.userId);
        
        if (user) {
          saveUser(user); // Save to current session
          resolve(user);
          return;
        }
      }
      
      // For demo fallback (if no matching credentials)
      if (email && password) {
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
export const signup = async (userData: Partial<User> & { password?: string }): Promise<User> => {
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
      
      // Store the user in kilkari-users
      const users = JSON.parse(localStorage.getItem('kilkari-users') || '[]');
      users.push(newUser);
      localStorage.setItem('kilkari-users', JSON.stringify(users));
      
      // Store credentials if password is provided
      if (userData.password && userData.contact) {
        const credentials = getStoredCredentials();
        credentials.push({
          email: userData.contact,
          password: userData.password,
          userId: newUser.id
        });
        saveCredentials(credentials);
      }
      
      resolve(newUser);
    }, 1000);
  });
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem('kilkari-user');
};
