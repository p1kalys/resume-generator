import React, { useState } from 'react';
import { PersonalInfoForm, EducationForm, ExperienceForm, SkillsForm, ProjectsForm } from './forms';
import { ResumeData, ResumeSection } from '../types/resume';
import Button from './ui/Button';
import { saveToLocalStorage } from '../utils/helpers';
import { ClipboardList, Briefcase, GraduationCap, BookOpen, FileCode, Check } from 'lucide-react';

interface ResumeFormProps {
  data: ResumeData;
  onUpdateData: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ data, onUpdateData }) => {
  const [activeSection, setActiveSection] = useState<ResumeSection>('personalInfo');
  const [savedNotification, setSavedNotification] = useState(false);

  const updateSection = <K extends keyof ResumeData>(section: K, value: ResumeData[K]) => {
    const updatedData = {
      ...data,
      [section]: value,
    };

    onUpdateData(updatedData);
    saveToLocalStorage(updatedData);

    setSavedNotification(true);
    setTimeout(() => {
      setSavedNotification(false);
    }, 2000);
  };

  const renderActiveForm = () => {
    switch (activeSection) {
      case 'personalInfo':
        return (
          <PersonalInfoForm
            data={data.personalInfo}
            updateData={(value) => updateSection('personalInfo', value)}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={data.education}
            updateData={(value) => updateSection('education', value)}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            data={data.experience}
            updateData={(value) => updateSection('experience', value)}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            languages={data.skills.languages}
            tools={data.skills.tools}
            updateLanguages={(value) => updateSection('skills', { ...data.skills, languages: value })}
            updateTools={(value) => updateSection('skills', { ...data.skills, tools: value })}
          />

        );
      case 'projects':
        return (
          <ProjectsForm
            data={data.projects}
            updateData={(value) => updateSection('projects', value)}
          />
        );
      default:
        return null;
    }
  };

  const getNavItemClass = (section: ResumeSection) => {
    return `flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors whitespace-nowrap ${activeSection === section
        ? 'bg-blue-100 text-blue-900 font-medium'
        : 'text-gray-600 hover:bg-gray-100'
      }`;
  };

  const getCompletionStatus = (section: ResumeSection) => {
    switch (section) {
      case 'personalInfo':
        return data.personalInfo?.name?.length > 0 && data.personalInfo?.email?.length > 0;
      case 'education':
        return data.education?.length > 0 && data.education.some((edu) => edu.degree);
      case 'experience':
        return data.experience?.length > 0 && data.experience.some((exp) => exp.position);
      case 'skills':
        return (data.skills?.languages?.length > 0 || data.skills?.tools?.length > 0);
      case 'projects':
        return data.projects?.length > 0 && data.projects.some((proj) => proj.title);
      default:
        return false;
    }
  };
  

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
      <div className="p-2 sm:p-4 overflow-x-auto">
        <div className="flex gap-2 border-b pb-2 min-w-max">
          <button
            type="button"
            className={getNavItemClass('personalInfo')}
            onClick={() => setActiveSection('personalInfo')}
          >
            <ClipboardList size={18} />
            <span>Personal Info</span>
            {getCompletionStatus('personalInfo') && <Check size={14} className="ml-1 text-green-500" />}
          </button>

          <button
            type="button"
            className={getNavItemClass('experience')}
            onClick={() => setActiveSection('experience')}
          >
            <Briefcase size={18} />
            <span>Experience</span>
            {getCompletionStatus('experience') && <Check size={14} className="ml-1 text-green-500" />}
          </button>

          <button
            type="button"
            className={getNavItemClass('education')}
            onClick={() => setActiveSection('education')}
          >
            <GraduationCap size={18} />
            <span>Education</span>
            {getCompletionStatus('education') && <Check size={14} className="ml-1 text-green-500" />}
          </button>

          <button
            type="button"
            className={getNavItemClass('skills')}
            onClick={() => setActiveSection('skills')}
          >
            <BookOpen size={18} />
            <span>Skills</span>
            {getCompletionStatus('skills') && <Check size={14} className="ml-1 text-green-500" />}
          </button>

          <button
            type="button"
            className={getNavItemClass('projects')}
            onClick={() => setActiveSection('projects')}
          >
            <FileCode size={18} />
            <span>Projects</span>
            {getCompletionStatus('projects') && <Check size={14} className="ml-1 text-green-500" />}
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 relative">
        {renderActiveForm()}

        {savedNotification && (
          <div className="fixed bottom-6 right-6 bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-md flex items-center gap-2 animate-fade-in-out">
            <Check size={18} />
            <span>Changes saved!</span>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between">
          {activeSection !== 'personalInfo' && (
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto order-2 sm:order-1"
              onClick={() => {
                const sections: ResumeSection[] = ['personalInfo', 'experience', 'education', 'skills', 'projects'];
                const currentIndex = sections.indexOf(activeSection);
                setActiveSection(sections[currentIndex - 1]);
              }}
            >
              Previous Section
            </Button>
          )}

          {activeSection !== 'projects' && (
            <Button
              type="button"
              className="w-full sm:w-auto order-1 sm:order-2"
              onClick={() => {
                const sections: ResumeSection[] = ['personalInfo', 'experience', 'education', 'skills', 'projects'];
                const currentIndex = sections.indexOf(activeSection);
                setActiveSection(sections[currentIndex + 1]);
              }}
            >
              Next Section
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;

export { PersonalInfoForm, EducationForm, ExperienceForm, SkillsForm, ProjectsForm };