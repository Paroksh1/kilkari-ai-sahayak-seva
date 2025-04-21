
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import ShoppingList from '@/components/Shopping/ShoppingList';
import { getUser } from '@/lib/authUtils';
import { User } from '@/types';

const ShoppingListPage = () => {
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

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">
          आवश्यक सामान की सूची / Essential Shopping List
        </h1>
        
        <ShoppingList user={user} />
      </div>
    </MainLayout>
  );
};

export default ShoppingListPage;
