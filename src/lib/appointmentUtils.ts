
import { Appointment } from '@/types';
import { mockAppointments } from './mockData';

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
export const addAppointment = (appointment: Omit<Appointment, 'id'>): Appointment => {
  const appointments = getAppointments();
  const newAppointment = {
    ...appointment,
    id: Date.now().toString(),
  };
  
  saveAppointments([...appointments, newAppointment]);
  return newAppointment;
};

// Delete appointment
export const deleteAppointment = (id: string): void => {
  const appointments = getAppointments();
  saveAppointments(appointments.filter(appt => appt.id !== id));
};

// Update appointment
export const updateAppointment = (updatedAppointment: Appointment): void => {
  const appointments = getAppointments();
  saveAppointments(
    appointments.map(appt => 
      appt.id === updatedAppointment.id ? updatedAppointment : appt
    )
  );
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
