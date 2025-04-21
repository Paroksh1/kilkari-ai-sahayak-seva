
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { addAppointment } from '@/lib/appointmentUtils';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface AppointmentFormProps {
  onSuccess: () => void;
}

const AppointmentForm = ({ onSuccess }: AppointmentFormProps) => {
  const [date, setDate] = useState<Date | undefined>();
  const [formData, setFormData] = useState({
    title: '',
    purpose: '',
    time: '',
    location: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !formData.time || !formData.title || !formData.purpose) {
      toast.error('कृपया सभी आवश्यक जानकारी भरें / Please fill all required information');
      return;
    }

    const newAppointment = {
      title: formData.title,
      purpose: formData.purpose,
      date: format(date, 'yyyy-MM-dd'),
      time: formData.time,
      location: formData.location,
      notes: formData.notes,
    };

    addAppointment(newAppointment);
    toast.success('अपॉइंटमेंट सेव की गई! / Appointment saved!');
    
    // Reset form
    setDate(undefined);
    setFormData({
      title: '',
      purpose: '',
      time: '',
      location: '',
      notes: '',
    });
    
    onSuccess();
  };

  const appointmentTypes = [
    'रूटीन चेकअप / Routine Checkup',
    'अल्ट्रासाउंड / Ultrasound',
    'प्रेगनेंसी टेस्ट / Pregnancy Test',
    'वैक्सीनेशन / Vaccination',
    'पोस्टपार्टम विज़िट / Postpartum Visit',
    'बाल स्वास्थ्य जांच / Baby Wellness Check',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">शीर्षक / Title *</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="अपॉइंटमेंट का नाम / Appointment name"
            className="kilkari-input"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="purpose">उद्देश्य / Purpose *</Label>
          <Select
            value={formData.purpose}
            onValueChange={(value) => handleSelectChange('purpose', value)}
          >
            <SelectTrigger className="kilkari-input">
              <SelectValue placeholder="अपॉइंटमेंट का उद्देश्य / Appointment purpose" />
            </SelectTrigger>
            <SelectContent>
              {appointmentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>तारीख / Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full kilkari-input justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>तारीख चुनें / Choose a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">समय / Time *</Label>
          <Input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            className="kilkari-input"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">स्थान / Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="अपॉइंटमेंट का स्थान / Appointment location"
          className="kilkari-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">नोट्स / Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="कोई अतिरिक्त जानकारी / Any additional information"
          className="kilkari-input min-h-20"
        />
      </div>

      <Button type="submit" className="w-full kilkari-button-primary">
        अपॉइंटमेंट बुक करें / Book Appointment
      </Button>
    </form>
  );
};

export default AppointmentForm;
