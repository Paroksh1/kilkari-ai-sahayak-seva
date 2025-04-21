
import { User, MoodEntry } from '@/types';
import { getUser, saveUser } from './authUtils';

// Add mood entry
export const addMoodEntry = (mood: 'happy' | 'neutral' | 'sad', note?: string): void => {
  const user = getUser();
  if (!user) return;
  
  const newEntry: MoodEntry = {
    date: new Date().toISOString().split('T')[0],
    mood,
    note,
  };
  
  const moodHistory = user.moodHistory || [];
  
  // Update user with new mood entry
  const updatedUser: User = {
    ...user,
    moodHistory: [newEntry, ...moodHistory],
  };
  
  saveUser(updatedUser);
};

// Get mood response based on mood
export const getMoodResponse = (mood: 'happy' | 'neutral' | 'sad'): string => {
  const responses = {
    happy: [
      "It's wonderful to see you happy! Positive emotions are beneficial for both you and your baby.",
      "That's great! Your happiness can promote better health outcomes during pregnancy.",
      "Happiness looks good on you! Keep embracing these joyful moments.",
    ],
    neutral: [
      "It's okay to have neutral days. Take some time for self-care today.",
      "Some days are just regular days, and that's perfectly fine. Remember to breathe and relax.",
      "Neutral days are important too. Consider gentle activities that might boost your mood like walking or listening to music.",
    ],
    sad: [
      "I'm sorry you're feeling down today. Remember that many pregnant women experience mood changes due to hormones.",
      "It's okay to not feel okay sometimes. Consider talking to someone you trust about your feelings.",
      "Feeling sad during pregnancy is common. Make sure to rest, stay hydrated, and reach out to your support network if needed.",
    ],
  };
  
  const randomIndex = Math.floor(Math.random() * responses[mood].length);
  return responses[mood][randomIndex];
};
