
import { ChatMessage, User } from '@/types';
import { mockChats } from './mockData';
import { pregnancyTips, babyMilestones } from './mockData';

// Save chat messages to localStorage
export const saveChatMessages = (messages: ChatMessage[]): void => {
  localStorage.setItem('kilkari-chats', JSON.stringify(messages));
};

// Get chat messages from localStorage
export const getChatMessages = (): ChatMessage[] => {
  const chatsStr = localStorage.getItem('kilkari-chats');
  return chatsStr ? JSON.parse(chatsStr) : mockChats;
};

// Add new message
export const addMessage = (message: string, sender: 'user' | 'bot'): ChatMessage => {
  const chats = getChatMessages();
  
  const newMessage: ChatMessage = {
    id: Date.now().toString(),
    message,
    sender,
    timestamp: new Date().toISOString(),
  };
  
  const updatedChats = [...chats, newMessage];
  saveChatMessages(updatedChats);
  
  return newMessage;
};

// Get bot response
export const getBotResponse = async (message: string, user: User): Promise<string> => {
  // Simple mock responses based on keywords
  const messageLower = message.toLowerCase();
  
  // For demo purposes, return predefined responses based on simple keyword detection
  if (messageLower.includes('hello') || messageLower.includes('hi') || messageLower.includes('namaste') || messageLower.includes('नमस्ते')) {
    return user.language === 'hindi' 
      ? `नमस्ते ${user.name}! मैं आपकी कैसे सहायता कर सकती हूँ?`
      : `Hello ${user.name}! How can I help you today?`;
  }
  
  if (messageLower.includes('food') || messageLower.includes('eat') || messageLower.includes('diet') || messageLower.includes('खाना') || messageLower.includes('भोजन')) {
    return user.language === 'hindi'
      ? `${user.dietaryPreference === 'vegetarian' ? 'शाकाहारी' : 'मांसाहारी'} आहार के लिए, आपको प्रोटीन, कैल्शियम और आयरन से भरपूर खाद्य पदार्थ खाने चाहिए। दही, पनीर, हरी पत्तेदार सब्जियां, फल और अनाज अच्छे विकल्प हैं।`
      : `For a ${user.dietaryPreference} diet, you should eat foods rich in protein, calcium, and iron. Yogurt, cottage cheese, green leafy vegetables, fruits, and grains are good options.`;
  }
  
  if (messageLower.includes('week') || messageLower.includes('सप्ताह')) {
    // Find the week number in the message
    const weekMatch = messageLower.match(/week (\d+)/) || messageLower.match(/सप्ताह (\d+)/);
    const weekNumber = weekMatch ? parseInt(weekMatch[1]) : user.pregnancyWeek;
    
    if (weekNumber && pregnancyTips[weekNumber]) {
      return user.language === 'hindi'
        ? `गर्भावस्था का सप्ताह ${weekNumber}: ${pregnancyTips[weekNumber]} (यह जानकारी अंग्रेजी से अनुवादित है)`
        : `Pregnancy week ${weekNumber}: ${pregnancyTips[weekNumber]}`;
    }
  }
  
  if (messageLower.includes('month') || messageLower.includes('महीना')) {
    // Find the month number in the message
    const monthMatch = messageLower.match(/month (\d+)/) || messageLower.match(/महीना (\d+)/);
    const monthNumber = monthMatch ? parseInt(monthMatch[1]) : user.babyMonths;
    
    if (monthNumber && babyMilestones[monthNumber]) {
      return user.language === 'hindi'
        ? `${monthNumber} महीने: ${babyMilestones[monthNumber]} (यह जानकारी अंग्रेजी से अनुवादित है)`
        : `${monthNumber} months: ${babyMilestones[monthNumber]}`;
    }
  }
  
  // Default responses
  return user.language === 'hindi'
    ? 'मुझे इसका अभी उत्तर नहीं पता, लेकिन मैं इसे जल्द ही जान जाऊँगी।'
    : 'I don\'t have an answer for that yet, but I will learn about it soon.';
};
