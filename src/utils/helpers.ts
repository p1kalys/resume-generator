import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility to merge Tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate a random ID
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

// Format a date for display
export function formatDate(dateString: string): string {
  if (!dateString) return 'Present';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short',
  });
}

// Get default empty resume data
export function getEmptyResumeData() {
  return {
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      linkedinUrl: '',
      githubUrl: '',
    },
    education: [],
    experience: [],
    skills: {
      languages: [],
      tools: [],
    },
    projects: [],
  };
}

// Save resume data to local storage
export function saveToLocalStorage(data: any) {
  localStorage.setItem('resumeData', JSON.stringify(data));
}

// Load resume data from local storage
export function loadFromLocalStorage() {
  const savedData = localStorage.getItem('resumeData');
  return savedData ? JSON.parse(savedData) : null;
}