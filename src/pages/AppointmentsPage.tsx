
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import AppointmentForm from '@/components/Appointments/AppointmentForm';
import AppointmentList from '@/components/Appointments/AppointmentList';
import ClinicFinder from '@/components/Clinics/ClinicFinder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { getUser } from '@/lib/authUtils';

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');
  
  useEffect(() => {
    if (!getUser()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleAppointmentSuccess = () => {
    // Switch to appointments tab after successful booking
    setActiveTab('appointments');
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">
          अपॉइंटमेंट / Appointments
        </h1>
        
        <Tabs
          defaultValue="appointments"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="appointments">
              मेरे अपॉइंटमेंट / My Appointments
            </TabsTrigger>
            <TabsTrigger value="book">
              अपॉइंटमेंट बुक करें / Book Appointment
            </TabsTrigger>
            <TabsTrigger value="clinics">
              क्लिनिक ढूंढें / Find Clinics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="appointments">
            <AppointmentList />
          </TabsContent>
          
          <TabsContent value="book">
            <Card className="kilkari-card">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  नया अपॉइंटमेंट / New Appointment
                </h2>
                <AppointmentForm onSuccess={handleAppointmentSuccess} />
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="clinics">
            <ClinicFinder />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AppointmentsPage;
