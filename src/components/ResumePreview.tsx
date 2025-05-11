import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { ResumeData } from '../types/resume';
import { formatDate } from '../utils/helpers';

const styles = StyleSheet.create({
  resumePage: {
    paddingHorizontal: 28,
    paddingVertical: 20,
    fontFamily: 'Times-Roman',
    fontSize: 12,
    lineHeight: 1.4,
    color: '#000',
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  contact: {
    fontSize: 10,
    color: '#555',
    marginHorizontal: 4,
  },
  section: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    marginBottom: 2,
  },
  entry: {
    marginBottom: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
  },
  degree: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  company: {
    fontSize: 12,
    color: '#333',
  },
  dates: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#666',
  },
  location: {
    fontSize: 10,
    color: '#666',
  },
  entryList: {
    paddingLeft: 4,
  },
  list: {
    fontSize: 10,
    margin: 0,
    padding: 0,
  },
  techUsed: {
    fontSize: 10,
    color: '#555',
  },
  link: {
    fontSize: 10,
    color: '#0066cc',
    textDecoration: 'underline',
  },
});

interface ResumePDFProps {
  data: ResumeData;
}

const ResumePDF: React.FC<ResumePDFProps> = ({ data }) => {
  const contactItems = [];

  if (data.personalInfo.email) {
    contactItems.push(
      <Text style={styles.contact} key="email">
        <Link style={styles.contact} href={`mailto:${data.personalInfo.email}`}>
          {data.personalInfo.email}
        </Link>
      </Text>
    );
  }

  if (data.personalInfo.phone) {
    if (contactItems.length > 0) contactItems.push(<Text key="separator1"> | </Text>); // Add separator if not first item
    contactItems.push(
      <Text style={styles.contact} key="phone">
        <Link style={styles.contact} href={`tel:${data.personalInfo.phone}`}>
          {data.personalInfo.phone}
        </Link>
      </Text>
    );
  }

  if (data.personalInfo.linkedinUrl) {
    if (contactItems.length > 0) contactItems.push(<Text key="separator2"> | </Text>); // Add separator if not first item
    contactItems.push(
      <Text style={styles.contact} key="linkedin">
        <Link style={styles.contact} href={data.personalInfo.linkedinUrl}>
          LinkedIn
        </Link>
      </Text>
    );
  }

  if (data.personalInfo.githubUrl) {
    if (contactItems.length > 0) contactItems.push(<Text key="separator3"> | </Text>); // Add separator if not first item
    contactItems.push(
      <Text style={styles.contact} key="github">
        <Link style={styles.contact} href={data.personalInfo.githubUrl}>
          GitHub
        </Link>
      </Text>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.resumePage}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          {/* Display the contact items in a row */}
          <View style={styles.contactContainer}>{contactItems}</View>
        </View>

        {/* Skills */}
        {(data.skills.languages.length > 0 || data.skills.tools.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.skills.languages.length > 0 && (
              <Text>
                <Text style={{ fontWeight: 'bold' }}>Languages:</Text> {data.skills.languages.join(', ')}
              </Text>
            )}
            {data.skills.tools.length > 0 && (
              <Text>
                <Text style={{ fontWeight: 'bold' }}>Tools & Technologies:</Text> {data.skills.tools.join(', ')}
              </Text>
            )}
          </View>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text>
                    {exp.position} — <Text style={styles.company}>{exp.company}</Text>
                  </Text>
                  <Text style={styles.dates}>
                    {formatDate(exp.startYear)} – {exp.endYear ? formatDate(exp.endYear) : 'Present'}
                  </Text>
                </View>
                {exp.location && <Text style={styles.location}>{exp.location}</Text>}
                <View style={styles.entryList}>
                  {exp.points.map((point, index) => (
                    <Text key={index} style={styles.list}>
                      • {point}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((project) => (
              <View key={project.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text>{project.title}</Text>
                  {project.liveUrl && <Text style={styles.link}>{project.liveUrl}</Text>}
                </View>
                {project.technologies && <Text style={styles.techUsed}>Techstack Used: {project.technologies}</Text>}
                <View style={styles.entryList}>
                  {project.points.map((point, index) => (
                    <Text key={index} style={styles.list}>
                      • {point}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text>{edu.institution}</Text>
                  <Text style={styles.dates}>
                    {edu.startYear && formatDate(edu.startYear)} – {edu.endYear ? formatDate(edu.endYear) : 'Present'}
                  </Text>
                </View>
                <View style={styles.degree}>
                  <Text>{edu.degree}</Text>
                  <Text>{edu.cgpa}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;
