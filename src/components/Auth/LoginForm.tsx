
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/authUtils';
import { toast } from 'sonner';

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        toast.error('कृपया ईमेल और पासवर्ड दर्ज करें / Please enter email and password');
        setLoading(false);
        return;
      }

      await login(formData.email, formData.password);
      toast.success('लॉगिन सफल रहा! / Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('लॉगिन असफल रहा / Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="email">ईमेल या फ़ोन / Email or Phone</Label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="अपना ईमेल या फ़ोन दर्ज करें / Enter your email or phone"
          className="kilkari-input"
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">पासवर्ड / Password</Label>
          <a 
            href="#" 
            className="text-sm text-kilkari-purple hover:underline"
            onClick={(e) => {
              e.preventDefault();
              toast.info('इस डेमो में यह सुविधा उपलब्ध नहीं है / This feature is not available in the demo');
            }}
          >
            पासवर्ड भूल गए? / Forgot password?
          </a>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="अपना पासवर्ड दर्ज करें / Enter your password"
          className="kilkari-input"
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full kilkari-button-primary" 
        disabled={loading}
      >
        {loading ? 'प्रतीक्षा करें... / Please wait...' : 'लॉगिन / Login'}
      </Button>

      <div className="text-center">
        <p className="text-sm">
          नया उपयोगकर्ता? / New user?{" "}
          <a href="/signup" className="text-kilkari-purple hover:underline">
            साइनअप करें / Sign Up
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
