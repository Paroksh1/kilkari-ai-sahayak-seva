
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import ProfileDetails from '@/components/Profile/ProfileDetails';
import { getUser } from '@/lib/authUtils';
import { User } from '@/types';

const ProfilePage = () => {
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

  const handleProfileUpdate = () => {
    // Refresh user data when profile is updated
    setUser(getUser());
  };

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">
          प्रोफाइल / Profile
        </h1>
        
        <ProfileDetails user={user} onUpdate={handleProfileUpdate} />
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
