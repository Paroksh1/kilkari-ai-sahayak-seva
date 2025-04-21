
import { useEffect, useState } from 'react';
import { Calendar, Trash2, ExternalLink } from 'lucide-react';
import { format, isPast, isFuture } from 'date-fns';
import { deleteAppointment, generateGoogleCalendarLink, getAppointments } from '@/lib/appointmentUtils';
import { isGoogleCalendarAuthorized, requestCalendarAuthorization } from '@/lib/googleCalendarUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Appointment } from '@/types';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isCalendarAuthorized, setIsCalendarAuthorized] = useState(false);
  
  useEffect(() => {
    loadAppointments();
    checkCalendarAuth();
  }, []);
  
  const checkCalendarAuth = () => {
    setIsCalendarAuthorized(isGoogleCalendarAuthorized());
  };

  const handleCalendarAuth = async () => {
    const result = await requestCalendarAuthorization();
    if (result) {
      toast.success('Google कैलेंडर से जुड़ गया / Connected to Google Calendar');
      setIsCalendarAuthorized(true);
    } else {
      toast.error('कैलेंडर एक्सेस अस्वीकृत / Calendar access denied');
    }
  };
  
  const loadAppointments = () => {
    setAppointments(getAppointments());
  };
  
  const handleDelete = async (id: string) => {
    await deleteAppointment(id);
    toast.success('अपॉइंटमेंट हटा दी गई / Appointment deleted');
    loadAppointments();
  };
  
  const formatAppointmentDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'MMM d, yyyy');
  };
  
  const upcomingAppointments = appointments.filter(appt => 
    isFuture(new Date(`${appt.date}T${appt.time}`))
  ).sort((a, b) => 
    new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()
  );
  
  const pastAppointments = appointments.filter(appt => 
    isPast(new Date(`${appt.date}T${appt.time}`))
  ).sort((a, b) => 
    new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime()
  );

  return (
    <Card className="kilkari-card">
      <CardHeader className="bg-kilkari-purple/10 pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>अपॉइंटमेंट / Appointments</span>
          {!isCalendarAuthorized && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-kilkari-purple border-kilkari-purple hover:bg-kilkari-purple/10"
              onClick={handleCalendarAuth}
            >
              <Calendar className="h-4 w-4 mr-1" />
              कैलेंडर से जुड़ें / Connect Calendar
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upcoming">
              आगामी / Upcoming ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              पिछली / Past ({pastAppointments.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 rounded-lg border border-kilkari-purple/10 hover:border-kilkari-purple/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{appointment.title}</h4>
                      <span 
                        className={`px-2 py-1 text-xs rounded-full bg-kilkari-purple/10 text-kilkari-purple`}
                      >
                        {appointment.purpose}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{formatAppointmentDate(appointment.date)} • {appointment.time}</span>
                    </div>
                    
                    {appointment.location && (
                      <p className="text-sm mb-3">
                        <strong>स्थान / Location:</strong> {appointment.location}
                      </p>
                    )}
                    
                    {appointment.notes && (
                      <p className="text-sm mb-3">
                        <strong>नोट्स / Notes:</strong> {appointment.notes}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between mt-4 pt-2 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(appointment.id)}
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        हटाएं / Delete
                      </Button>
                      
                      {isCalendarAuthorized ? (
                        <span className="text-sm text-kilkari-purple">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          कैलेंडर में जोड़ा गया / Added to Calendar
                        </span>
                      ) : (
                        <a 
                          href={generateGoogleCalendarLink(appointment)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-kilkari-purple hover:underline"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          कैलेंडर में जोड़ें / Add to Calendar
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-kilkari-purple/5 rounded-lg">
                  <p className="text-muted-foreground">कोई आगामी अपॉइंटमेंट नहीं / No upcoming appointments</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="space-y-4">
              {pastAppointments.length > 0 ? (
                pastAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 rounded-lg border border-muted bg-muted/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{appointment.title}</h4>
                      <span 
                        className={`px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground`}
                      >
                        {appointment.purpose}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{formatAppointmentDate(appointment.date)} • {appointment.time}</span>
                    </div>
                    
                    {appointment.location && (
                      <p className="text-sm text-muted-foreground mb-3">
                        <strong>स्थान / Location:</strong> {appointment.location}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-end mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(appointment.id)}
                        className="text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        हटाएं / Delete
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-kilkari-purple/5 rounded-lg">
                  <p className="text-muted-foreground">कोई पिछली अपॉइंटमेंट नहीं / No past appointments</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AppointmentList;
