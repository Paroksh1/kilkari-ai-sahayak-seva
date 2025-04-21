
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { signup } from '@/lib/authUtils';
import { toast } from 'sonner';

const SignupForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    contact: '',
    isPregnant: true,
    pregnancyWeek: '',
    babyMonths: '',
    dietaryPreference: 'vegetarian' as 'vegetarian' | 'non-vegetarian',
    allergies: '',
    location: '',
    language: 'hindi' as 'hindi' | 'english',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic validation
      if (!formData.name || !formData.age || !formData.location) {
        toast.error('कृपया सभी आवश्यक फ़ील्ड भरें / Please fill all required fields');
        setLoading(false);
        return;
      }

      if (formData.isPregnant && !formData.pregnancyWeek) {
        toast.error('कृपया गर्भावस्था का सप्ताह दर्ज करें / Please enter pregnancy week');
        setLoading(false);
        return;
      }

      if (!formData.isPregnant && !formData.babyMonths) {
        toast.error('कृपया शिशु की आयु (महीनों में) दर्ज करें / Please enter baby age in months');
        setLoading(false);
        return;
      }

      // Prepare data for signup
      const userData = {
        name: formData.name,
        age: parseInt(formData.age),
        contact: formData.contact,
        pregnancyWeek: formData.isPregnant ? parseInt(formData.pregnancyWeek) : undefined,
        babyMonths: !formData.isPregnant ? parseInt(formData.babyMonths) : undefined,
        dietaryPreference: formData.dietaryPreference,
        allergies: formData.allergies ? formData.allergies.split(',').map(a => a.trim()) : [],
        location: formData.location,
        language: formData.language,
      };

      await signup(userData);
      toast.success('साइनअप सफल रहा! / Signup successful!');
      navigate('/login');
    } catch (error) {
      toast.error('साइनअप असफल रहा / Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="name">नाम / Name *</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="अपना नाम दर्ज करें / Enter your name"
          className="kilkari-input"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">आयु / Age *</Label>
        <Input
          id="age"
          name="age"
          type="number"
          min="18"
          max="50"
          value={formData.age}
          onChange={handleChange}
          placeholder="अपनी आयु दर्ज करें / Enter your age"
          className="kilkari-input"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact">फ़ोन या ईमेल / Phone or Email (Optional)</Label>
        <Input
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="संपर्क जानकारी दर्ज करें / Enter contact information"
          className="kilkari-input"
        />
      </div>

      <div className="space-y-2">
        <Label>आप क्या हैं? / Are you:</Label>
        <RadioGroup 
          value={formData.isPregnant ? "pregnant" : "new-mother"} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, isPregnant: value === "pregnant" }))}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pregnant" id="pregnant" />
            <Label htmlFor="pregnant">गर्भवती / Pregnant</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new-mother" id="new-mother" />
            <Label htmlFor="new-mother">नई माँ / New Mother</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.isPregnant ? (
        <div className="space-y-2">
          <Label htmlFor="pregnancyWeek">गर्भावस्था का सप्ताह / Pregnancy Week *</Label>
          <Input
            id="pregnancyWeek"
            name="pregnancyWeek"
            type="number"
            min="1"
            max="42"
            value={formData.pregnancyWeek}
            onChange={handleChange}
            placeholder="अपनी गर्भावस्था का सप्ताह दर्ज करें / Enter your pregnancy week"
            className="kilkari-input"
            required={formData.isPregnant}
          />
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="babyMonths">शिशु की आयु (महीनों में) / Baby's Age (in months) *</Label>
          <Input
            id="babyMonths"
            name="babyMonths"
            type="number"
            min="0"
            max="24"
            value={formData.babyMonths}
            onChange={handleChange}
            placeholder="शिशु की आयु महीनों में दर्ज करें / Enter baby's age in months"
            className="kilkari-input"
            required={!formData.isPregnant}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="diet">आहार प्राथमिकता / Dietary Preference *</Label>
        <Select
          value={formData.dietaryPreference}
          onValueChange={(value) => handleSelectChange('dietaryPreference', value as 'vegetarian' | 'non-vegetarian')}
        >
          <SelectTrigger className="kilkari-input">
            <SelectValue placeholder="अपनी आहार प्राथमिकता चुनें / Select your dietary preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vegetarian">शाकाहारी / Vegetarian</SelectItem>
            <SelectItem value="non-vegetarian">मांसाहारी / Non-vegetarian</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="allergies">एलर्जी / Allergies (Optional)</Label>
        <Input
          id="allergies"
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          placeholder="कोई एलर्जी? अल्पविराम से अलग करें / Any allergies? Separate with commas"
          className="kilkari-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">पिनकोड / Pincode *</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="अपना पिनकोड दर्ज करें / Enter your pincode"
          className="kilkari-input"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="language">भाषा प्राथमिकता / Language Preference *</Label>
        <Select
          value={formData.language}
          onValueChange={(value) => handleSelectChange('language', value as 'hindi' | 'english')}
        >
          <SelectTrigger className="kilkari-input">
            <SelectValue placeholder="अपनी भाषा चुनें / Select your language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hindi">हिंदी / Hindi</SelectItem>
            <SelectItem value="english">अंग्रेज़ी / English</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox id="terms" required />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          मैं नियमों और शर्तों से सहमत हूं / I agree to the terms and conditions
        </label>
      </div>

      <Button 
        type="submit" 
        className="w-full kilkari-button-primary" 
        disabled={loading}
      >
        {loading ? 'प्रतीक्षा करें... / Please wait...' : 'साइनअप / Sign Up'}
      </Button>

      <div className="text-center">
        <p className="text-sm">
          पहले से खाता है? / Already have an account?{" "}
          <a href="/login" className="text-kilkari-purple hover:underline">
            लॉगिन करें / Login
          </a>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
