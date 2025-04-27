import React from 'react';
import { ResumeData } from '../types/resume';
import { formatDate } from '../utils/helpers';
import { Mail, Phone, Link, Linkedin, Github, } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  return (
    <div className="bg-white w-full max-w-[21cm] mx-auto p-8 font-serif leading-relaxed" id="resume-content">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">{personalInfo.name || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 text-blue-600 hover:underline">
              <Mail size={14} />
              {personalInfo.email}
            </a>
          )}
          {personalInfo.linkedinUrl && (
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
              <Linkedin size={14} />
              LinkedIn
            </a>
          )}
          {personalInfo.githubUrl && (
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
              <Github size={14} />
              Github
            </a>
          )}
          {personalInfo.phone && (
            <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-1 text-blue-600 hover:underline">
              <Phone size={14} />
              {personalInfo.phone}
            </a>
          )}
        </div>
      </div>

      {/* Skills */}
      {(skills.languages.length > 0 || skills.tools.length > 0) && (
        <div className="mb-6">
          <h2 className="text-base font-bold border-b-2 border-gray-300 mb-2">SKILLS</h2>
          <div className="text-sm">
            {skills.languages.length > 0 && (
              <div>
                <strong>Languages: </strong>{skills.languages.join(', ')}
              </div>
            )}
            {skills.tools.length > 0 && (
              <div>
                <strong>Tools/Technologies: </strong> {skills.tools.join(', ')}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold border-b-2 border-gray-300 mb-2">EXPERIENCE</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <div className="font-bold">{exp.position}</div>
                    <div className="font-bold text-gray-700">{exp.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="italic text-gray-600">{exp.location}</div>
                    <div className="text-sm">
                      {exp.startYear && formatDate(exp.startYear)} - {exp.endYear ? formatDate(exp.endYear) : 'Present'}
                    </div>
                  </div>
                </div>
                <ul className="list-disc ml-4 text-sm space-y-1">
                  {exp.points.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold border-b-2 border-gray-300 mb-2">PROJECTS</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex items-baseline gap-2">
                  <div className="font-bold">{project.title}</div>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                      <Link size={12} />
                      Live
                    </a>
                  )}
                  {project.technologies && (
                    <div className="text-sm text-gray-600">- {project.technologies}</div>
                  )}
                </div>
                <ul className="list-disc ml-4 text-sm space-y-1">
                  {project.points.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">EDUCATION</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold">{edu.institution}</div>
                    <div>{edu.degree}</div>
                  </div>
                  <div className="text-right">
                    <div>
                      {edu.startYear && formatDate(edu.startYear)} - {edu.endYear ? formatDate(edu.endYear) : 'Present'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ResumePreview;