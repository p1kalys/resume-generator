import React from 'react';
import { ResumeData } from '../types/resume';
import { formatDate } from '../utils/helpers';
import './Resume.css';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, projects } = data;

  const contactItems: string[] = [];
  if (personalInfo.email) contactItems.push(personalInfo.email);
  if (personalInfo.phone) contactItems.push(personalInfo.phone);
  if (personalInfo.linkedinUrl) contactItems.push(`LinkedIn: ${personalInfo.linkedinUrl}`);
  if (personalInfo.githubUrl) contactItems.push(`GitHub: ${personalInfo.githubUrl}`);

  return (
    <div className="resume-page" id="resume-content">
      <div className="header">
        <p className="name">{personalInfo.name || 'Your Name'}</p>
          {personalInfo.email && (
            <>
              <a href={`mailto:${personalInfo.email}`} className="text-blue-600 hover:underline contact">
                {personalInfo.email}
              </a>
              {personalInfo.linkedinUrl || personalInfo.githubUrl || personalInfo.phone ? ' | ' : ''}
            </>
          )}
          {personalInfo.linkedinUrl && (
            <>
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline contact">
                LinkedIn
              </a>
              {personalInfo.githubUrl || personalInfo.phone ? ' | ' : ''}
            </>
          )}
          {personalInfo.githubUrl && (
            <>
              <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline contact">
                GitHub
              </a>
              {personalInfo.phone ? ' | ' : ''}
            </>
          )}
          {personalInfo.phone && (
            <a href={`tel:${personalInfo.phone}`} className="text-blue-600 hover:underline contact">
              {personalInfo.phone}
            </a>
          )}
      </div>

      {skills.languages.length > 0 || skills.tools.length > 0 ? (
        <section className="section">
          <p className="section-title">Skills</p>
          {skills.languages.length > 0 && (
            <p><strong>Languages:</strong> {skills.languages.join(', ')}</p>
          )}
          {skills.tools.length > 0 && (
            <p><strong>Tools & Technologies:</strong> {skills.tools.join(', ')}</p>
          )}
        </section>
      ) : null}

      {experience.length > 0 && (
        <section className="section">
          <p className="section-title">Experience</p>
          {experience.map((exp) => (
            <div key={exp.id} className="entry">
              <div className="entry-header">
                <div>{exp.position} — <span className="company">{exp.company}</span></div>
                <div className="dates">{formatDate(exp.startYear)} – {exp.endYear ? formatDate(exp.endYear) : 'Present'}</div>
              </div>
              {exp.location && <div className="location">{exp.location}</div>}
              <ul className="entry-list">
                {exp.points.map((item, index) => (
                  <li className='list' key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section className="section break-before">
          <p className="section-title">Projects</p>
          {projects.map((project) => (
            <div key={project.id} className="entry">
              <div className="entry-header">
                <div>{project.title}</div>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link">Link</a>
                )}
              </div>
              {project.technologies && (
                <div className="tech-used">Techstack Used: {project.technologies}</div>
              )}
              <ul className="entry-list">
                {project.points.map((item, index) => (
                  <li className='list' key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="section">
          <p className="section-title">Education</p>
          {education.map((edu) => (
            <div key={edu.id} className="entry">
              <div className="entry-header">
                <div>{edu.institution}</div>
                <div className="dates">{edu.startYear && formatDate(edu.startYear)} – {edu.endYear ? formatDate(edu.endYear) : 'Present'}</div>
              </div>
              <div className='degree'>
                <div>{edu.degree}</div>
                <div>{edu.cgpa}</div>
              </div>              
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
