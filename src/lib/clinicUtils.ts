
import { Clinic } from '@/types';
import { mockClinics } from './mockData';

// Get clinics by pincode
export const getClinicsByPincode = (pincode: string): Clinic[] => {
  // Return mock clinics based on pincode
  return mockClinics[pincode] || [];
};
