
export interface User {
  id: string;
  name: string;
  age: number;
  contact?: string; // Phone or email (optional)
  pregnancyWeek?: number;
  babyMonths?: number;
  dietaryPreference: 'vegetarian' | 'non-vegetarian';
  allergies: string[];
  location: string; // Pincode
  language: 'hindi' | 'english';
  moodHistory?: MoodEntry[];
}

export interface MoodEntry {
  date: string; // ISO date string
  mood: 'happy' | 'neutral' | 'sad';
  note?: string;
}

export interface Appointment {
  id: string;
  title: string;
  purpose: string;
  date: string; // ISO date string
  time: string;
  location?: string;
  notes?: string;
}

export interface Clinic {
  id: string;
  name: string;
  area: string;
  pincode: string;
  contact?: string;
  type: 'clinic' | 'hospital' | 'health-worker';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: string; // ISO date string
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  stage: 'pregnancy' | 'baby';
  stageValue: number; // Week for pregnancy or month for baby
  essential: boolean;
  purchased: boolean;
}
