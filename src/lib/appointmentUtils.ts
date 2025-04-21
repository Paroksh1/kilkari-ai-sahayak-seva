
import { Appointment } from '@/types';
import { mockAppointments } from './mockData';
import { addToGoogleCalendar, removeFromGoogleCalendar } from './googleCalendarUtils';
import { toast } from 'sonner';

// Save appointments to localStorage
export const saveAppointments = (appointments: Appointment[]): void => {
  localStorage.setItem('kilkari-appointments', JSON.stringify(appointments));
};

// Get appointments from localStorage
export const getAppointments = (): Appointment[] => {
  const appointmentsStr = localStorage.getItem('kilkari-appointments');
  return appointmentsStr ? JSON.parse(appointmentsStr) : mockAppointments;
};

// Add new appointment
export const addAppointment = async (appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
  const appointments = getAppointments();
  const newAppointment = {
    ...appointment,
    id: Date.now().toString(),
  };
  
  saveAppointments([...appointments, newAppointment]);
  
  // Attempt to add to Google Calendar
  try {
    const calendarAdded = await addToGoogleCalendar(newAppointment);
    if (calendarAdded) {
      toast.success('अपॉइंटमेंट Google कैलेंडर में भी जोड़ी गई / Appointment also added to Google Calendar');
    }
  } catch (error) {
    console.error('Failed to add to Google Calendar:', error);
  }
  
  return newAppointment;
};

// Delete appointment
export const deleteAppointment = async (id: string): Promise<void> => {
  const appointments = getAppointments();
  saveAppointments(appointments.filter(appt => appt.id !== id));
  
  // Attempt to remove from Google Calendar
  try {
    await removeFromGoogleCalendar(id);
  } catch (error) {
    console.error('Failed to remove from Google Calendar:', error);
  }
};

// Update appointment
export const updateAppointment = async (updatedAppointment: Appointment): Promise<void> => {
  const appointments = getAppointments();
  saveAppointments(
    appointments.map(appt => 
      appt.id === updatedAppointment.id ? updatedAppointment : appt
    )
  );
  
  // Update in Google Calendar by removing and re-adding
  try {
    await removeFromGoogleCalendar(updatedAppointment.id);
    await addToGoogleCalendar(updatedAppointment);
  } catch (error) {
    console.error('Failed to update in Google Calendar:', error);
  }
};

// Generate Google Calendar link
export const generateGoogleCalendarLink = (appointment: Appointment): string => {
  const dateTimeStart = `${appointment.date}T${appointment.time}:00`;
  const dateTimeEnd = `${appointment.date}T${
    appointment.time.split(':')[0] + 1
  }:${appointment.time.split(':')[1]}:00`; // Default 1 hour duration
  
  const title = encodeURIComponent(appointment.title);
  const details = encodeURIComponent(`Purpose: ${appointment.purpose}${
    appointment.notes ? `\nNotes: ${appointment.notes}` : ''
  }`);
  const location = encodeURIComponent(appointment.location || '');
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateTimeStart.replace(/[-:]/g, '')}/${dateTimeEnd.replace(/[-:]/g, '')}&details=${details}&location=${location}&sf=true&output=xml`;
};
