
import { useState } from 'react';
import { MapPin, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getClinicsByPincode } from '@/lib/clinicUtils';
import { Clinic } from '@/types';
import { toast } from 'sonner';

const ClinicFinder = () => {
  const [pincode, setPincode] = useState('');
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  
  const handleSearch = () => {
    if (!pincode || pincode.length < 6) {
      toast.error('कृपया वैध पिनकोड दर्ज करें / Please enter a valid pincode');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      const foundClinics = getClinicsByPincode(pincode);
      setClinics(foundClinics);
      setSearched(true);
      setLoading(false);
      
      if (foundClinics.length === 0) {
        toast.info(`पिनकोड ${pincode} के लिए कोई क्लिनिक नहीं मिला / No clinics found for pincode ${pincode}`);
      }
    }, 800); // Simulate network delay
  };

  return (
    <Card className="kilkari-card">
      <CardHeader className="bg-kilkari-purple/10 pb-2">
        <CardTitle className="text-lg font-medium">
          क्लिनिक ढूंढें / Find Clinics
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="अपना पिनकोड दर्ज करें / Enter your pincode"
              className="kilkari-input"
              maxLength={6}
            />
            <Button 
              onClick={handleSearch} 
              disabled={loading}
              className="kilkari-button-primary whitespace-nowrap"
            >
              {loading ? 'खोज रहे हैं... / Searching...' : 'खोजें / Search'}
            </Button>
          </div>
          
          <div className="space-y-3 mt-2">
            {clinics.length > 0 ? (
              clinics.map((clinic) => (
                <div
                  key={clinic.id}
                  className="p-4 rounded-lg border border-kilkari-purple/10 hover:border-kilkari-purple/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{clinic.name}</h4>
                    <span 
                      className={`px-2 py-1 text-xs rounded-full ${
                        clinic.type === 'clinic'
                          ? 'bg-kilkari-blue/20 text-blue-700'
                          : clinic.type === 'hospital'
                            ? 'bg-kilkari-purple/20 text-kilkari-purple'
                            : 'bg-kilkari-pink text-pink-700'
                      }`}
                    >
                      {clinic.type === 'clinic' ? 'Clinic' : clinic.type === 'hospital' ? 'Hospital' : 'Health Worker'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{clinic.area}, {clinic.pincode}</span>
                  </div>
                  
                  {clinic.contact && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Phone className="h-4 w-4" />
                      <span>{clinic.contact}</span>
                    </div>
                  )}
                </div>
              ))
            ) : searched ? (
              <div className="text-center py-8 bg-kilkari-purple/5 rounded-lg">
                <p className="text-muted-foreground">
                  इस पिनकोड के लिए कोई क्लिनिक नहीं मिला / No clinics found for this pincode
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicFinder;
