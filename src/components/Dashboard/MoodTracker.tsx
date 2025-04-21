
import { useState } from 'react';
import { User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { addMoodEntry, getMoodResponse } from '@/lib/moodUtils';
import { toast } from 'sonner';

interface MoodTrackerProps {
  user: User;
  onMoodUpdate: () => void;
}

const MoodTracker = ({ user, onMoodUpdate }: MoodTrackerProps) => {
  const [selectedMood, setSelectedMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  const [note, setNote] = useState('');
  const [response, setResponse] = useState('');
  const [step, setStep] = useState(1);

  const handleMoodSelect = (mood: 'happy' | 'neutral' | 'sad') => {
    setSelectedMood(mood);
    setResponse(getMoodResponse(mood));
    setStep(2);
  };

  const handleSaveMood = () => {
    if (selectedMood) {
      addMoodEntry(selectedMood, note);
      toast.success('आपका मूड सेव किया गया / Your mood has been saved');
      setSelectedMood(null);
      setNote('');
      setResponse('');
      setStep(1);
      onMoodUpdate();
    }
  };

  return (
    <Card className="kilkari-card">
      <CardHeader className="bg-kilkari-purple/10 pb-2">
        <CardTitle className="text-lg font-medium">
          {user.language === 'hindi' ? 'आज आपका मूड कैसा है?' : 'How are you feeling today?'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {step === 1 ? (
          <div className="flex justify-center gap-6 my-4">
            <Button
              onClick={() => handleMoodSelect('happy')}
              variant="ghost"
              className="flex flex-col items-center p-2 hover:bg-kilkari-purple/10"
            >
              <span className="text-4xl">😊</span>
              <span className="mt-2 text-sm font-medium">
                {user.language === 'hindi' ? 'खुश' : 'Happy'}
              </span>
            </Button>
            <Button
              onClick={() => handleMoodSelect('neutral')}
              variant="ghost"
              className="flex flex-col items-center p-2 hover:bg-kilkari-purple/10"
            >
              <span className="text-4xl">😐</span>
              <span className="mt-2 text-sm font-medium">
                {user.language === 'hindi' ? 'ठीक-ठाक' : 'Neutral'}
              </span>
            </Button>
            <Button
              onClick={() => handleMoodSelect('sad')}
              variant="ghost"
              className="flex flex-col items-center p-2 hover:bg-kilkari-purple/10"
            >
              <span className="text-4xl">😢</span>
              <span className="mt-2 text-sm font-medium">
                {user.language === 'hindi' ? 'उदास' : 'Sad'}
              </span>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-kilkari-purple/5 p-4 rounded-lg">
              <p className="text-sm">{response}</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="note" className="text-sm font-medium">
                {user.language === 'hindi' ? 'कुछ बताना चाहेंगे?' : 'Want to add a note?'}
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full h-20 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-kilkari-purple/40"
                placeholder={user.language === 'hindi' ? 'अपनी भावनाओं के बारे में लिखें...' : 'Write about your feelings...'}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1"
              >
                {user.language === 'hindi' ? 'वापस जाएँ' : 'Back'}
              </Button>
              <Button
                onClick={handleSaveMood}
                className="flex-1 kilkari-button-primary"
              >
                {user.language === 'hindi' ? 'सेव करें' : 'Save'}
              </Button>
            </div>
          </div>
        )}
        
        {user.moodHistory && user.moodHistory.length > 0 && step === 1 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">
              {user.language === 'hindi' ? 'पिछले मूड' : 'Recent moods'}
            </h4>
            <div className="flex gap-2">
              {user.moodHistory.slice(0, 5).map((entry, index) => (
                <div key={index} className="text-center">
                  <span className="text-xl">
                    {entry.mood === 'happy' ? '😊' : entry.mood === 'neutral' ? '😐' : '😢'}
                  </span>
                  <p className="text-xs text-muted-foreground">{entry.date.split('-')[2]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
