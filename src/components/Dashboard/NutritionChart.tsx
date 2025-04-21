
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/types';

interface NutritionChartProps {
  user: User;
}

const NutritionChart = ({ user }: NutritionChartProps) => {
  // Define nutrition recommendations based on pregnancy week or baby age
  const getNutritionRecommendations = () => {
    const isPregnant = user.pregnancyWeek !== undefined;
    
    if (isPregnant) {
      const week = user.pregnancyWeek || 0;
      
      if (week < 13) { // First trimester
        return [
          { name: 'फोलिक एसिड / Folic Acid', sources: 'हरी पत्तेदार सब्जियां, दालें / Green leafy vegetables, legumes', importance: 'High' },
          { name: 'आयरन / Iron', sources: 'पालक, चुकंदर, अंडे / Spinach, beetroot, eggs*', importance: 'Medium' },
          { name: 'कैल्शियम / Calcium', sources: 'दूध, दही, पनीर / Milk, yogurt, paneer', importance: 'Medium' },
          { name: 'प्रोटीन / Protein', sources: 'दालें, अंडे, पनीर / Legumes, eggs*, paneer', importance: 'Medium' },
        ];
      } else if (week < 27) { // Second trimester
        return [
          { name: 'कैल्शियम / Calcium', sources: 'दूध, दही, पनीर / Milk, yogurt, paneer', importance: 'High' },
          { name: 'प्रोटीन / Protein', sources: 'दालें, अंडे, पनीर / Legumes, eggs*, paneer', importance: 'High' },
          { name: 'आयरन / Iron', sources: 'पालक, चुकंदर, अंडे / Spinach, beetroot, eggs*', importance: 'High' },
          { name: 'विटामिन D / Vitamin D', sources: 'धूप, दूध, अंडे / Sunlight, milk, eggs*', importance: 'Medium' },
        ];
      } else { // Third trimester
        return [
          { name: 'प्रोटीन / Protein', sources: 'दालें, अंडे, पनीर / Legumes, eggs*, paneer', importance: 'High' },
          { name: 'कैल्शियम / Calcium', sources: 'दूध, दही, पनीर / Milk, yogurt, paneer', importance: 'High' },
          { name: 'आयरन / Iron', sources: 'पालक, चुकंदर, अंडे / Spinach, beetroot, eggs*', importance: 'High' },
          { name: 'ओमेगा-3 / Omega-3', sources: 'अलसी, अखरोट / Flaxseed, walnuts', importance: 'Medium' },
        ];
      }
    } else {
      // For new mothers
      return [
        { name: 'कैल्शियम / Calcium', sources: 'दूध, दही, पनीर / Milk, yogurt, paneer', importance: 'High' },
        { name: 'प्रोटीन / Protein', sources: 'दालें, अंडे, पनीर / Legumes, eggs*, paneer', importance: 'High' },
        { name: 'आयरन / Iron', sources: 'पालक, चुकंदर, अंडे / Spinach, beetroot, eggs*', importance: 'High' },
        { name: 'विटामिन D / Vitamin D', sources: 'धूप, दूध, अंडे / Sunlight, milk, eggs*', importance: 'Medium' },
        { name: 'विटामिन B12 / Vitamin B12', sources: 'दूध, दही, अंडे / Milk, yogurt, eggs*', importance: 'Medium' },
      ];
    }
  };

  const recommendations = getNutritionRecommendations();

  return (
    <Card className="kilkari-card">
      <CardHeader className="bg-kilkari-purple/10 pb-2">
        <CardTitle className="text-lg font-medium">
          पोषण चार्ट / Nutrition Chart
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {recommendations.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className={`w-2 h-10 rounded-full mr-3 ${
                  item.importance === 'High' 
                    ? 'bg-kilkari-purple' 
                    : 'bg-kilkari-purple/40'
                }`}
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.sources}</p>
              </div>
              <div 
                className={`px-2 py-1 text-xs rounded-full ${
                  item.importance === 'High' 
                    ? 'bg-kilkari-purple/20 text-kilkari-purple' 
                    : 'bg-kilkari-purple/10 text-kilkari-purple/70'
                }`}
              >
                {item.importance === 'High' ? 'High' : 'Medium'}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-2 text-xs text-muted-foreground border-t">
          <p>* {user.dietaryPreference === 'vegetarian' ? 'For vegetarians, replace eggs with tofu or additional legumes.' : 'Includes animal-based protein sources.'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionChart;
