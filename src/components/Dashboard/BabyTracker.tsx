
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { babyMilestones } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BabyTrackerProps {
  user: User;
}

const BabyTracker = ({ user }: BabyTrackerProps) => {
  const [milestone, setMilestone] = useState('');
  const babyMonths = user.babyMonths || 0;

  useEffect(() => {
    // Find closest milestone
    const nearestMonth = Object.keys(babyMilestones)
      .map(Number)
      .reduce((prev, curr) => 
        Math.abs(curr - babyMonths) < Math.abs(prev - babyMonths) ? curr : prev
      );
    
    setMilestone(babyMilestones[nearestMonth] || "No milestone available for this month.");
  }, [babyMonths]);

  return (
    <Card className="kilkari-card">
      <CardHeader className="bg-kilkari-purple/10 pb-2">
        <CardTitle className="text-lg font-medium">
          आपके शिशु का विकास / Your Baby's Development
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-lg">{babyMonths} {babyMonths === 1 ? 'महीना' : 'महीने'} / {babyMonths} {babyMonths === 1 ? 'Month' : 'Months'}</span>
            <span className="text-sm px-3 py-1 rounded-full bg-kilkari-pink text-kilkari-purple">
              Milestone
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground">{milestone}</p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-kilkari-purple/5 rounded-lg">
              <h4 className="font-medium">खाद्य सुझाव / Food Suggestions</h4>
              <ul className="text-sm mt-2 space-y-1">
                {babyMonths < 6 ? (
                  <li>स्तनपान या फॉर्मूला / Breastmilk or formula only</li>
                ) : babyMonths < 8 ? (
                  <>
                    <li>स्तनपान या फॉर्मूला / Breastmilk or formula</li>
                    <li>सिंगल ग्रेन सीरियल / Single grain cereal</li>
                    <li>मैश किए हुए फल / Mashed fruits</li>
                  </>
                ) : babyMonths < 10 ? (
                  <>
                    <li>स्तनपान या फॉर्मूला / Breastmilk or formula</li>
                    <li>सॉफ्ट फिंगर फूड्स / Soft finger foods</li>
                    <li>मैश किए हुए सब्जियां / Mashed vegetables</li>
                  </>
                ) : (
                  <>
                    <li>स्तनपान या फॉर्मूला / Breastmilk or formula</li>
                    <li>फिंगर फूड्स / Finger foods</li>
                    <li>परिवार का खाना (मसाला कम) / Family food (less spicy)</li>
                  </>
                )}
              </ul>
            </div>
            <div className="p-4 bg-kilkari-blue/20 rounded-lg">
              <h4 className="font-medium">गतिविधियां / Activities</h4>
              <ul className="text-sm mt-2 space-y-1">
                {babyMonths < 4 ? (
                  <>
                    <li>टमी टाइम / Tummy time</li>
                    <li>हाई कॉन्ट्रास्ट कार्ड्स / High contrast cards</li>
                    <li>म्यूजिक / Soft music</li>
                  </>
                ) : babyMonths < 8 ? (
                  <>
                    <li>पीकाबू खेलें / Peekaboo games</li>
                    <li>सॉफ्ट टॉयज़ / Soft toys</li>
                    <li>बुक्स और रिमेज / Books and rhymes</li>
                  </>
                ) : (
                  <>
                    <li>स्टैकिंग टॉयज़ / Stacking toys</li>
                    <li>बॉल खेलें / Ball play</li>
                    <li>इंटरैक्टिव रीडिंग / Interactive reading</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BabyTracker;
