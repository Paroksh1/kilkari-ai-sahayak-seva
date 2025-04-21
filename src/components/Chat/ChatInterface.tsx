
import { useEffect, useRef, useState } from 'react';
import { MessageSquare, Mic, MicOff, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ChatMessage, User } from '@/types';
import { addMessage, getBotResponse, getChatMessages } from '@/lib/chatUtils';
import { useTranslations } from '@/hooks/use-translations';
import { useLanguage } from '@/context/LanguageContext';

interface ChatInterfaceProps {
  user: User;
}

const ChatInterface = ({ user }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslations();
  const { language } = useLanguage();
  
  useEffect(() => {
    // Load chat history
    const chatHistory = getChatMessages();
    setMessages(chatHistory);
    
    // Scroll to bottom
    scrollToBottom();
  }, []);
  
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const userMessage = addMessage(inputMessage, 'user');
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    scrollToBottom();
    
    // Get bot response with the current language
    setIsLoading(true);
    try {
      // Pass the current language context instead of user.language
      const userWithCurrentLanguage = {
        ...user,
        language: language
      };
      const botResponseText = await getBotResponse(inputMessage, userWithCurrentLanguage);
      const botMessage = addMessage(botResponseText, 'bot');
      setMessages(prevMessages => [...prevMessages, botMessage]);
      scrollToBottom();
    } catch (error) {
      toast.error(t('browserNotSupport'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      sendMessage();
    }
  };
  
  const toggleSpeechRecognition = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      if (isListening) {
        // Stop listening
        setIsListening(false);
        toast.info(t('voiceStopped'));
      } else {
        // Start listening
        setIsListening(true);
        toast.info(t('voiceStarted'));
        
        // Mock voice recognition - in a real app, we'd use the Web Speech API
        setTimeout(() => {
          setIsListening(false);
          if (language === 'hindi') {
            setInputMessage('मुझे गर्भावस्था के बारे में जानकारी चाहिए');
          } else {
            setInputMessage('I need information about pregnancy');
          }
          toast.info(t('voiceCompleted'));
        }, 3000);
      }
    } else {
      toast.error(t('browserNotSupport'));
    }
  };

  return (
    <Card className="kilkari-card h-full">
      <CardHeader className="bg-kilkari-purple/10 pb-2">
        <CardTitle className="text-lg font-medium">
          {t('chatbotTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 flex flex-col h-[calc(100%-60px)]">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {t('chatbotIntroHint')}
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-kilkari-purple text-white rounded-br-none'
                      : 'bg-kilkari-gray rounded-bl-none'
                  }`}
                >
                  <p>{message.message}</p>
                  <div className="text-xs text-right mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {isLoading && (
          <div className="flex justify-center mb-4">
            <div className="flex space-x-2 items-center">
              <div className="w-2 h-2 bg-kilkari-purple rounded-full animate-pulse-soft" />
              <div className="w-2 h-2 bg-kilkari-purple rounded-full animate-pulse-soft delay-100" />
              <div className="w-2 h-2 bg-kilkari-purple rounded-full animate-pulse-soft delay-200" />
            </div>
          </div>
        )}
        
        <div className="relative mt-auto">
          <Input
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder={t('typeQuestion')}
            className="kilkari-input pr-24"
            disabled={isLoading}
          />
          <div className="absolute right-1 top-1 flex items-center">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={toggleSpeechRecognition}
              className={`rounded-full ${isListening ? 'bg-kilkari-purple text-white' : 'text-kilkari-purple'}`}
              disabled={isLoading}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button
              type="button"
              size="icon"
              onClick={sendMessage}
              className="rounded-full bg-kilkari-purple text-white ml-1"
              disabled={isLoading || !inputMessage.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
