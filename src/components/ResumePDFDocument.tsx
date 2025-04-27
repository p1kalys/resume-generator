import { stripIndent, source } from 'common-tags'
import { WHITESPACE } from './constants'
import type { FormValues, Generator } from '../../types'

// ====== Helpers (Separation of Concerns) ======

function formatDateRange(startDate?: string, endDate?: string): string {
  if (startDate && endDate) return `${startDate} – ${endDate}`
  if (startDate) return `${startDate} – Present`
  return endDate || ''
}

function formatDegreeLine(studyType?: string, area?: string): string {
  if (studyType && area) return `${studyType} in ${area}`
  return studyType || area || ''
}

// ====== Generator ======

const generator: Generator = {
  profileSection(basics) {
    if (!basics) {
      console.warn('No basics provided for profile section.')
      return ''
    }

    const { name, email, phone, location = {}, website } = basics

    const [firstName = '', ...restNames] = (name || '').split(' ')
    const lastName = restNames.join(' ')
    const nameLine = name ? `\\headerfirstnamestyle{${firstName}} \\headerlastnamestyle{${lastName}} \\\\` : ''

    const infoLines = [
      email ? `{\\faEnvelope\\ ${email}}` : '',
      phone ? `{\\faMobile\\ ${phone}}` : '',
      location.address ? `{\\faMapMarker\\ ${location.address}}` : '',
      website ? `{\\faLink\\ \\href{${website}}{${website}}}` : ''
    ].filter(Boolean).join(' | ')

    return stripIndent`
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %     Profile
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\begin{center}
      ${nameLine}
      \\vspace{2mm}
      ${infoLines}
      \\end{center}
    `
  },

  educationSection(education, heading) {
    if (!education?.length) {
      console.warn('No education entries.')
      return ''
    }

    return source`
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %     Education
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\cvsection{${heading || 'Education'}}
      \\begin{cventries}
      ${education.map(({ institution, location, area, studyType, score, startDate, endDate }) => stripIndent`
        \\cventry
          {${formatDegreeLine(studyType, area)}}
          {${institution || ''}}
          {${location || ''}}
          {${formatDateRange(startDate, endDate)}}
          {${score ? `GPA: ${score}` : ''}}
      `)}
      \\end{cventries}

      \\vspace{-2mm}
    `
  },

  workSection(work, heading) {
    if (!work?.length) {
      console.warn('No work entries.')
      return ''
    }

    return source`
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %     Experience
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\cvsection{${heading || 'Experience'}}
      \\begin{cventries}
      ${work.map(({ name, position, location, startDate, endDate, highlights }) => {
        const duties = highlights?.length
          ? source`
              \\begin{cvitems}
              ${highlights.map(duty => `\\item {${duty}}`)}
              \\end{cvitems}
            `
          : ''

        return stripIndent`
          \\cventry
            {${position || ''}}
            {${name || ''}}
            {${location || ''}}
            {${formatDateRange(startDate, endDate)}}
            {${duties}}
        `
      })}
      \\end{cventries}
    `
  },

  skillsSection(skills, heading) {
    if (!skills?.length) {
      console.warn('No skills entries.')
      return ''
    }

    return source`
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %     Skills
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\cvsection{${heading || 'Skills'}}
      \\begin{cventries}
      \\cventry
        {}
        {\\def\\arraystretch{1.15}\\begin{tabular}{ l l }
          ${skills.map(({ name, keywords = [] }) => {
            const namePart = name ? `${name}: ` : ''
            const skillsPart = `{\\skill{${keywords.join(', ')}}}`
            return `${namePart} & ${skillsPart} \\\\`
          })}
        \\end{tabular}}
        {}
        {}
        {}
      \\end{cventries}

      \\vspace{-7mm}
    `
  },

  projectsSection(projects, heading) {
    if (!projects?.length) {
      console.warn('No project entries.')
      return ''
    }

    return source`
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %     Projects
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\cvsection{${heading || 'Projects'}}
      \\begin{cventries}
      ${projects.map(({ name, description, keywords = [], url }) => stripIndent`
        \\cventry
          {${description || ''}}
          {${name || ''}}
          {${keywords.join(', ') || ''}}
          {${url ? `\\href{${url}}{${url}}` : ''}}
          {}
        \\vspace{-5mm}
      `)}
      \\end{cventries}
    `
  },

  awardsSection(awards, heading) {
    if (!awards?.length) {
      console.warn('No award entries.')
      return ''
    }

    return source`
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %     Awards
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\cvsection{${heading || 'Awards'}}
      \\begin{cvhonors}
      ${awards.map(({ title, summary, awarder, date }) => stripIndent`
        \\cvhonor
          {${title || ''}}
          {${summary || ''}}
          {${awarder || ''}}
          {${date || ''}}
      `)}
      \\end{cvhonors}
    `
  },

  resumeHeader() {
    return stripIndent`
      %!TEX TS-program = xelatex
      %!TEX encoding = UTF-8 Unicode
      % Awesome CV LaTeX Template
      %
      % Downloaded from:
      % https://github.com/posquit0/Awesome-CV
      %
      % Author:
      % Claud D. Park <posquit0.bj@gmail.com>
      %
      % License:
      % CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      %     Configuration
      %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
      \\documentclass[]{awesome-cv}
      \\usepackage{textcomp}
      \\fontdir[fonts/]
      \\newcommand*{\\sectiondir}{resume/}
      \\colorlet{awesome}{awesome-red}
      %\\headersocialsep[\\quad\\textbar\\quad]
    `
  }
}

// ====== Main Template ======

function template2(values: FormValues): string {
  const { headings = {}, sections = [] } = values

  return stripIndent`
    ${generator.resumeHeader()}
    \\begin{document}
    ${sections.map(section => {
      switch (section) {
        case 'profile': return generator.profileSection(values.basics)
        case 'education': return generator.educationSection(values.education, headings.education)
        case 'work': return generator.workSection(values.work, headings.work)
        case 'skills': return generator.skillsSection(values.skills, headings.skills)
        case 'projects': return generator.projectsSection(values.projects, headings.projects)
        case 'awards': return generator.awardsSection(values.awards, headings.awards)
        default:
          console.warn('Unknown section type:', section)
          return ''
      }
    }).join('\n')}
    ${WHITESPACE}
    \\end{document}
  `
}

export default template2
