
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import ChatInterface from '@/components/Chat/ChatInterface';
import { getUser } from '@/lib/authUtils';
import { User } from '@/types';
import { useTranslations } from '@/hooks/use-translations';

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const { t } = useTranslations();
  
  useEffect(() => {
    const userData = getUser();
    if (!userData) {
      navigate('/login');
      return;
    }
    
    setUser(userData);
  }, [navigate]);

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">
          {t('chatbot')}
        </h1>
        
        <div className="h-[70vh]">
          <ChatInterface user={user} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatbotPage;
