
import { ReactNode } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-kilkari-gray/30">
      <NavBar />
      <main className="flex-1 py-6">
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
