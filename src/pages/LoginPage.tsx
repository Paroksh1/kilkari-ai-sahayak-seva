
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Baby } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import LoginForm from '@/components/Auth/LoginForm';
import { isAuthenticated } from '@/lib/authUtils';

const LoginPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] py-12">
        <div className="bg-kilkari-purple/10 w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <Baby className="w-12 h-12 text-kilkari-purple" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">लॉगिन / Login</h1>
        <p className="text-muted-foreground mb-8">अपने किलकारी AI खाते में लॉगिन करें / Login to your Kilkari AI account</p>
        
        <LoginForm />
        
        <div className="mt-8 text-sm text-muted-foreground">
          <p>
            डेमो के लिए, कोई भी ईमेल और पासवर्ड एंटर करें / For demo, enter any email and password
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
