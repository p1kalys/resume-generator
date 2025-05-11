import { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumeData } from './types/resume';
import { getEmptyResumeData, loadFromLocalStorage } from './utils/helpers';
import ResumeForm from './components/ResumeForm';
import Button from './components/ui/Button';
import { Tabs, TabPanel } from './components/ui/Tabs';
import { Download, FileText, PenLine, FileCheck } from 'lucide-react';
import ResumePDF from './components/ResumePreview';
import { pdf } from '@react-pdf/renderer';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(getEmptyResumeData());
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      setResumeData(savedData);
    }
  }, []);

  useEffect(() => {
    // Generate PDF when resumeData changes
    const generatePDF = async () => {
      const blob = await pdf(<ResumePDF data={resumeData} />).toBlob();
      setPdfBlob(blob);
    };

    generatePDF();
  }, [resumeData]);

  const handleTabChange = (tab: 'edit' | 'preview') => {
    setActiveTab(tab);
  };

  const tabs = [
    {
      label: 'Edit Resume',
      value: 'edit',
      icon: <PenLine size={18} />
    },
    {
      label: 'Preview',
      value: 'preview',
      icon: <FileText size={18} />
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white py-4 px-4 sm:px-6 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div className="flex items-center gap-2">
            <FileCheck size={24} className="text-teal-300" />
            <h1 className="text-2xl font-bold">ResumeBuilder</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="mb-6">
          <Tabs
            tabs={tabs}
            value={activeTab}
            onChange={(value) => handleTabChange(value as 'edit' | 'preview')}
            className="bg-white rounded-t-lg shadow-sm px-2 sm:px-4 overflow-x-auto"
          />

          <div className="bg-white p-4 sm:p-6 rounded-b-lg shadow-sm">
            <TabPanel value={activeTab} tabValue="edit">
              <p className="text-gray-600 mb-6">
                Fill out the sections below to create your resume. Your changes are automatically saved.
                Switch to Preview mode to see how your resume will look.
              </p>
              <ResumeForm
                data={resumeData}
                onUpdateData={setResumeData}
              />
            </TabPanel>

            <TabPanel value={activeTab} tabValue="preview">
              {/* Download PDF Button at the top of the Preview Tab */}
              <div className="mb-4 flex justify-end">
                {pdfBlob && (
                  <PDFDownloadLink
                    document={<ResumePDF data={resumeData} />}
                    fileName={`${resumeData.personalInfo.name || 'Resume'}.pdf`}
                    className="w-full sm:w-auto"
                  >
                    {({ loading }) => (
                      <Button disabled={loading} isLoading={loading}>
                        <Download size={16} className="mr-2" />
                        {loading ? 'Generating PDF...' : 'Download PDF'}
                      </Button>
                    )}
                  </PDFDownloadLink>
                )}
              </div>

              {/* PDF Preview */}
              <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-gray-600">
                  This is how your resume will look when exported to PDF.
                </p>
              </div>

              {/* Render the PDF preview */}
              <div className="bg-gray-100 p-2 sm:p-4 rounded-lg overflow-auto max-h-[800px]">
                {/* Only render the PDF if it's available */}
                {pdfBlob ? (
                  <object data={URL.createObjectURL(pdfBlob)} type="application/pdf" width="100%" height="600px">
                    <p>Your browser does not support PDFs. <a href={URL.createObjectURL(pdfBlob)}>Download the PDF</a></p>
                  </object>
                ) : (
                  <p>Loading PDF preview...</p>
                )}
              </div>
            </TabPanel>
          </div>
        </div>
      </main>

      <footer className="bg-white py-4 border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm text-gray-500">
          <p>ResumeBuilder - Create professional resumes with ease</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
