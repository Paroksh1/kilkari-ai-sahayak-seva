
type TranslationKey = 
  // Common
  | 'dashboard' 
  | 'appointments'
  | 'chatbot'
  | 'shoppingList'
  | 'profile'
  | 'login'
  | 'signup'
  | 'logout'
  // Login/Signup
  | 'emailOrPhone'
  | 'password'
  | 'forgotPassword'
  | 'newUser'
  | 'alreadyHaveAccount'
  | 'name'
  | 'age'
  | 'contactInfo'
  | 'dietaryPreference'
  | 'vegetarian'
  | 'nonVegetarian'
  | 'allergies'
  | 'pincode'
  | 'languagePreference'
  | 'pregnant'
  | 'newMother'
  | 'pregnancyWeek'
  | 'babyAge'
  | 'termsAgree'
  | 'pleaseWait'
  // Chat
  | 'chatbotTitle'
  | 'chatbotIntroHint'
  | 'typeQuestion'
  | 'voiceInput'
  | 'voiceStopped'
  | 'voiceStarted'
  | 'voiceCompleted'
  | 'browserNotSupport'
  // Appointments
  | 'upcomingAppointments'
  | 'pastAppointments'
  | 'noUpcomingAppointments'
  | 'noPastAppointments'
  | 'appointmentTitle'
  | 'appointmentPurpose'
  | 'appointmentDate'
  | 'appointmentTime'
  | 'appointmentLocation'
  | 'appointmentNotes'
  | 'deleteAppointment'
  | 'addToCalendar'
  | 'bookAppointment'
  | 'chooseDate'
  // Home
  | 'heroTitle'
  | 'heroSubtitle'
  | 'getStarted'
  | 'features'
  | 'personalizedTracking'
  | 'personalizedTrackingDesc'
  | 'appointmentBooking'
  | 'appointmentBookingDesc'
  | 'aiChatbot'
  | 'aiChatbotDesc'
  | 'shoppingListFeature'
  | 'shoppingListFeatureDesc'
  | 'benefits'
  | 'trustedInformation'
  | 'trustedInformationDesc'
  | 'bilingualSupport'
  | 'bilingualSupportDesc'
  | 'availability'
  | 'availabilityDesc'
  | 'startHealthJourney'
  | 'startHealthJourneyDesc'
  | 'registerNow'
  // Dashboard
  | 'hello'
  | 'needMoreInfo'
  | 'needMoreInfoDesc';

type Translations = {
  [key in TranslationKey]: string;
};

export const englishTranslations: Translations = {
  // Navigation
  dashboard: 'Dashboard',
  appointments: 'Appointments',
  chatbot: 'Chatbot',
  shoppingList: 'Shopping List',
  profile: 'Profile',
  login: 'Login',
  signup: 'Sign Up',
  logout: 'Logout',
  // Login/Signup
  emailOrPhone: 'Email or Phone',
  password: 'Password',
  forgotPassword: 'Forgot password?',
  newUser: 'New user?',
  alreadyHaveAccount: 'Already have an account?',
  name: 'Name',
  age: 'Age',
  contactInfo: 'Phone or Email (Optional)',
  dietaryPreference: 'Dietary Preference',
  vegetarian: 'Vegetarian',
  nonVegetarian: 'Non-vegetarian',
  allergies: 'Allergies (Optional)',
  pincode: 'Pincode',
  languagePreference: 'Language Preference',
  pregnant: 'Pregnant',
  newMother: 'New Mother',
  pregnancyWeek: 'Pregnancy Week',
  babyAge: 'Baby\'s Age (in months)',
  termsAgree: 'I agree to the terms and conditions',
  pleaseWait: 'Please wait...',
  // Chat
  chatbotTitle: 'Kilkari AI Chatbot',
  chatbotIntroHint: 'Hello! I am Kilkari AI Chatbot. You can ask any questions about pregnancy or infant care.',
  typeQuestion: 'Type your question here...',
  voiceInput: 'Voice input',
  voiceStopped: 'Voice input stopped',
  voiceStarted: 'Voice input started... start speaking',
  voiceCompleted: 'Voice input completed',
  browserNotSupport: 'Your browser does not support voice input',
  // Appointments
  upcomingAppointments: 'Upcoming',
  pastAppointments: 'Past',
  noUpcomingAppointments: 'No upcoming appointments',
  noPastAppointments: 'No past appointments',
  appointmentTitle: 'Title',
  appointmentPurpose: 'Purpose',
  appointmentDate: 'Date',
  appointmentTime: 'Time',
  appointmentLocation: 'Location',
  appointmentNotes: 'Notes',
  deleteAppointment: 'Delete',
  addToCalendar: 'Add to Calendar',
  bookAppointment: 'Book Appointment',
  chooseDate: 'Choose a date',
  // Home
  heroTitle: 'Kilkari AI - Your Pregnancy and Child Care Companion',
  heroSubtitle: 'AI-powered assistant specially designed for Indian mothers to keep you healthy and informed',
  getStarted: 'Get Started',
  features: 'Features',
  personalizedTracking: 'Personalized Tracking',
  personalizedTrackingDesc: 'Get personalized advice based on your pregnancy or baby\'s development',
  appointmentBooking: 'Appointment Booking',
  appointmentBookingDesc: 'Easily schedule and track checkups and vaccination appointments',
  aiChatbot: 'AI Chatbot',
  aiChatbotDesc: 'Get instant answers to your pregnancy or child care questions',
  shoppingListFeature: 'Shopping List',
  shoppingListFeatureDesc: 'Get a list of essentials based on your pregnancy or baby stage',
  benefits: 'Benefits',
  trustedInformation: 'Trusted Information',
  trustedInformationDesc: 'Doctor-verified information specially tailored for Indian mothers',
  bilingualSupport: 'Bilingual Support',
  bilingualSupportDesc: 'Stay informed in your language with support in Hindi and English',
  availability: '24/7 Availability',
  availabilityDesc: 'Get help anytime, anywhere - your digital health companion',
  startHealthJourney: 'Start your health journey today',
  startHealthJourneyDesc: 'With Kilkari AI, you can enjoy your pregnancy and motherhood journey while prioritizing your and your baby\'s health.',
  registerNow: 'Register Now',
  // Dashboard
  hello: 'Hello',
  needMoreInfo: 'Need more information?',
  needMoreInfoDesc: 'Ask the chatbot or book an appointment.',
};

export const hindiTranslations: Translations = {
  // Navigation
  dashboard: 'डैशबोर्ड',
  appointments: 'अपॉइंटमेंट',
  chatbot: 'चैटबॉट',
  shoppingList: 'शॉपिंग लिस्ट',
  profile: 'प्रोफ़ाइल',
  login: 'लॉगिन',
  signup: 'साइन अप',
  logout: 'लॉग आउट',
  // Login/Signup
  emailOrPhone: 'ईमेल या फ़ोन',
  password: 'पासवर्ड',
  forgotPassword: 'पासवर्ड भूल गए?',
  newUser: 'नया उपयोगकर्ता?',
  alreadyHaveAccount: 'पहले से खाता है?',
  name: 'नाम',
  age: 'आयु',
  contactInfo: 'फ़ोन या ईमेल (वैकल्पिक)',
  dietaryPreference: 'आहार प्राथमिकता',
  vegetarian: 'शाकाहारी',
  nonVegetarian: 'मांसाहारी',
  allergies: 'एलर्जी (वैकल्पिक)',
  pincode: 'पिनकोड',
  languagePreference: 'भाषा प्राथमिकता',
  pregnant: 'गर्भवती',
  newMother: 'नई माँ',
  pregnancyWeek: 'गर्भावस्था का सप्ताह',
  babyAge: 'शिशु की आयु (महीनों में)',
  termsAgree: 'मैं नियमों और शर्तों से सहमत हूं',
  pleaseWait: 'प्रतीक्षा करें...',
  // Chat
  chatbotTitle: 'किलकारी AI चैटबॉट',
  chatbotIntroHint: 'नमस्ते! मैं किलकारी AI चैटबॉट हूं। आप गर्भावस्था या शिशु देखभाल के बारे में कोई भी प्रश्न पूछ सकते हैं।',
  typeQuestion: 'अपना प्रश्न यहां टाइप करें...',
  voiceInput: 'वॉइस इनपुट',
  voiceStopped: 'वॉइस इनपुट बंद',
  voiceStarted: 'वॉइस इनपुट शुरू... बोलना शुरू करें',
  voiceCompleted: 'वॉइस इनपुट पूरा हुआ',
  browserNotSupport: 'आपका ब्राउज़र वॉइस इनपुट का समर्थन नहीं करता',
  // Appointments
  upcomingAppointments: 'आगामी',
  pastAppointments: 'पिछली',
  noUpcomingAppointments: 'कोई आगामी अपॉइंटमेंट नहीं',
  noPastAppointments: 'कोई पिछली अपॉइंटमेंट नहीं',
  appointmentTitle: 'शीर्षक',
  appointmentPurpose: 'उद्देश्य',
  appointmentDate: 'तारीख',
  appointmentTime: 'समय',
  appointmentLocation: 'स्थान',
  appointmentNotes: 'नोट्स',
  deleteAppointment: 'हटाएं',
  addToCalendar: 'कैलेंडर में जोड़ें',
  bookAppointment: 'अपॉइंटमेंट बुक करें',
  chooseDate: 'तारीख चुनें',
  // Home
  heroTitle: 'किलकारी AI - आपका गर्भावस्था और शिशु देखभाल साथी',
  heroSubtitle: 'भारत की माताओं के लिए विशेष रूप से तैयार किया गया AI-powered सहायक जो आपको स्वस्थ और सूचित रखता है',
  getStarted: 'शुरू करें',
  features: 'विशेषताएँ',
  personalizedTracking: 'व्यक्तिगत ट्रैकिंग',
  personalizedTrackingDesc: 'अपने गर्भावस्था या शिशु के विकास के आधार पर व्यक्तिगत सलाह प्राप्त करें',
  appointmentBooking: 'अपॉइंटमेंट बुकिंग',
  appointmentBookingDesc: 'चेकअप और वैक्सीनेशन अपॉइंटमेंट्स को आसानी से शेड्यूल और ट्रैक करें',
  aiChatbot: 'AI चैटबॉट',
  aiChatbotDesc: 'अपने गर्भावस्था या शिशु देखभाल से संबंधित प्रश्नों के उत्तर तुरंत पाएँ',
  shoppingListFeature: 'शॉपिंग लिस्ट',
  shoppingListFeatureDesc: 'अपनी गर्भावस्था या शिशु के चरण के अनुसार आवश्यक सामानों की सूची प्राप्त करें',
  benefits: 'लाभ',
  trustedInformation: 'विश्वसनीय जानकारी',
  trustedInformationDesc: 'डॉक्टरों द्वारा सत्यापित, भारतीय माताओं के लिए विशेष रूप से अनुकूलित जानकारी',
  bilingualSupport: 'द्विभाषी सहायता',
  bilingualSupportDesc: 'हिंदी और अंग्रेजी में सहायता के साथ आपकी भाषा में सूचित रहें',
  availability: '24/7 उपलब्धता',
  availabilityDesc: 'किसी भी समय, कहीं भी सहायता प्राप्त करें - आपका डिजिटल स्वास्थ्य साथी',
  startHealthJourney: 'आज ही अपनी स्वास्थ्य यात्रा शुरू करें',
  startHealthJourneyDesc: 'किलकारी AI के साथ, आप अपने और अपने शिशु के स्वास्थ्य को प्राथमिकता देते हुए अपनी गर्भावस्था और मातृत्व यात्रा का आनंद ले सकती हैं।',
  registerNow: 'अभी रजिस्टर करें',
  // Dashboard
  hello: 'नमस्ते',
  needMoreInfo: 'क्या और जानकारी चाहिए?',
  needMoreInfoDesc: 'चैटबॉट से पूछें या अपॉइंटमेंट बुक करें।',
};
