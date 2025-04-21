
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Baby } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import SignupForm from '@/components/Auth/SignupForm';
import { isAuthenticated } from '@/lib/authUtils';

const SignupPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-kilkari-purple/10 w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <Baby className="w-12 h-12 text-kilkari-purple" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">साइनअप / Sign Up</h1>
        <p className="text-muted-foreground mb-8">किलकारी AI के साथ अपनी स्वास्थ्य यात्रा शुरू करें / Begin your health journey with Kilkari AI</p>
        
        <SignupForm />
      </div>
    </MainLayout>
  );
};

export default SignupPage;
