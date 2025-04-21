
import { useState } from 'react';
import { User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { saveUser } from '@/lib/authUtils';
import { toast } from 'sonner';

interface ProfileDetailsProps {
  user: User;
  onUpdate: () => void;
}

const ProfileDetails = ({ user, onUpdate }: ProfileDetailsProps) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    age: user.age.toString(),
    contact: user.contact || '',
    pregnancyWeek: user.pregnancyWeek?.toString() || '',
    babyMonths: user.babyMonths?.toString() || '',
    dietaryPreference: user.dietaryPreference,
    allergies: user.allergies.join(', '),
    location: user.location,
    language: user.language,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // Validate
    if (!formData.name || !formData.age || !formData.location) {
      toast.error('कृपया सभी आवश्यक फ़ील्ड भरें / Please fill all required fields');
      return;
    }
    
    // Check if user has either pregnancyWeek or babyMonths but not both
    const hasPregnancyWeek = !!formData.pregnancyWeek;
    const hasBabyMonths = !!formData.babyMonths;
    
    if (!hasPregnancyWeek && !hasBabyMonths) {
      toast.error('कृपया गर्भावस्था सप्ताह या शिशु की आयु दर्ज करें / Please enter either pregnancy week or baby age');
      return;
    }
    
    if (hasPregnancyWeek && hasBabyMonths) {
      toast.error('आप गर्भावस्था सप्ताह और शिशु की आयु दोनों नहीं दर्ज कर सकते / You cannot enter both pregnancy week and baby age');
      return;
    }
    
    const updatedUser: User = {
      ...user,
      name: formData.name,
      age: parseInt(formData.age),
      contact: formData.contact || undefined,
      pregnancyWeek: formData.pregnancyWeek ? parseInt(formData.pregnancyWeek) : undefined,
      babyMonths: formData.babyMonths ? parseInt(formData.babyMonths) : undefined,
      dietaryPreference: formData.dietaryPreference as 'vegetarian' | 'non-vegetarian',
      allergies: formData.allergies ? formData.allergies.split(',').map(a => a.trim()) : [],
      location: formData.location,
      language: formData.language as 'hindi' | 'english',
    };
    
    saveUser(updatedUser);
    toast.success('प्रोफाइल अपडेट किया गया / Profile updated');
    setEditMode(false);
    onUpdate();
  };

  return (
    <Card className="kilkari-card">
      <CardHeader className="bg-kilkari-purple/10 pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>प्रोफाइल विवरण / Profile Details</span>
          {!editMode && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditMode(true)}
              className="text-kilkari-purple hover:text-kilkari-purple/90 border-kilkari-purple/20"
            >
              संपादित करें / Edit
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {editMode ? (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">नाम / Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  className="kilkari-input"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact">फ़ोन या ईमेल / Phone or Email</Label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="kilkari-input"
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pregnancyWeek">गर्भावस्था का सप्ताह / Pregnancy Week</Label>
                <Input
                  id="pregnancyWeek"
                  name="pregnancyWeek"
                  type="number"
                  min="1"
                  max="42"
                  value={formData.pregnancyWeek}
                  onChange={handleChange}
                  className="kilkari-input"
                  disabled={!!formData.babyMonths}
                  placeholder={formData.babyMonths ? "N/A" : undefined}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="babyMonths">शिशु की आयु (महीनों में) / Baby Age (months)</Label>
                <Input
                  id="babyMonths"
                  name="babyMonths"
                  type="number"
                  min="0"
                  max="24"
                  value={formData.babyMonths}
                  onChange={handleChange}
                  className="kilkari-input"
                  disabled={!!formData.pregnancyWeek}
                  placeholder={formData.pregnancyWeek ? "N/A" : undefined}
                />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dietary">आहार प्राथमिकता / Dietary Preference</Label>
                <Select
                  value={formData.dietaryPreference}
                  onValueChange={(value) => handleSelectChange('dietaryPreference', value)}
                >
                  <SelectTrigger id="dietary" className="kilkari-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetarian">शाकाहारी / Vegetarian</SelectItem>
                    <SelectItem value="non-vegetarian">मांसाहारी / Non-vegetarian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">पिनकोड / Pincode *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="kilkari-input"
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="allergies">एलर्जी / Allergies</Label>
                <Input
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="अल्पविराम से अलग करें / Separate with commas"
                  className="kilkari-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">भाषा / Language</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => handleSelectChange('language', value)}
                >
                  <SelectTrigger id="language" className="kilkari-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hindi">हिंदी / Hindi</SelectItem>
                    <SelectItem value="english">अंग्रेज़ी / English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setEditMode(false)}
                className="flex-1"
              >
                रद्द करें / Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 kilkari-button-primary"
              >
                सेव करें / Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">नाम / Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">आयु / Age</p>
                <p className="font-medium">{user.age} वर्ष / years</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">फ़ोन या ईमेल / Phone or Email</p>
              <p className="font-medium">{user.contact || 'Not provided'}</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">
                  {user.pregnancyWeek !== undefined ? 'गर्भावस्था का सप्ताह / Pregnancy Week' : 'शिशु की आयु / Baby Age'}
                </p>
                <p className="font-medium">
                  {user.pregnancyWeek !== undefined 
                    ? `${user.pregnancyWeek} सप्ताह / weeks` 
                    : `${user.babyMonths} महीने / months`}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">आहार प्राथमिकता / Dietary Preference</p>
                <p className="font-medium">
                  {user.dietaryPreference === 'vegetarian' ? 'शाकाहारी / Vegetarian' : 'मांसाहारी / Non-vegetarian'}
                </p>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">पिनकोड / Pincode</p>
                <p className="font-medium">{user.location}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">भाषा / Language</p>
                <p className="font-medium">
                  {user.language === 'hindi' ? 'हिंदी / Hindi' : 'अंग्रेज़ी / English'}
                </p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">एलर्जी / Allergies</p>
              <p className="font-medium">
                {user.allergies && user.allergies.length > 0 
                  ? user.allergies.join(', ') 
                  : 'कोई एलर्जी नहीं / No allergies'}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileDetails;
