
import { User, Clinic, Appointment, ShoppingItem, ChatMessage } from '@/types';

// Mock user profile
export const mockUser: User = {
  id: '1',
  name: 'Priya Sharma',
  age: 28,
  contact: 'priya.sharma@example.com',
  pregnancyWeek: 24,
  dietaryPreference: 'vegetarian',
  allergies: ['peanuts'],
  location: '110030',
  language: 'hindi',
  moodHistory: [
    { date: '2025-04-20', mood: 'happy', note: 'Felt baby kick today!' },
    { date: '2025-04-19', mood: 'neutral' },
    { date: '2025-04-18', mood: 'happy', note: 'Doctor appointment went well' },
    { date: '2025-04-17', mood: 'sad', note: 'Feeling tired today' },
    { date: '2025-04-16', mood: 'neutral' },
  ],
};

// Mock clinics by pincode
export const mockClinics: Record<string, Clinic[]> = {
  '110030': [
    { id: '1', name: 'Aasha Health Centre', area: 'Saket', pincode: '110030', type: 'clinic' },
    { id: '2', name: 'Swasthya Hospital', area: 'Malviya Nagar', pincode: '110030', type: 'hospital', contact: '011-4567890' },
    { id: '3', name: 'Rani ASHA Worker', area: 'Saket', pincode: '110030', type: 'health-worker', contact: '9899123456' },
  ],
  '400001': [
    { id: '4', name: 'City Care Hospital', area: 'Fort', pincode: '400001', type: 'hospital' },
    { id: '5', name: 'Maternal Health Clinic', area: 'Marine Lines', pincode: '400001', type: 'clinic' },
  ],
};

// Mock appointments
export const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Checkup',
    purpose: '28-week checkup',
    date: '2025-05-15',
    time: '10:30',
    location: 'Aasha Health Centre',
  },
  {
    id: '2',
    title: 'Vaccination',
    purpose: 'Iron injection',
    date: '2025-05-02',
    time: '15:00',
    location: 'Swasthya Hospital',
    notes: 'Bring previous reports',
  },
];

// Mock shopping items for different stages
export const mockShoppingItems: ShoppingItem[] = [
  // Pregnancy items
  { id: '1', name: 'Prenatal vitamins', category: 'supplements', stage: 'pregnancy', stageValue: 0, essential: true, purchased: true },
  { id: '2', name: 'Maternity pillow', category: 'comfort', stage: 'pregnancy', stageValue: 16, essential: false, purchased: false },
  { id: '3', name: 'Hospital bag', category: 'preparation', stage: 'pregnancy', stageValue: 30, essential: true, purchased: false },
  { id: '4', name: 'Maternity clothes', category: 'clothing', stage: 'pregnancy', stageValue: 16, essential: true, purchased: true },
  
  // Baby items
  { id: '5', name: 'Diapers', category: 'essentials', stage: 'baby', stageValue: 0, essential: true, purchased: false },
  { id: '6', name: 'Baby clothes (0-3 months)', category: 'clothing', stage: 'baby', stageValue: 0, essential: true, purchased: false },
  { id: '7', name: 'Baby wipes', category: 'hygiene', stage: 'baby', stageValue: 0, essential: true, purchased: false },
  { id: '8', name: 'Feeding bottles', category: 'feeding', stage: 'baby', stageValue: 0, essential: true, purchased: false },
];

// Mock chat history
export const mockChats: ChatMessage[] = [
  {
    id: '1',
    sender: 'user',
    message: 'नमस्कार, मुझे गर्भावस्था के 24वें सप्ताह के बारे में कुछ जानकारी चाहिए।',
    timestamp: '2025-04-20T10:30:00Z',
  },
  {
    id: '2',
    sender: 'bot',
    message: 'नमस्कार प्रिया जी! 24वें सप्ताह में आपका बच्चा लगभग 30 सेंटीमीटर लंबा हो गया है और उसका वजन लगभग 600 ग्राम है। अब वह आपके पेट में हिलडुल करना शुरू कर देगा। इस समय आपको पर्याप्त आराम और संतुलित आहार लेना चाहिए।',
    timestamp: '2025-04-20T10:30:15Z',
  },
  {
    id: '3',
    sender: 'user',
    message: 'What foods should I eat this week?',
    timestamp: '2025-04-20T10:30:45Z',
  },
  {
    id: '4',
    sender: 'bot',
    message: 'You should focus on protein-rich foods like lentils, milk, and paneer. Also include green leafy vegetables, fruits, and calcium-rich foods. Iron is important now, so eat foods like spinach, jaggery, and beetroot. Stay hydrated by drinking plenty of water throughout the day.',
    timestamp: '2025-04-20T10:31:00Z',
  },
];

// Weekly pregnancy tips
export const pregnancyTips: Record<number, string> = {
  1: "Your baby is now the size of a poppy seed. Focus on taking folic acid supplements.",
  4: "Your baby is the size of a lentil. Morning sickness might begin now.",
  8: "Your baby is the size of a raspberry. All essential organs are beginning to form.",
  12: "Your baby is the size of a lime. The first trimester is almost complete!",
  16: "Your baby is the size of an avocado. You might start feeling the first flutters of movement.",
  20: "Your baby is the size of a banana. You're halfway there! The anomaly scan happens around now.",
  24: "Your baby is the size of a corn cob. Your baby's movements are becoming stronger and more noticeable.",
  28: "Your baby is the size of an eggplant. Time for your glucose screening test to check for gestational diabetes.",
  32: "Your baby is the size of a coconut. The baby is practicing breathing movements.",
  36: "Your baby is the size of a honeydew melon. The baby is getting ready for birth by moving into head-down position.",
  40: "Your baby is the size of a watermelon. Any day now! Keep monitoring your baby's movements.",
};

// Baby development milestones by month
export const babyMilestones: Record<number, string> = {
  1: "Your baby can lift their head briefly during tummy time and may try to look at your face.",
  2: "Your baby may start smiling socially and can briefly hold objects placed in their hands.",
  3: "Your baby can hold their head steady and may start rolling from tummy to back.",
  4: "Your baby is likely laughing and reaching for objects. They may start rolling in both directions.",
  6: "Your baby may start sitting without support and may begin showing interest in solid foods.",
  8: "Your baby might be crawling and starting to pull themselves up to stand.",
  10: "Your baby might be cruising along furniture and saying simple words like 'mama' or 'dada'.",
  12: "Your baby might take their first steps and understand simple instructions.",
};
