
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Baby, Calendar, MessageCircle, ShoppingCart } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import { useEffect } from 'react';
import { getUser } from '@/lib/authUtils';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (getUser()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-kilkari-purple">किलकारी AI</span> - आपका गर्भावस्था और शिशु देखभाल साथी
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              भारत की माताओं के लिए विशेष रूप से तैयार किया गया AI-powered सहायक जो आपको स्वस्थ और सूचित रखता है
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={() => navigate('/signup')} 
                size="lg" 
                className="kilkari-button-primary text-lg"
              >
                शुरू करें / Get Started
              </Button>
              <Button 
                onClick={() => navigate('/login')} 
                variant="outline" 
                size="lg" 
                className="kilkari-button-secondary text-lg"
              >
                लॉगिन / Login
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 bg-kilkari-purple/5 rounded-3xl my-12">
          <h2 className="text-3xl font-bold text-center mb-12">विशेषताएँ / Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="bg-kilkari-pink w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Baby className="w-8 h-8 text-kilkari-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">व्यक्तिगत ट्रैकिंग / Personalized Tracking</h3>
              <p className="text-muted-foreground">अपने गर्भावस्था या शिशु के विकास के आधार पर व्यक्तिगत सलाह प्राप्त करें</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="bg-kilkari-blue/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-kilkari-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">अपॉइंटमेंट बुकिंग / Appointment Booking</h3>
              <p className="text-muted-foreground">चेकअप और वैक्सीनेशन अपॉइंटमेंट्स को आसानी से शेड्यूल और ट्रैक करें</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="bg-kilkari-purple/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-kilkari-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI चैटबॉट / AI Chatbot</h3>
              <p className="text-muted-foreground">अपने गर्भावस्था या शिशु देखभाल से संबंधित प्रश्नों के उत्तर तुरंत पाएँ</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="bg-kilkari-peach w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-kilkari-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">शॉपिंग लिस्ट / Shopping List</h3>
              <p className="text-muted-foreground">अपनी गर्भावस्था या शिशु के चरण के अनुसार आवश्यक सामानों की सूची प्राप्त करें</p>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-12 my-12">
          <h2 className="text-3xl font-bold text-center mb-12">लाभ / Benefits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">विश्वसनीय जानकारी / Trusted Information</h3>
              <p className="text-muted-foreground">डॉक्टरों द्वारा सत्यापित, भारतीय माताओं के लिए विशेष रूप से अनुकूलित जानकारी</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">द्विभाषी सहायता / Bilingual Support</h3>
              <p className="text-muted-foreground">हिंदी और अंग्रेजी में सहायता के साथ आपकी भाषा में सूचित रहें</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">24/7 उपलब्धता / 24/7 Availability</h3>
              <p className="text-muted-foreground">किसी भी समय, कहीं भी सहायता प्राप्त करें - आपका डिजिटल स्वास्थ्य साथी</p>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 my-12 bg-kilkari-purple/10 rounded-3xl text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6">आज ही अपनी स्वास्थ्य यात्रा शुरू करें / Start your health journey today</h2>
            <p className="text-lg text-muted-foreground mb-8">
              किलकारी AI के साथ, आप अपने और अपने शिशु के स्वास्थ्य को प्राथमिकता देते हुए अपनी गर्भावस्था और मातृत्व यात्रा का आनंद ले सकती हैं।
            </p>
            <Button 
              onClick={() => navigate('/signup')} 
              size="lg" 
              className="kilkari-button-primary text-lg"
            >
              अभी रजिस्टर करें / Register Now
            </Button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
