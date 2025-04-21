
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { pregnancyTips } from '@/lib/mockData';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PregnancyTrackerProps {
  user: User;
}

const PregnancyTracker = ({ user }: PregnancyTrackerProps) => {
  const [progress, setProgress] = useState(0);
  const pregnancyWeek = user.pregnancyWeek || 0;
  const maxWeeks = 40; // Full-term pregnancy is typically 40 weeks
  
  // Calculate nearest week for which we have a tip
  const nearestWeek = Object.keys(pregnancyTips)
    .map(Number)
    .reduce((prev, curr) => 
      Math.abs(curr - pregnancyWeek) < Math.abs(prev - pregnancyWeek) ? curr : prev
    );
  
  const weeklyTip = pregnancyTips[nearestWeek] || "No tip available for this week.";

  useEffect(() => {
    // Animate progress bar
    const calculatedProgress = (pregnancyWeek / maxWeeks) * 100;
    setTimeout(() => setProgress(calculatedProgress), 300);
  }, [pregnancyWeek]);

  return (
    <Card className="kilkari-card">
      <CardHeader className="bg-kilkari-purple/10 pb-2">
        <CardTitle className="text-lg font-medium">
          आपकी गर्भावस्था / Your Pregnancy
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">सप्ताह / Week {pregnancyWeek}</span>
            <span className="text-sm text-muted-foreground">40 सप्ताह / weeks</span>
          </div>
          <Progress value={progress} className="h-2 bg-kilkari-purple/20" />
          
          <div className="mt-4 space-y-2">
            <h4 className="font-medium">इस सप्ताह / This Week</h4>
            <p className="text-sm text-muted-foreground">{weeklyTip}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="text-center p-2 bg-kilkari-purple/5 rounded-lg">
              <p className="text-sm font-medium">{pregnancyWeek} सप्ताह / Weeks</p>
              <p className="text-xs text-muted-foreground">बीत चुके / Passed</p>
            </div>
            <div className="text-center p-2 bg-kilkari-purple/10 rounded-lg">
              <p className="text-sm font-medium">{maxWeeks - pregnancyWeek} सप्ताह / Weeks</p>
              <p className="text-xs text-muted-foreground">बचे हैं / Left</p>
            </div>
            <div className="text-center p-2 bg-kilkari-purple/15 rounded-lg">
              <p className="text-sm font-medium">{Math.floor(pregnancyWeek / 4)} महीने / Months</p>
              <p className="text-xs text-muted-foreground">बीत चुके / Passed</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PregnancyTracker;
