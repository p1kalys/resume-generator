export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  cgpa: string;
  startYear: string;
  endYear: string;
}

export interface Experience {
  id: string;
  company: string;
  companyUrl: string;
  position: string;
  location: string;
  startYear: string;
  endYear: string;
  points: string[];
}


export interface Skill {
  languages: string[];
  tools: string[];
}

export interface Project {
  id: string;
  title: string;
  points: string[];
  technologies: string;
  liveUrl: string;
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  githubUrl: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill;
  projects: Project[];
}

export type ResumeSection = 'personalInfo' | 'education' | 'experience' | 'skills' | 'projects';