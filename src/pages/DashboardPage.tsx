
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import PregnancyTracker from '@/components/Dashboard/PregnancyTracker';
import BabyTracker from '@/components/Dashboard/BabyTracker';
import UpcomingAppointments from '@/components/Dashboard/UpcomingAppointments';
import MoodTracker from '@/components/Dashboard/MoodTracker';
import NutritionChart from '@/components/Dashboard/NutritionChart';
import { getUser } from '@/lib/authUtils';
import { User } from '@/types';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const userData = getUser();
    if (!userData) {
      navigate('/login');
      return;
    }
    
    setUser(userData);
  }, [navigate]);

  const handleMoodUpdate = () => {
    // Refresh user data when mood is updated
    setUser(getUser());
  };

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">
          नमस्ते / Hello, {user.name}! 👋
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Main Tracker - Pregnancy or Baby */}
          <div className="md:col-span-2">
            {user.pregnancyWeek !== undefined ? (
              <PregnancyTracker user={user} />
            ) : (
              <BabyTracker user={user} />
            )}
          </div>
          
          {/* Mood Tracker */}
          <div>
            <MoodTracker user={user} onMoodUpdate={handleMoodUpdate} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <UpcomingAppointments />
          
          {/* Nutrition Chart */}
          <NutritionChart user={user} />
        </div>
        
        <div className="mt-8 text-center">
          <h2 className="text-xl font-medium mb-2">
            {user.language === 'hindi' ? 'क्या और जानकारी चाहिए?' : 'Need more information?'}
          </h2>
          <p className="text-muted-foreground">
            {user.language === 'hindi'
              ? 'चैटबॉट से पूछें या अपॉइंटमेंट बुक करें।'
              : 'Ask the chatbot or book an appointment.'}
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
