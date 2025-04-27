import React, { useState, useEffect } from 'react';
import { usePDF } from 'react-to-pdf';
import { ResumeData } from './types/resume';
import { getEmptyResumeData, loadFromLocalStorage } from './utils/helpers';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import Button from './components/ui/Button';
import { Tabs, TabPanel } from './components/ui/Tabs';
import { Download, FileText, PenLine, FileCheck } from 'lucide-react';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(getEmptyResumeData());
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { toPDF, targetRef } = usePDF({
    filename: `${resumeData.personalInfo.name || 'Resume'}.pdf`,
    page: { format: 'A4' }
  });

  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      setResumeData(savedData);
    }
  }, []);

  const handleTabChange = (tab: 'edit' | 'preview') => {
    setActiveTab(tab);
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      await toPDF();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
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
              <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-gray-600">
                  This is how your resume will look when exported to PDF.
                </p>
                <Button
                  onClick={handleGeneratePDF}
                  disabled={isGenerating}
                  isLoading={isGenerating}
                  className="w-full sm:w-auto"
                >
                  <Download size={18} className="mr-2" />
                  Generate PDF
                </Button>
              </div>
              <div className="bg-gray-100 p-2 sm:p-4 rounded-lg overflow-auto max-h-[800px]">
                <div ref={targetRef}>
                  <ResumePreview data={resumeData} />
                </div>
              </div>
            </TabPanel>
          </div>
        </div>
      </main>

      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-md flex items-center gap-2 animate-fade-in-out z-50">
          <FileCheck size={18} />
          <span>PDF generated successfully!</span>
        </div>
      )}

      <footer className="bg-white py-4 border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm text-gray-500">
          <p>ResumeBuilder - Create professional resumes with ease</p>
        </div>
      </footer>
    </div>
  );
}

export default App;