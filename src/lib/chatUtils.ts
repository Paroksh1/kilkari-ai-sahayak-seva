
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

// Common questions and answers
interface QnA {
  keywords: string[];
  english: string;
  hindi: string;
}

const commonQuestions: QnA[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'namaste', 'नमस्ते', 'हैलो'],
    english: 'Hello! How can I help you today with pregnancy or baby care information?',
    hindi: 'नमस्ते! मैं आज गर्भावस्था या शिशु देखभाल की जानकारी के बारे में आपकी कैसे मदद कर सकती हूँ?'
  },
  {
    keywords: ['diet', 'food', 'eat', 'nutrition', 'भोजन', 'खाना', 'आहार', 'पोषण'],
    english: 'For a healthy pregnancy diet, focus on fruits, vegetables, whole grains, lean proteins, and dairy. Avoid raw seafood, unpasteurized dairy, and limit caffeine.',
    hindi: 'स्वस्थ गर्भावस्था आहार के लिए, फल, सब्जियां, साबुत अनाज, दुबला प्रोटीन और डेयरी पर ध्यान दें। कच्चे समुद्री भोजन, अपाश्चरीकृत डेयरी से बचें, और कैफीन सीमित करें।'
  },
  {
    keywords: ['exercise', 'workout', 'yoga', 'walk', 'व्यायाम', 'योग', 'टहलना'],
    english: 'Moderate exercise during pregnancy is beneficial. Walking, swimming, prenatal yoga, and stationary cycling are good options. Always consult your doctor before starting any exercise routine.',
    hindi: 'गर्भावस्था के दौरान मध्यम व्यायाम फायदेमंद है। चलना, तैराकी, प्रसव पूर्व योग, और स्थिर साइकिलिंग अच्छे विकल्प हैं। कोई भी व्यायाम शुरू करने से पहले हमेशा अपने डॉक्टर से परामर्श करें।'
  },
  {
    keywords: ['nausea', 'morning sickness', 'vomit', 'मतली', 'उल्टी', 'उबकाई'],
    english: 'For morning sickness: Eat small, frequent meals, avoid strong smells, try ginger tea or candies, drink plenty of fluids, and rest when needed. If severe, consult your doctor.',
    hindi: 'सुबह की मतली के लिए: छोटे-छोटे, बार-बार भोजन करें, तेज गंध से बचें, अदरक की चाय या कैंडी आजमाएं, खूब तरल पदार्थ पिएं, और जरूरत पड़ने पर आराम करें। अगर गंभीर है, तो अपने डॉक्टर से परामर्श करें।'
  },
  {
    keywords: ['sleep', 'insomnia', 'rest', 'नींद', 'अनिद्रा', 'आराम'],
    english: 'Pregnancy sleep tips: Use pillows for support, sleep on your left side, establish a bedtime routine, limit fluids before bed, and avoid caffeine. Consult your doctor if insomnia persists.',
    hindi: 'गर्भावस्था में नींद के सुझाव: सहारे के लिए तकिए का उपयोग करें, बाईं करवट सोएं, एक बेडटाइम दिनचर्या स्थापित करें, सोने से पहले तरल पदार्थों को सीमित करें, और कैफीन से बचें। यदि अनिद्रा बनी रहती है तो अपने डॉक्टर से परामर्श करें।'
  },
  {
    keywords: ['pain', 'back pain', 'headache', 'दर्द', 'पीठ दर्द', 'सिरदर्द'],
    english: 'For back pain during pregnancy: Practice good posture, wear supportive shoes, avoid lifting heavy objects, try heat or cold packs, and consider prenatal massage. For persistent pain, consult your doctor.',
    hindi: 'गर्भावस्था के दौरान पीठ दर्द के लिए: अच्छी मुद्रा का अभ्यास करें, सहायक जूते पहनें, भारी वस्तुओं को उठाने से बचें, गर्म या ठंडे पैक का प्रयास करें, और प्रसव पूर्व मालिश पर विचार करें। लगातार दर्द के लिए, अपने डॉक्टर से परामर्श करें।'
  },
  {
    keywords: ['breastfeeding', 'breast feed', 'lactation', 'स्तनपान', 'दूध पिलाना'],
    english: 'Breastfeeding tips: Ensure proper latch, feed on demand, stay hydrated, eat well, and seek help if experiencing pain or difficulty. Consider consulting a lactation consultant for personalized advice.',
    hindi: 'स्तनपान के सुझाव: उचित लैच सुनिश्चित करें, मांग पर दूध पिलाएं, हाइड्रेटेड रहें, अच्छा खाएं, और अगर दर्द या कठिनाई हो तो मदद लें। व्यक्तिगत सलाह के लिए एक स्तनपान सलाहकार से परामर्श करने पर विचार करें।'
  },
  {
    keywords: ['vaccination', 'vaccine', 'immunization', 'टीकाकरण', 'वैक्सीन', 'टीका'],
    english: 'Key vaccinations during pregnancy include Tdap (tetanus, diphtheria, pertussis) and flu shot. For babies, follow the recommended immunization schedule which includes vaccines for hepatitis B, rotavirus, polio, and more.',
    hindi: 'गर्भावस्था के दौरान मुख्य टीकाकरण में Tdap (टिटनेस, डिप्थीरिया, काली खांसी) और फ्लू शॉट शामिल हैं। शिशुओं के लिए, अनुशंसित टीकाकरण अनुसूची का पालन करें जिसमें हेपेटाइटिस बी, रोटावायरस, पोलियो और अधिक के लिए टीके शामिल हैं।'
  },
  {
    keywords: ['danger', 'emergency', 'complication', 'खतरा', 'आपातकाल', 'जटिलता'],
    english: 'Pregnancy danger signs include severe headache, vision changes, severe abdominal pain, heavy bleeding, reduced fetal movement, high fever, or severe swelling. Seek immediate medical attention if experiencing any of these.',
    hindi: 'गर्भावस्था के खतरे के संकेतों में गंभीर सिरदर्द, दृष्टि में परिवर्तन, पेट में गंभीर दर्द, भारी रक्तस्राव, भ्रूण की कम हलचल, तेज बुखार, या गंभीर सूजन शामिल हैं। इनमें से किसी का भी अनुभव होने पर तुरंत चिकित्सा सहायता लें।'
  },
  {
    keywords: ['labor', 'delivery', 'contraction', 'प्रसव', 'डिलीवरी', 'संकुचन'],
    english: 'Signs of labor include regular contractions that increase in intensity, lower back pain, water breaking, and the mucus plug passing. When contractions are 5 minutes apart for first-time mothers, it\'s time to go to the hospital.',
    hindi: 'प्रसव के संकेतों में नियमित संकुचन जो तीव्रता में बढ़ते हैं, निचले पीठ का दर्द, पानी टूटना और श्लेष्म प्लग का निकलना शामिल है। जब पहली बार मां बनने वाली महिलाओं के लिए संकुचन 5 मिनट के अंतर पर होते हैं, तो अस्पताल जाने का समय है।'
  },
  {
    keywords: ['ultrasound', 'scan', 'sonography', 'अल्ट्रासाउंड', 'स्कैन', 'सोनोग्राफी'],
    english: 'Common ultrasounds during pregnancy include dating scan (6-9 weeks), nuchal translucency scan (11-13 weeks), anomaly scan (18-22 weeks), and growth scans in the third trimester if needed.',
    hindi: 'गर्भावस्था के दौरान आम अल्ट्रासाउंड में डेटिंग स्कैन (6-9 सप्ताह), न्यूकल ट्रांसलुसेंसी स्कैन (11-13 सप्ताह), एनोमली स्कैन (18-22 सप्ताह), और यदि आवश्यक हो तो तीसरी तिमाही में विकास स्कैन शामिल हैं।'
  },
  {
    keywords: ['vitamins', 'supplements', 'folic acid', 'विटामिन', 'सप्लीमेंट', 'फोलिक एसिड'],
    english: 'Important supplements during pregnancy include folic acid, iron, calcium, vitamin D, and prenatal vitamins. Always consult your doctor before taking any supplements.',
    hindi: 'गर्भावस्था के दौरान महत्वपूर्ण सप्लीमेंट में फोलिक एसिड, आयरन, कैल्शियम, विटामिन डी और प्रीनेटल विटामिन शामिल हैं। कोई भी सप्लीमेंट लेने से पहले हमेशा अपने डॉक्टर से परामर्श करें।'
  },
  {
    keywords: ['baby', 'newborn', 'infant', 'शिशु', 'नवजात', 'बच्चा'],
    english: 'Newborn essentials include diapers, wipes, onesies, swaddles, crib, car seat, baby bath products, and feeding supplies. For the first few weeks, focus on establishing feeding and sleep routines.',
    hindi: 'नवजात शिशु के लिए आवश्यक चीजों में डायपर, वाइप्स, वनसीज, स्वैडल्स, पालना, कार सीट, बेबी बाथ प्रोडक्ट्स, और फीडिंग सप्लाई शामिल हैं। पहले कुछ हफ्तों के लिए, खिलाने और सोने की दिनचर्या स्थापित करने पर ध्यान दें।'
  },
  {
    keywords: ['crying', 'colic', 'soothe', 'रोना', 'कॉलिक', 'शांत'],
    english: 'To soothe a crying baby: Check for hunger, wet diaper, or discomfort; try gentle rocking, white noise, swaddling, or a pacifier; go for a car ride or walk; and rule out colic or other health issues with your pediatrician.',
    hindi: 'रोते बच्चे को शांत करने के लिए: भूख, गीले डायपर, या असुविधा की जांच करें; धीमे से झुलाने, व्हाइट नॉइज, स्वैडलिंग, या पेसिफायर का प्रयास करें; कार की सवारी या टहलने के लिए जाएं; और अपने बाल रोग विशेषज्ञ के साथ कॉलिक या अन्य स्वास्थ्य समस्याओं को बाहर करें।'
  },
  {
    keywords: ['milestones', 'development', 'growth', 'मील के पत्थर', 'विकास', 'वृद्धि'],
    english: 'Key baby milestones in the first year include: social smiles (2 months), rolling over (4 months), sitting up (6 months), crawling (8-10 months), and first steps (12-15 months). Remember every baby develops at their own pace.',
    hindi: 'पहले वर्ष में मुख्य बेबी माइलस्टोन में शामिल हैं: सामाजिक मुस्कान (2 महीने), पलटना (4 महीने), बैठना (6 महीने), रेंगना (8-10 महीने), और पहले कदम (12-15 महीने)। याद रखें कि हर बच्चा अपनी गति से विकसित होता है।'
  }
];

// Get bot response
export const getBotResponse = async (message: string, user: User): Promise<string> => {
  const messageLower = message.toLowerCase();
  const isHindi = user.language === 'hindi';
  
  // First check for specific keywords in common questions
  for (const qa of commonQuestions) {
    if (qa.keywords.some(keyword => messageLower.includes(keyword))) {
      return isHindi ? qa.hindi : qa.english;
    }
  }
  
  // Check for pregnancy week specific information
  if (messageLower.includes('week') || messageLower.includes('सप्ताह')) {
    // Find the week number in the message
    const weekMatch = messageLower.match(/week (\d+)/) || messageLower.match(/सप्ताह (\d+)/);
    const weekNumber = weekMatch ? parseInt(weekMatch[1]) : user.pregnancyWeek;
    
    if (weekNumber && pregnancyTips[weekNumber]) {
      return isHindi
        ? `गर्भावस्था का सप्ताह ${weekNumber}: ${pregnancyTips[weekNumber]} (यह जानकारी अंग्रेजी से अनुवादित है)`
        : `Pregnancy week ${weekNumber}: ${pregnancyTips[weekNumber]}`;
    }
  }
  
  // Check for baby month specific information
  if (messageLower.includes('month') || messageLower.includes('महीना')) {
    // Find the month number in the message
    const monthMatch = messageLower.match(/month (\d+)/) || messageLower.match(/महीना (\d+)/);
    const monthNumber = monthMatch ? parseInt(monthMatch[1]) : user.babyMonths;
    
    if (monthNumber && babyMilestones[monthNumber]) {
      return isHindi
        ? `${monthNumber} महीने: ${babyMilestones[monthNumber]} (यह जानकारी अंग्रेजी से अनुवादित है)`
        : `${monthNumber} months: ${babyMilestones[monthNumber]}`;
    }
  }
  
  // Add sample questions the user can ask when they ask for help
  if (messageLower.includes('help') || messageLower.includes('what can you do') || 
      messageLower.includes('मदद') || messageLower.includes('आप क्या कर सकते हैं')) {
    if (isHindi) {
      return `आप मुझसे इन विषयों पर प्रश्न पूछ सकते हैं:
1. गर्भावस्था के किसी भी सप्ताह के बारे में (जैसे "सप्ताह 24")
2. शिशु विकास के महीने (जैसे "6 महीने के बच्चे")
3. आहार और पोषण
4. व्यायाम और योग
5. सुबह की मतली और आराम
6. नींद संबंधी सुझाव
7. दर्द प्रबंधन
8. स्तनपान
9. टीकाकरण
10. आपातकालीन चिह्न
11. प्रसव और डिलिवरी
12. अल्ट्रासाउंड और जांच
13. विटामिन और सप्लीमेंट्स
14. नवजात शिशु देखभाल
15. शिशु को शांत करना
16. विकास के मील के पत्थर`;
    } else {
      return `You can ask me questions about these topics:
1. Any week of pregnancy (like "week 24")
2. Baby development by month (like "6-month baby")
3. Diet and nutrition
4. Exercise and yoga
5. Morning sickness and comfort
6. Sleep tips
7. Pain management
8. Breastfeeding
9. Vaccinations
10. Emergency signs
11. Labor and delivery
12. Ultrasounds and scans
13. Vitamins and supplements
14. Newborn care
15. Soothing baby
16. Developmental milestones`;
    }
  }
  
  // Default response if no match found
  return isHindi
    ? 'मुझे इस प्रश्न का उत्तर नहीं पता। कृपया "मदद" टाइप करके देखें कि मैं किन विषयों पर बात कर सकता हूँ।'
    : 'I don\'t have an answer for that question. Please type "help" to see what topics I can discuss.';
};
