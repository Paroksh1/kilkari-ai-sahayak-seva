
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t bg-white py-6">
      <div className="container flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-kilkari-purple" />
          <p className="text-sm text-muted-foreground">
            किलकारी AI - आपका गर्भावस्था और शिशु देखभाल साथी
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/about" className="text-sm text-muted-foreground hover:text-kilkari-purple transition-colors">
            हमारे बारे में / About
          </Link>
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-kilkari-purple transition-colors">
            प्राइवेसी / Privacy
          </Link>
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-kilkari-purple transition-colors">
            नियम और शर्तें / Terms
          </Link>
        </div>
        
        <p className="text-xs text-muted-foreground">
          © 2025 C4GT. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
