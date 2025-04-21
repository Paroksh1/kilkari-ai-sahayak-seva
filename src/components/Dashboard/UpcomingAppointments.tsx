
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateGoogleCalendarLink, getAppointments } from '@/lib/appointmentUtils';
import { isGoogleCalendarAuthorized } from '@/lib/googleCalendarUtils';
import { Appointment } from '@/types';

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isCalendarAuthorized, setIsCalendarAuthorized] = useState(false);

  useEffect(() => {
    const allAppointments = getAppointments();
    
    // Get only future appointments and limit to 3
    const upcomingAppointments = allAppointments
      .filter(appt => new Date(`${appt.date}T${appt.time}`) > new Date())
      .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
      .slice(0, 3);
    
    setAppointments(upcomingAppointments);
    setIsCalendarAuthorized(isGoogleCalendarAuthorized());
  }, []);

  const formatAppointmentDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'MMM d, yyyy');
  };

  return (
    <Card className="kilkari-card">
      <CardHeader className="bg-kilkari-purple/10 pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>आगामी अपॉइंटमेंट / Upcoming Appointments</span>
          <Link to="/appointments">
            <Button variant="ghost" size="sm" className="text-kilkari-purple hover:text-kilkari-purple/90">
              सभी देखें / View all
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-kilkari-gray hover:bg-kilkari-purple/5 transition-colors"
              >
                <div className="bg-kilkari-purple/10 p-2 rounded-full">
                  <Calendar className="h-4 w-4 text-kilkari-purple" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{appointment.title}</h4>
                  <p className="text-sm text-muted-foreground">{appointment.purpose}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs">{formatAppointmentDate(appointment.date)} • {appointment.time}</span>
                    {isCalendarAuthorized ? (
                      <span className="text-xs text-kilkari-purple">
                        कैलेंडर में जोड़ा गया / Added to Calendar
                      </span>
                    ) : (
                      <a 
                        href={generateGoogleCalendarLink(appointment)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-kilkari-purple hover:underline"
                      >
                        कैलेंडर में जोड़ें / Add to Calendar
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">कोई अपॉइंटमेंट नहीं / No appointments</p>
              <Link to="/appointments" className="mt-2 inline-block text-kilkari-purple hover:underline">
                अपॉइंटमेंट बुक करें / Book an appointment
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;
